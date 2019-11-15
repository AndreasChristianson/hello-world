import { parser, operators } from "./parser";

import Chance from 'chance';

const chance = new Chance();

it("should return valid expression", () => {
  const result = parser("1");
  expect(result).toEqual("1");
});

it("should return valid tree with single opperator", () => {
  const result = parser("1+1");
  expect(result).toStrictEqual({
    operator: "+",
    arguments: ["1", "1"]
  });
});

it("should return valid tree with a single minus operator", () => {
  const result = parser("1-1");
  expect(result).toEqual({
    operator: "-",
    arguments: ["1", "1"]
  });
});

it("should return valid tree with two of the same opperators", () => {
  const result = parser("1+1+3");
  expect(result).toEqual({
    operator: "+",
    arguments: ["1", "1", "3"]
  });
});

it("should return valid tree with two of the different opperators", () => {
  const result = parser("1+1-3");
  expect(result).toEqual({
    operator: "+",
    arguments: [
      "1",
      {
        operator: "-",
        arguments: ["1", "3"]
      }
    ]
  });
});

it("should return valid tree with arbitrary different opperators", () => {
  const result = parser("1-1+3");

  expect(result).toEqual({
    operator: "+",
    arguments: [
      {
        operator: "-",
        arguments: ["1", "1"]
      },
      "3"
    ]
  });
});

it("should return valid tree with arbitrary different opperators", () => {
  const result = parser("1-1+3-4+3");

  expect(result).toMatchInlineSnapshot(`
    Object {
      "arguments": Array [
        Object {
          "arguments": Array [
            "1",
            "1",
          ],
          "operator": "-",
        },
        Object {
          "arguments": Array [
            "3",
            "4",
          ],
          "operator": "-",
        },
        "3",
      ],
      "operator": "+",
    }
  `);
});



it("should return valid tree with equal operator", () => {
  const result = parser("1=1");

  expect(result).toStrictEqual({
    operator: "=",
    arguments: ["1","1"]
  })
});


it("should return valid tree with equal operator and plus", () => {
  const result = parser("1+1=2");

  expect(result).toStrictEqual({
    operator: "=",
    arguments: [{
      operator: "+",
      arguments: ["1","1"]
    },"2"]
  })
});


it("multiplication should happen before addition", () => {
  const result = parser("1*1+1");

  expect(result).toStrictEqual({
    operator: "+",
    arguments: [{
      operator: "*",
      arguments: ["1","1"]
    }, "1"]
  })
});



it("division should happen before addition", () => {
  const result = parser("1/1+1");

  expect(result).toStrictEqual({
    operator: "+",
    arguments: [{
      operator: "/",
      arguments: ["1","1"]
    }, "1"]
  })
});




it("exponents should happen before addition", () => {
  const result = parser("1^1+1");

  expect(result).toStrictEqual({
    operator: "+",
    arguments: [{
      operator: "^",
      arguments: ["1","1"]
    }, "1"]
  })
});


describe('random input', () => {  
  it("exponents should happen before addition", () => {
    const left = chance.natural();
    const middle = chance.natural();
    const right = chance.d100();
    const result = parser(`${left}^${middle}+${right}`);
    
    expect(result).toStrictEqual({
      operator: "+",
      arguments: [{
        operator: "^",
        arguments: [left.toString(),`${middle}`]
      }, ""+right]
    })
  });

  it("should handle very deep craziness", () => {
    const numbers = chance.n(chance.d100, chance.natural({
      min: 100,
      max: 200
    }));
    const expression = numbers.reduce(
      (accumulator, current) => `${accumulator}${chance.pickone(operators)}${current}`, '1'
    );
    parser(expression);
  });
});

describe('parens', () => {
  
  it.only("should parse", () => {
    const left = chance.natural();
    const right = chance.d100();
    const result = parser(`(${left}+${right})`);
    
    expect(result).toStrictEqual({
      operator: "+",
      arguments: [left.toString(),`${right}`]
    })
  });

  it("should parse parens as groups", () => { 
    const left = chance.natural();
    const right = chance.d100();
    const rightLeft = change.natural();
    const rightRight = chacne.d100()
    const result = parser(`(${left}+${right})*(${rightLeft}+${rightRight})`);
    
    expect(result).toStrictEqual({
      operator: "*",
      arguments: [
        {
          operator: "+",
          arguments: [
            left.toString(),
            right.toString(),
          ]
        },
        {
          operator: "+",
          arguments: [
            rightLeft.toString(),
            rightRight.toString(),
          ]
        }
      ]
    })    
  })
});


