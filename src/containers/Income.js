import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteItem } from 'actions';

export class Income extends Component {

  renderIncome() {
    return this.props.income.map(income => {
      return(
          <div key={income.id} className="list-group-item income-item">
            <a className="btn btn-danger btn-delete" href="#" aria-label="Delete"
              onClick={() => {this.props.deleteItem(this.props.month, 'income', income)}}>
              <i className="fa fa-trash-o" aria-hidden="true"></i>
            </a>

              {income.description}
              <span className="pull-right" >{income.amount.toFixed(2)}</span>
          </div>
      );
    });
  }

  render() {
    return (
      <div className="col-md-6 col-sm-12 income-div">
        <h2>Income</h2>
        <ul className="list-group">
          {this.renderIncome()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ income, month }) {
  return {
    income,
    month
  };
}

export default connect(mapStateToProps, { deleteItem })(Income);
