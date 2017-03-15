import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';

import { CreateItem } from 'CreateItem';
import { addNewItem } from 'actions';

describe('CreateItem', () => {
  it('should exist', () => {
    expect(CreateItem).toExist();
  });

  it('should add new item on form submit', () => {
    const item = {
      description: 'Expense test',
      amount: 1
    };

    // const action = addNewItem('May 2017', 'expenses', item);
    const spy = expect.createSpy();

    const createItem = TestUtils.renderIntoDocument(<CreateItem addNewItem={spy} />);
    console.log(createItem);
    const $el = $(ReactDOM.findDOMNode(createItem));
    console.log($el);
    createItem.description.value = 'Expense test';
    createItem.amount.value = 1;
    createItem.itemType.value = 'expenses';
    TestUtils.Simulate.submit($el[0]);

    expect(spy).toHaveBeenCalled();
  });
});
