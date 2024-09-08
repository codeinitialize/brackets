module.exports = function check(str, bracketsConfig) {
  const bracketsMap = {};
  const openBrackets = new Set();
  const closeBrackets = new Set();

  bracketsConfig.forEach(([open, close]) => {
    bracketsMap[close] = open;
    openBrackets.add(open);
    closeBrackets.add(close);
  });

  const stack = [];

  for (let char of str) {
    if (openBrackets.has(char)){
      if (bracketsMap[char] === char) {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
          stack.pop();
        }else {
          stack.push(char);
        }
      }else{
        stack.push(char);
      }
    }else if (closeBrackets.has(char)) {
      if (stack.length === 0 || stack.pop() !== bracketsMap[char]){
        return false;
      }
    }
  }

  return stack.length === 0;
}
