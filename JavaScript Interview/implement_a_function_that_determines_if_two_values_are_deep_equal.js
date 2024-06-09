function deepEqual(value1, value2) {
  // Check if the values are strictly equal
  if (value1 === value2) {
    return true;
  }

  // Check if both values are objects
  if (
    typeof value1 === "object" &&
    typeof value2 === "object" &&
    value1 !== null &&
    value2 !== null
  ) {
    // Check if one is an array and the other is not
    if (Array.isArray(value1) !== Array.isArray(value2)) {
      return false;
    }

    // If both are arrays, compare each element recursively
    if (Array.isArray(value1)) {
      if (value1.length !== value2.length) {
        return false;
      }
      for (let i = 0; i < value1.length; i++) {
        if (!deepEqual(value1[i], value2[i])) {
          return false;
        }
      }
      return true;
    }

    // Get the keys of both objects
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);

    // If the number of keys is different, they are not deep equal
    if (keys1.length !== keys2.length) {
      return false;
    }

    // Check each key-value pair recursively
    for (let key of keys1) {
      if (!keys2.includes(key) || !deepEqual(value1[key], value2[key])) {
        return false;
      }
    }

    return true;
  }

  // If the values are not strictly equal and not objects, they are not deep equal
  return false;
}

// Example usage:
const obj1 = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    postalCode: "10001",
  },
  hobbies: ["reading", "swimming"],
};

const obj2 = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    postalCode: "10001",
  },
  hobbies: ["reading", "swimming"],
};

console.log(deepEqual(obj1, obj2)); // Output: true
