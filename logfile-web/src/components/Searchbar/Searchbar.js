import React from 'react';
import { Field, reduxForm } from 'redux-form';
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
        component="input"
        type="text"
        placeholder="Path to file"
      />
    </div>
    <button onClick={handleSubmit} disabled={pristine || submitting}>
      View
    </button>
  </div>
);

export default reduxForm({
  form: 'search',
})(Searchbar);