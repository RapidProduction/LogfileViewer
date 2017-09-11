import React from 'react';
import { bool, string } from 'prop-types';

import './InputText.scss';

const InputText = ({
  // HoC
  input,
  // props
  placeholder,
  type,
}) => (
  <div className="input-text__container">
    <input
      className="input-text__container__input"
      {...input}
      type={type}
      placeholder={placeholder}
    />
  </div>
);

InputText.propTypes = {
  placeholder: string,
  type: string,
};

InputText.defaultProps = {
  type: 'text',
};

export default InputText;
