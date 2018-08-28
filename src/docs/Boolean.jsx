import React from 'react';
import PropTypes from 'prop-types';

const makeChangeHandler = (param, value, onChange) => () => onChange({
  [param]: !value,
});

const Boolean = ({ name, value, onChange }) => (
  // eslint-disable-next-line
  <label style={{ display: 'block', padding: 8 }}>
    <input
      checked={value}
      name={name}
      onChange={makeChangeHandler(name, value, onChange)}
      type="checkbox"
      value="true"
    /> {name}
  </label>
);

Boolean.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default Boolean;
