import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteItem } from 'actions';


class Expenses extends Component {

  renderExpenses() {
    return this.props.expenses.map((expense) => {
      return (
          <div key={expense.id} className="list-group-item expense-item">
            <a className="btn btn-danger btn-delete" href="#" aria-label="Delete"
              onClick={() => {this.props.deleteItem(this.props.month, 'expenses', expense)}}>
              <i className="fa fa-trash-o" aria-hidden="true"></i>
            </a>
                {expense.description}
                <span className="pull-right amount">{expense.amount.toFixed(2)}</span>

          </div>
      );
    });
  }

  render() {
    return (
      <div className="col-md-6 col-sm-12 expenses-div">
        <h2>Expenses</h2>
        <ul className = "list-group">
          {this.renderExpenses()}
        </ul>
    </div>
    )
  }
}

function mapStateToProps({ expenses, month }) {
  return {
    expenses,
    month
  }

}

export default connect(mapStateToProps, { deleteItem })(Expenses);
