const RANGE_LABEL_MAX_LENGTH = 30;

const checkItemsLabelLessThanMax = (items) => {
  let valid = true;
  for (const item of items) {
    if (item?.label.length > RANGE_LABEL_MAX_LENGTH) {
      valid = false;
    }
  }
  return valid;
}

export { 
  checkItemsLabelLessThanMax,
};