module.exports.getUniqueItemInFirstArgArray = function(firstArgArray, secondArgArray) {
  const result = []
  firstArgArray.forEach(firstArg => {
    const found = secondArgArray.find(secondArg => secondArg === firstArg)
    if (!found) {
      result.push(firstArg)
    }
  })
  return result;
}