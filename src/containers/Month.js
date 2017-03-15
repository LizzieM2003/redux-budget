import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initialiseApp } from 'actions';
import { getMonth } from 'db';
import { initialiseMonthData } from 'helpers';

class Month extends Component {

  handleFormSubmit(event) {
    event.preventDefault();
    const selectedMonth = this.refs.month.value;
    initialiseMonthData(selectedMonth);
  }

  render() {
    return (
      <div className="col-sm-12 month-div">
        <h2 className="col-sm-4 col-sm-offset-2 col-xs-6">{this.props.month}</h2>
        <form className="form-inline col-xs-6 change-month-form"
          onSubmit={this.handleFormSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="months" className="sr-only">Change Month</label>
            <select id="months" className="form-control"
              defaultValue={this.props.month} ref="month">
              <option value="January 2017">January 2017</option>
              <option value="February 2017">February 2017</option>
              <option value="March 2017">March 2017</option>
              <option value="April 2017">April 2017</option>
              <option value="May 2017">May 2017</option>
              <option value="June 2017">June 2017</option>
              <option value="July 2017">July 2017</option>
              <option value="August 2017">August 2017</option>
              <option value="September 2017">September 2017</option>
              <option value="October 2017">October 2017</option>
              <option value="November 2017">November 2017</option>
              <option value="December 2017">December 2017</option>
            </select>
            <button type="submit" className="btn btn-primary">Change Month</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ month }) {
  return { month }
}

export default connect(mapStateToProps, { initialiseApp })(Month);
