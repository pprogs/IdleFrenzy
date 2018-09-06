function getBaseLog(base, num) {
  return Math.log(num) / Math.log(base);
}

function removeFromArray(array, element) {
  const index = array.indexOf(element);

  if (index !== -1) {
    array.splice(index, 1);
  }
}

export { getBaseLog, removeFromArray };
