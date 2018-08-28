import React from 'react';
import PropTypes from 'prop-types';

const makeChangeHandler = (param, onChange) => event => onChange({
  [param]: parseFloat(event.target.value),
});

const Number = ({
  name,
  value,
  onChange,
  ...rest
}) => (
  <div style={{ padding: 8 }}>
    <div>
      {name} <sup>{value}</sup>
    </div>
    <input
      {...rest}
      onChange={makeChangeHandler(name, onChange)}
      name={name}
      value={value}
      style={{ width: '100%' }}
    />
  </div>
);

Number.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Number;
