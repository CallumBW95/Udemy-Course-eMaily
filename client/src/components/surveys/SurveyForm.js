import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(field => {
      return <Field component={SurveyField} type="text" {...field} />;
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            <i className="material-icons left">cancel</i>
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            <i className="material-icons left">done</i>
            Next
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");
  if (errors.recipients) {
    errors.recipients = " - " + errors.recipients;
  }

  formFields.map(({ name, errorMsg }) => {
    if (!values[name]) {
      errors[name] = " - " + errorMsg;
    }
    return errors[name];
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
