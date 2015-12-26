// Function to convert degrees to radians
const deg2rad = (deg) => {
  return Math.PI * (deg / 180);
};

// Function that check if value is an array
const isArray = (obj) => {
  return (typeof(obj) === "object" && obj.length);
};

// Function that check all array values are equals
const isArrayEquals = (arr1, arr2) => {
  "use strict";

  let isArr = true;

  if (isArray(arr1) && isArray(arr2) && (arr1.length === arr2.length)) {
    for (let index = arr1.length - 1; index >= 0; index--) {
      if (!equals(arr1[index], arr2[index])) {
        return false;
      }
    }
  }
  return true;
};

// Function to check equality between two elements
const equals = (obj1, obj2) => {
  "use strict";

  let isEqual = true;
  let val1 = [];
  let val2 = [];

  if (typeof(obj1) !== typeof(obj2)) {
    return false;
  }
  if (isArray(obj1) && isArray(obj2)) {
    return isArrayEquals(obj1, obj2);
  }
  if (type === "object") {
    for (let val in obj1) {
      val1.push(val);
    }
    for (let val in obj2) {
      val2.push(val);
    }
    return (isArrayEquals(val1, val2));
  }
  return (obj1 === obj2);
};

const uniq = (arr1, arr2) => {
  "use strict";

  const uniqValues = [];
  let index = 0;
  let index2 = 0;

  if (isArray(arr1) && isArray(arr2)) {
    index = (arr1.length < arr2.length) ? arr1.length : arr2.length;
    index2 = (arr1.length > arr2.length) ? arr1.length : arr2.length;
    index2 -= index;
    for (index = index - 1; index >= 0; index--) {
      if (uniqValues.indexOf(arr1[index]) < 0) {
        uniqValues.push(arr1[index]);
      }
      if (uniqValues.indexOf(arr2[index]) < 0) {
        uniqValues.push(arr2[index]);
      }
    }
    for (index2 - 1; index2 >= 0; index2--) {
      if (uniqValues.indexOf(arr2[index2]) < 0) {
        uniqValues.push(arr2[index2]);
      }
    }
  }
  return uniqValues;
};
