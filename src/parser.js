export const operators = ["=", "+", "-", "*", "/", "^"]
const easyParsers = operators
  .map(operator => parse(operator)) 

export const parser = input => {
  parsers = [
    ...easyParsers,
    parenParser
  ];
  // get list of parser method
  
  for (let p of parsers) {
    // run parser for input
    const res = p(input)

    // objects should be returned.
    if (res) {
      return res
    }
  }

  return input.replace(/[()]/g, "")
}

const parse = operator => input => {
  const parts = input.split(operator)
  if (parts.length === 1) {
    return undefined    
  }
  return {
    operator,
    "arguments": parts.map(parser)
  }
}
const chunkCollector = ()
const parenParser => input => {

  const chars = input.split('')
  let depth = 0;
  for (const char of chars) {
    
  }
  if (parts.length === 1) {
    return undefined    
  }
  return {
    operator,
    "arguments": parts.map(parser)
  }
}
