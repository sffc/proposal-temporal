// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.monthday.from
includes: [compareArray.js]
---*/

const expected = [
  "get day",
  "valueOf day",
  "get month",
  "valueOf month",
];
const actual = [];
const fields = {
  month: 1.7,
  day: 1.7,
};
const argument = new Proxy(fields, {
  get(target, key) {
    actual.push(`get ${key}`);
    const result = target[key];
    return {
      valueOf() {
        actual.push(`valueOf ${key}`);
        return result;
      }
    };
  },
  has(target, key) {
    actual.push(`has ${key}`);
    return key in target;
  },
});
const result = Temporal.MonthDay.from(argument);
assert.sameValue(result.month, 1, "month result");
assert.sameValue(result.day, 1, "day result");
assert.compareArray(actual, expected, "order of operations");
