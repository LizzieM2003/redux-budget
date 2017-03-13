import React, { Component } from 'react';

import moment from 'moment';

import { openDb } from 'db';
import { initialiseMonthData } from 'helpers';

import Month from 'Month';
import Total from 'Total';
import Expenses from 'Expenses';
import Income from 'Income';
import CreateItem from 'CreateItem';

const currentMonth = moment().format('MMMM YYYY');

class Main extends Component {

  componentDidMount() {
    openDb()
    .then(() => {
      initialiseMonthData(currentMonth);
      })
        .catch(error => {
          console.log(error);
      });
  }

  render() {
    return (
      <div className="col-sm-12 main-div">
        <h1 className="col-xs-6 col-xs-offset-3">Budget App</h1>
        <Month />
        <Total />
        <CreateItem />
        <Expenses />
        <Income />
      </div>
    );
  }
}

export default Main;
