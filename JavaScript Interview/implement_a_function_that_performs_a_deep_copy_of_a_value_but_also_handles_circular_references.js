// Check out this article:
// https://sonikamaheshwari067.medium.com/deep-copy-an-object-in-javascript-6728a486fcf8
// https://sonikamaheshwari067.medium.com/compare-2-nested-objects-in-javascript-imp-42fa6a1fea14

function deepCopyWithCircularDetection(obj, copiedObjects = []) {
  // If the value is primitive or null, return it directly
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // Check if this object has been copied before
  const foundIndex = copiedObjects.findIndex((item) => item.original === obj);
  if (foundIndex !== -1) {
    // Return the copied version of the circular reference
    return copiedObjects[foundIndex].copy;
  }

  // Create a new object or array to store the copied properties
  let copy = Array.isArray(obj) ? [] : {};

  // Store the original object and its copy
  copiedObjects.push({ original: obj, copy });

  // Copy all properties recursively
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopyWithCircularDetection(obj[key], copiedObjects);
    }
  }

  return copy;
}

// Example usage:
const obj = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    postalCode: "10001",
  },
};
obj.self = obj; // Circular reference

const copiedObj = deepCopyWithCircularDetection(obj);
console.log(copiedObj);
