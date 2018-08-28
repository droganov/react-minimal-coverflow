import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';


const getDepth = (index, elementIndex, maxIndex) => {
  if (index === elementIndex) return maxIndex;
  else if (index > elementIndex) return maxIndex + (elementIndex - index);
  return index;
};

const getFlexContent = (index, elementIndex) => {
  if (index === elementIndex) return 'center';
  else if (index > elementIndex) return 'flex-end';
  return 'flex-start';
};

const limit = (number, min, max) => Math.min(Math.max(number, min), max);

export { default as Image } from './Image';

export default class Coverflow extends Component {
  state = {
    index: this.props.defaultIndex,
  };
  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp);
  }
  getItemWrapperStyle(index) {
    const offset = this.getOffset(index);
    const zIndex = getDepth(index, this.elementIndex, this.childrenCount);
    return {
      width: this.elementWidth,
      height: this.props.size,
      transition: 'transform 1s cubic-bezier(0.190, 1.000, 0.220, 1.000)',
      transform: `translateX(${offset}px)`,
      pointerEvents: 'none',
      position: 'absolute',
      left: '50%',
      userSelect: 'none',
      zIndex,
    };
  }
  getItemStyle(index) {
    const { elementIndex } = this;
    const isActiveElement = index === elementIndex;
    const { size, scale } = this.props;
    const currentScale = isActiveElement ? 1 : scale;
    const rotate = isActiveElement ? 0 : Math.sign(index - elementIndex) * 45 * -1;
    return {
      cursor: 'pointer',
      alignItems: 'flex-end',
      display: 'flex',
      justifyContent: getFlexContent(index, elementIndex),
      width: this.elementWidth,
      height: size,
      pointerEvents: 'all',
      transform: `perspective(600px) scale(${currentScale}) rotateY(${rotate}deg)`,
      transition: 'transform 1s cubic-bezier(0.075, 0.820, 0.165, 1.000)',
      userSelect: 'none',
    };
  }
  getOffset(index) {
    const { elementIndex, elementWidth } = this;
    const { offset, spacing } = this.props;
    const baseOffset = -elementWidth / 2;
    if (index === elementIndex) return baseOffset;
    const indexDiff = index - elementIndex;
    const factorOffset = elementWidth * offset;
    const indexOffset = (elementWidth * spacing) * indexDiff;
    return index > elementIndex
      ? baseOffset + factorOffset + indexOffset
      : baseOffset - (factorOffset - indexOffset);
  }
  get childrenCount() {
    return Children.count(this.props.children);
  }
  get elementIndex() {
    const { index } = this.props;
    const unsafeIndex = index > -1 ? index : this.state.index;
    const maxIndex = Children.count(this.props.children) - 1;
    return limit(unsafeIndex, 0, maxIndex);
  }
  get elementWidth() {
    const { size, ratio } = this.props;
    return size / ratio;
  }
  setIndex = (index) => {
    if (Number.isNaN(index)) return;
    this.setState({ index });
    this.props.onIndexChange(index);
  }
  setIndexThrottled = throttle(this.setIndex, 160, { trailing: false });
  componentWillUnount() {
    document.removeEventListener('keyup', this.handleKeyUp);
  }
  childIsVisible(index) {
    const { tailSize } = this.props;
    if (typeof tailSize === 'undefined') return true;
    const distance = Math.abs(this.elementIndex - index);
    return distance <= tailSize;
  }
  incrementIndex = (indexOffset, isThrottled) => {
    const nextIndex = this.elementIndex + indexOffset;
    if (nextIndex < 0 || nextIndex >= this.childrenCount) return;
    const setIndex = isThrottled ? this.setIndexThrottled : this.setIndex;
    setIndex(nextIndex);
  }
  makeClickHandler = index => () => {
    this.setIndex(index);
  }
  handleScroll = (event) => {
    if (!this.props.allowScroll) return;
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY;
    const positionOffset = Math.sign(delta);
    this.incrementIndex(positionOffset, true);
    event.preventDefault();
  }
  handleTouchMove = (event) => {
    const touchX = event.touches[0].clientX;
    const distance = touchX - this.touchX;
    const positionOffset = Math.sign(distance);
    this.incrementIndex(-positionOffset, true);
    this.touchX = touchX;
  }
  handleTouchEnd = () => {
    delete this.touchX;
  }
  handleKeyUp = (event) => {
    if (!this.props.allowArrowKeys) return;
    if (event.keyCode === 37) this.incrementIndex(-1);
    else if (event.keyCode === 39) this.incrementIndex(1);
  }
  makeFocusHandler = index => (event) => {
    if (![13, 32].includes(event.keyCode)) return;
    this.setIndex(index);
    event.preventDefault();
  };
  render = () => (
    <div
      onTouchEnd={this.handleTouchEnd}
      onTouchMove={this.handleTouchMove}
      onWheel={this.handleScroll}
      style={{
        height: this.props.size,
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {Children.map(this.props.children, (Element, key) => this.childIsVisible(key) &&
        <div
          key={key}
          style={this.getItemWrapperStyle(key)}
        >
          <div
            onClick={this.makeClickHandler(key)}
            onKeyDown={this.makeFocusHandler(key)}
            role="button"
            style={this.getItemStyle(key)}
            tabIndex={key + 1}
          >
            {Element}
          </div>
        </div>)}
    </div>
  );
}

Coverflow.propTypes = {
  allowArrowKeys: PropTypes.bool,
  allowScroll: PropTypes.bool,
  children: PropTypes.node.isRequired,
  index: PropTypes.number,
  defaultIndex: PropTypes.number,
  size: PropTypes.number,
  ratio: PropTypes.number,
  offset: PropTypes.number,
  onIndexChange: PropTypes.func,
  scale: PropTypes.number,
  spacing: PropTypes.number,
  tailSize: PropTypes.number,
};

Coverflow.defaultProps = {
  allowArrowKeys: false,
  allowScroll: true,
  defaultIndex: 0,
  index: -1,
  size: 240,
  ratio: 1,
  offset: 0.64,
  onIndexChange: () => null,
  scale: 0.7,
  spacing: 0.32,
  tailSize: 16,
};
