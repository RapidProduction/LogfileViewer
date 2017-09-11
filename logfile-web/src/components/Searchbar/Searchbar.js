import classnames from 'classnames';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

import InputText from '../InputText/InputText';
import './Searchbar.scss';

const Searchbar = ({
  // props
  pristine, reset, submitting,
  // events
  handleSubmit,
 }) => (
  <div className="searchbar__container">
    <div>
      <Field
        name="filename"
        component={InputText}
        type="text"
        placeholder="Path to file"
      />
    </div>
    <button
      className="searchbar__button"
      onClick={handleSubmit}
      disabled={pristine || submitting}
    >
      View
    </button>
  </div>
);

export default reduxForm({
  form: 'search',
})(Searchbar);