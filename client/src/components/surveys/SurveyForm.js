import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";

const FIELDS = [
  { key: 1, label: "Survey Title", name: "title", errorMsg: " - You must provide a title" },
  { key: 2, label: "Subject Line", name: "subject", errorMsg: " - You must provide a subject" },
  { key: 3, label: "Email Body", name: "body", errorMsg: " - You must provide a body" },
  {
    key: 4,
    label: "Recipient List",
    name: "emails",
    errorMsg: " - You must provide at least one recipient email address"
  }
];

class SurveyForm extends Component {
  renderFields() {
    return FIELDS.map(field => {
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

  errors.emails = validateEmails(values.emails || "");

  FIELDS.map(({ name, errorMsg }) => {
    if (!values[name]) {
      errors[name] = errorMsg;
    }
    return errors[name];
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm"
})(SurveyForm);
