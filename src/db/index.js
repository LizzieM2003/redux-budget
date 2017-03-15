const uuidV1 = require('uuid/v1');

const DB_NAME = 'myBudget';
const DB_VERSION = 1;
const DB_STORE_NAME = 'budget';

const budgetData = [
  { month: 'March 2017',
    expenses: [{id: uuidV1(), description: 'Loft conversion', amount: 3750},
              {id: uuidV1(), description: 'Aerial', amount: 85}],
    income: [{id: uuidV1(), description: 'Savings', amount: 5000},
            {id: uuidV1(), description: 'Housekeeping', amount: 400}],
    total: 1565
  },
  { month: 'February 2017',
    expenses: [{id: uuidV1(), description: 'Loft conversion', amount: 10000},
              {id: uuidV1(), description: 'Meal out', amount: 50}],
    income: [{id: uuidV1(), description: 'Savings', amount: 5000},
            {id: uuidV1(), description: 'Housekeeping', amount: 500}],
    total: -4550
  }
];


var budgetDb;

export function openDb() {
  return new Promise((resolve, reject) => {
    console.log("openDb...");

    var req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onsuccess = function(evt) {
      budgetDb = this.result;
      console.log("openDb DONE");
      // populateData();
      resolve();
    };

    req.onerror = function(evt) {
      console.error("openDB:", evt.target.errorCode);
      reject(req.error);
    };

    req.onupgradeneeded = function (evt) {
      console.log("openDB.onupgradeneeded");
      var store = evt.currentTarget.result.createObjectStore(
        DB_STORE_NAME, { keyPath: "month" }
      );
    }

  });
}

// catch for all errors that may occur
// budgetDb.onerror = function(event) {
//   console.log("Database error: " + event.target.errorCode);
// }


function getObjectStore(store_name, mode) {
  var tx = budgetDb.transaction(store_name, mode);
  return tx.objectStore(store_name);
}

export function populateData() {
  console.log('Populating data...');

  var store = getObjectStore(DB_STORE_NAME, 'readwrite');
  var req;

  for(var i in budgetData) {
      req = store.put(budgetData[i]);
      req.onsuccess = function(evt) {
        console.log(`Insertion in DB successful for record ${i}`);
      };

      req.onerror = function() {
        console.error(`Insertion failure for record ${i}`, this.error);
      };
  }
}

export function getMonth(key) {
  return new Promise((resolve, reject) => {
    var store = getObjectStore(DB_STORE_NAME, 'readonly');
    var req = store.get(key);

    req.onsuccess = function(evt) {
      var value = evt.target.result;
      resolve(value);
    }

    req.onerror = function(evt) {
      reject(req.error);
    }
  });
}

// this function inserts a new expense or income item
export function insertItem(key, itemType, item) {
  return new Promise((resolve, reject) => {
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req = store.get(key);

    req.onsuccess = function(evt) {
      var value = evt.target.result;
      // console.log('Inside insertItem, value is', value);
      var request;

      var initialItemsArr;

      if (!value) {
        // No object exists for this key/month so create blank object
        value = {
          month: key,
          expenses: [],
          income: [],
          total: 0
        };
      }

      var initialItemsArr = value[itemType];
      // console.log('initialItemsArr', initialItemsArr);

      // Add new item to this array
      initialItemsArr.push({
        id: uuidV1(),
        description: item.description,
        amount: item.amount
      });

      value[itemType] = initialItemsArr;

      // console.log(value[itemType]);

      //Update total for month - if it is an expense take away
      // from current total, if it is an income item then add.
      if (itemType === 'expenses') {
        value.total -= item.amount;
      } else if (itemType === 'income') {
        value.total += item.amount;
      }

      // console.log('Value after all updates', value);

      //Update value in indexedDB storage
      request = store.put(value);

      request.onsuccess = function(evt) {
        resolve(value);
      };

      request.onerror = function(evt) {
        reject(request.error);
      };
    };

    req.onerror = function(evt) {
      reject(req.error);
    };
  });
}

// this function deletes an expense or income item
export function deleteDbItem(key, itemType, itemToDelete) {
  return new Promise((resolve, reject) => {
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req = store.get(key);

    req.onsuccess = function(evt) {
      var value = evt.target.result;
      var request;

      var initialItemsArr = value[itemType];
      // remove item from array
      var filteredArr = initialItemsArr.filter((item) => {
        return item.id !== itemToDelete.id;
      });

      value[itemType] = filteredArr;

      // If removed item is an expense, add item value to total
      // else if it is an income, remove item value from total
      if (itemType === 'expenses') {
        value.total += itemToDelete.amount;
      } else if (itemType === 'income') {
        value.total -= itemToDelete.amount;
      }

      //Update value in indexedDB storage
      request = store.put(value);

      request.onsuccess = function(evt) {
        // var updatedValue = evt.target.result;
        // resolve(updatedValue);
        resolve(value);
      };

      request.onerror = function(evt) {
        reject(request.error);
      };
    };

    req.onerror = function(evt) {
      reject(req.error);
    };
  });
}
