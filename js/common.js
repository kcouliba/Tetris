// Function to convert degrees to radians
const deg2rad = (deg) => {
  return Math.PI * (deg / 180);
};

// Function returns an array with only unique values from both arrays
const uniq = (arr1, arr2) => {
  "use strict";
  const uniqValues = [];

  if (arr1 instanceof Array && arr2 instanceof Array) {
    const tmpArr = arr1.concat(arr2);
    const arrSize = tmpArr.length;
    let tmpValue = null;

    tmpArr.sort((a, b) => a - b);
    for (let i = 0; i < arrSize; i++) {
      ((idx) => {
        if (tmpValue === null || "" + tmpValue < "" + tmpArr[idx]) {
          tmpValue = tmpArr[idx];
          uniqValues.push(tmpValue);
        }
      })(i);
    }
  }
  return uniqValues;
};

// Function to check equality between two elements
const equals = (obj1, obj2) => {
  "use strict";
  
  if (obj1 instanceof Array && obj2 instanceof Array) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    obj1.sort();
    obj2.sort();
    for (let i = obj1.length - 1; i >= 0; i--) {
      if (typeof(obj1[i]) !== typeof(obj2[i])) {
        return false;
      }
      if (obj1[i] instanceof Object || obj1[i] instanceof Array) {
        return equals(obj1[i], obj2[i]);
      }
      if (obj1[i] !== obj2[i]) {
        return false;
      }
    }
  }
  else if (obj1 instanceof Object && obj2 instanceof Object) {
    const keys1 = Object.keys(obj1).sort();
    const keys2 = Object.keys(obj2).sort();
    const keys = uniq(keys1, keys2);

    if (keys1.length !== keys2.length 
    || keys1.join("") !== keys2.join("")) {
      return false;
    }

    for (let key of keys) {
      if (typeof(obj1[key]) !== typeof(obj2[key])) {
        return false;
      }
      if (obj1[key] instanceof Object || obj1[key] instanceof Array) {
        return equals(obj1[key], obj2[key]);
      }
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }
  else if (obj1 !== obj2) {
    return false;
  }
  return true;
};