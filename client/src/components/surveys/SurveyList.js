import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="col s12 m6">
          <div className="card blue-grey darken-1" key={survey._id}>
            <div className="card-content white-text">
              <div className="card-title">{survey.title}</div>
              <p>{survey.body}</p>
              <p className="right">Sent on: {new Date(survey.dateSent).toLocaleDateString()}</p>
            </div>
            <div className="card-action">
              <a>Yes: {survey.yes}</a>
              <a>No: {survey.no}</a>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="row">{this.renderSurveys()}</div>;
  }
}

function mapStatesToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStatesToProps, { fetchSurveys })(SurveyList);
