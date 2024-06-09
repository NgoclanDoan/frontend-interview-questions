/*  [{
  status: "fulfilled",
  value: "apple"
  }, {
  status: "fulfilled",
  value: "banana"
  }, {
  reason: "orange",
  status: "rejected"
  }] */

const allSettled = (promises) => {
  if (!promises.length) {
    return Promise.resolve([]);
  }

  const poolResponses = [];
  let counter = 0;

  return new Promise((resolve) => {
    promises.forEach((promise, i) => {
      promise
        .then((res) => {
          poolResponses[i] = {
            status: "fulfilled",
            value: res,
          };
        })
        .catch((err) => {
          poolResponses[i] = {
            status: "rejected",
            reason: err,
          };
        })
        .finally(() => {
          counter++;
          if (counter === promises.length) {
            resolve(poolResponses);
          }
        });
    });
  });
};



function promiseAllSettled(promises) {
  return Promise.all(
    promises.map((promise) => {
      return promise
        .then((value) => {
          return { status: "fulfilled", value };
        })
        .catch((reason) => {
          return { status: "rejected", reason };
        });
    })
  );
}

// ================= Version 2

// Example usage:
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, "Rejected")
);
const promise3 = new Promise((resolve, reject) =>
  setTimeout(resolve, 200, "Resolved")
);

promiseAllSettled([promise1, promise2, promise3]).then((results) => {
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log(`Fulfilled: ${result.value}`);
    } else {
      console.error(`Rejected: ${result.reason}`);
    }
  });
});
