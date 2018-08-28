import React from 'react';
import PropTypes from 'prop-types';

const coverStyle = {
  objectFit: 'cover',
  height: '100%',
  width: '100%',
};
const containStyle = {
  objectFit: 'cover',
  maxHeight: '100%',
  maxWidth: '100%',
};

function getStyle(cover) {
  return cover ? coverStyle : containStyle;
}

const CoverflowImage = ({
  alt,
  cover,
  src,
  style,
  ...rest
}) => (
  <img
    alt={alt}
    {...rest}
    style={{
      ...style,
      ...getStyle(cover),
    }}
    src={src}
  />
);

CoverflowImage.propTypes = {
  alt: PropTypes.string.isRequired,
  cover: PropTypes.bool,
  src: PropTypes.string.isRequired,
};
CoverflowImage.defaultProps = {
  cover: true,
};

export default CoverflowImage;
