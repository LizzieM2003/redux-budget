import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import expect from 'expect';
import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';

import store from 'configureStore';
import Main from 'Main';
import Month from 'Month';
import Total from 'Total';
import Expenses from 'Expenses';
import Income from 'Income';

describe('Main', () => {
  it('should exist', () => {
    expect(Main).toExist();
  });

  it('should render Month', () => {
    const provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <Main />
      </Provider>
    );

    const main = TestUtils.scryRenderedComponentsWithType(provider, Main)[0];
    const month = TestUtils.scryRenderedComponentsWithType(main, Month);

    expect(month.length).toEqual(1);
  });

  it('should render Total', () => {
    const provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <Main />
      </Provider>
    );

    const main = TestUtils.scryRenderedComponentsWithType(provider, Main)[0];
    const total = TestUtils.scryRenderedComponentsWithType(main, Total);

    expect(total.length).toEqual(1);
  });

  it('should render Expenses', () => {
    const provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <Main />
      </Provider>
    );

    const main = TestUtils.scryRenderedComponentsWithType(provider, Main)[0];
    const expenses = TestUtils.scryRenderedComponentsWithType(main, Expenses);

    expect(expenses.length).toEqual(1);
  });

  it('should render Income', () => {
    const provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <Main />
      </Provider>
    );

    const main = TestUtils.scryRenderedComponentsWithType(provider, Main)[0];
    const income = TestUtils.scryRenderedComponentsWithType(main, Income);

    expect(income.length).toEqual(1);
  });
});
