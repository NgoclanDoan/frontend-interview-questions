// Check out this Article:

// https://levelup.gitconnected.com/javascript-google-interview-question-polyfill-of-stringify-and-parse-c9b370b11027?source=your_stories_page--------
function stringify(value) {
  // If the value is null, return the string "null"
  if (value === null) {
    return "null";
  }

  // If the value is a number or a boolean, convert it to a string and return
  if (typeof value === "number" || typeof value === "boolean") {
    return value.toString();
  }

  // If the value is a string, return it enclosed in double quotes
  if (typeof value === "string") {
    return `"${value}"`;
  }

  // If the value is an array, recursively call stringify on each element,
  // join the resulting strings with commas, and enclose in square brackets
  if (Array.isArray(value)) {
    const arrayContents = value.map((element) => stringify(element)).join(",");
    return `[${arrayContents}]`;
  }

  // If the value is a plain object (not a function, etc.), recursively call
  // stringify on each value, ignore non-serializable values (like undefined and functions),
  // and construct a string with each key-value pair enclosed in curly braces
  if (typeof value === "object") {
    const keys = Object.keys(value);
    const keyValuePairStrings = keys
      .map((key) => {
        const valString = stringify(value[key]);
        if (valString === undefined || typeof value[key] === "function") {
          // Skip undefined and functions since they are not valid JSON
          return "";
        }
        return `"${key}":${valString}`;
      })
      .filter(Boolean); // Remove any undefined values resulting from non-serializable values
    return `{${keyValuePairStrings.join(",")}}`;
  }

  // For all other types that are not serializable to JSON, such as undefined or functions,
  // return undefined (which will be filtered out in the object case)
  return undefined;
}

console.log(stringify(myObject));
