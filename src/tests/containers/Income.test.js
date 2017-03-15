import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import expect from 'expect';
import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';

import { configureStoreWithState } from 'configureStore';
import ConnectedIncome, { Income } from 'Income';

import actions from 'actions';

describe('Income', () => {
  it('should exist', () => {
    expect(Income).toExist();
  });

  it('should render one income item for each income', () => {
    const incomeArr = [{
      id: 1,
      description: 'Income 1',
      amount: 1.50
    },
    {
      id: 2,
      description: 'Income 2',
      amount: 2.50
    }];

    const store = configureStoreWithState({income: incomeArr});

    const provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedIncome />
      </Provider>
    );

    const incomeList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedIncome)[0];
    const incomeItems = TestUtils.scryRenderedDOMComponentsWithClass(incomeList, 'income-item');
    expect(incomeItems.length).toBe(incomeArr.length);

  });

  it('should have state provided by store', () => {
    const incomeItem = {
      id: 1,
      description: 'An income item',
      amount: 1.59
    };

    const initialState = {
      month: 'June 2017',
      income: [incomeItem]
    };

    const store = configureStoreWithState(initialState);

    // const spy = expect.createSpy();
    const provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedIncome />
      </Provider>
    );

    const incomeList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedIncome)[0];
    const income = TestUtils.findRenderedComponentWithType(incomeList, Income);
    expect(income.props.month).toEqual(initialState.month);
    expect(income.props.income).toEqual(initialState.income);

  });


});
