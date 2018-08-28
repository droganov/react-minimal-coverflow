import React, { Component } from 'react';
import { render } from 'react-dom';
import './styles.css';

import Coverflow, { Image } from '../lib/index';

import Boolean from './Boolean';
import Number from './Number';

const images = [
  'https://www.telegraph.co.uk/content/dam/news/2016/11/16/seal_trans_NvBQzQNjv4BqRtvZRSV037_kYj9aGppl8KoSQRPSZoKNSSXquGEEDe0.jpg',
  'https://s3.amazonaws.com/ifaw-pantheon/sites/default/files/legacy/wordpress/image/commercial_seal_hunt_Canada_IFAW_3.jpg',
  'https://icdn2.digitaltrends.com/image/seal-pup-720x720.jpg?ver=1.jpg',
  'https://pbs.twimg.com/media/DTiuZ9DU0AA_GsH.jpg',
  'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-img.health.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Flarge_16_9%2Fpublic%2Fstyles%2Fmain%2Fpublic%2Fgettyimages-626889828.jpg%3Fitok%3D_IuWGVQE&w=800&q=85',
  'https://ww2.kqed.org/news/wp-content/uploads/sites/10/2018/04/HorchataPup-800x533.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY9R0I9bcuvYItdNzldZ-0qWmXcTXzBeHc1lYI23VOJGwYec-75A',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3uIAZ5iCP5pTlfaFurueLL5JHvde1xKLK2Z4Mop828v5C9qV5w',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmpgj0mMELQeTzOQa25T8uaBnme4Xylls-NFrDyJdFybA_xE6h',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxI6WtmIz09605yT3RkYiYacC52PO21cC8m0TcpyXduipbRpqVVA',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt96ys7ok20GxOQSPaSB37XRyekBTl16ACdhpmbQtBVBUocdjG',
];

class Demo extends Component {
  state = {
    ...Coverflow.defaultProps,
    cover: true,
  };
  handleChange = nextParam => this.setState(nextParam);
  render() {
    return (
      <div>
        <h1>Demo</h1>
        <Coverflow
          {...this.state}
          onIndexChange={index => this.setState({ index })}
          key={this.state.defaultIndex}
        >
          {images.map(src => <Image alt={src} src={src} key={src} cover={this.state.cover} />)}
          <button
            style={{
              background: '#cfe',
              height: '100%',
              width: '100%',
            }}
          >
            Extra item
          </button>
        </Coverflow>

        <div
          style={{
            maxWidth: 800,
            margin: 'auto',
          }}
        >
          <h2>Container Props</h2>
          <Boolean
            name="allowArrowKeys"
            onChange={this.handleChange}
            value={this.state.allowArrowKeys}
          />
          <hr />
          <Boolean
            name="allowScroll"
            onChange={this.handleChange}
            value={this.state.allowScroll}
          />
          <hr />
          <Number
            name="index"
            onChange={this.handleChange}
            value={this.state.index}
            min={0}
            max={images.length - 1}
            type="range"
          />
          <hr />
          <Number
            name="size"
            onChange={this.handleChange}
            value={this.state.size}
            min={40}
            max={400}
            type="range"
          />
          <hr />
          <Number
            name="ratio"
            onChange={this.handleChange}
            value={this.state.ratio}
            min={0.1}
            max={2}
            step={0.1}
            type="range"
          />
          <hr />
          <Number
            name="offset"
            onChange={this.handleChange}
            value={this.state.offset}
            min={0.1}
            max={3}
            step={0.1}
            type="range"
          />
          <hr />
          <Number
            name="spacing"
            onChange={this.handleChange}
            value={this.state.spacing}
            min={0.01}
            max={1}
            step={0.01}
            type="range"
          />
          <hr />
          <Number
            name="scale"
            onChange={this.handleChange}
            value={this.state.scale}
            min={0.1}
            max={1}
            step={0.1}
            type="range"
          />
          <hr />
          <Number
            name="tailSize"
            onChange={this.handleChange}
            value={this.state.tailSize}
            min={1}
            max={images.length}
            step={1}
            type="range"
          />
          <hr />
          <h2>Image Props</h2>
          <Boolean
            name="cover"
            onChange={this.handleChange}
            value={this.state.cover}
          />
        </div>
      </div>
    );
  }
}


render(<Demo />, document.getElementById('app'));
