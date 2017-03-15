import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addNewItem } from 'actions';

export class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      amount: '',
      itemType: 'expenses'
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleDescChange(event) {
    this.setState({ description: this.description.value });
  }

  handleAmountChange(event) {
    this.setState({ amount: this.amount.value });
  }

  handleItemTypeChange(event) {
    this.setState({ itemType: this.itemType.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const amount = Number(this.state.amount);

    const itemToAdd = {
      description: this.state.description,
      amount
    };

    this.props.addNewItem(this.props.month, this.state.itemType, itemToAdd);


    // clear fields
    this.setState({
      description: '',
      amount: '',
      itemType: 'expenses'
    });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}
        className="form-inline col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 create-item-form">
        <div className="form-group">
          <label htmlFor="item-desc" className="sr-only">Item Description</label>
          <input id="item-desc"
            className="form-control"
            type="text"
            placeholder="Food shop"
            required
            maxLength="30"
            ref={node => {
              this.description = node;
            }}
            value = {this.state.description}
            onChange={() => this.handleDescChange()}/>
        </div>

        <div className="form-group">
          <label htmlFor="item-amount" className="sr-only">Create Item</label>
          <input id="item-amount"
            className="form-control"
            type="number" step="0.01" min="0"
            placeholder="98.55"
            required
            ref={node => {
              this.amount = node;
            }}
            value={this.state.amount}
            onChange={() => this.handleAmountChange()}
           />
        </div>

        <div className="form-group">
          <select className="form-control"
            id="itemType"
            value={this.state.itemType}
            ref={node => {
              this.itemType = node;
            }}
            onChange={() => this.handleItemTypeChange()}>
            <option value="expenses">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
          <button className="btn btn-primary" type="submit">Create Item</button>
      </form>
    )
  }
}

// needs to know what the month is to call action creators that updates
// the indexeddb database
function mapStateToProps( { month }) {
  return { month };
}

export default connect(mapStateToProps, { addNewItem })(CreateItem);
