const extractNewItems = (Items) => {
  if (Items.length > 0) {
    return Items.filter((x) => "__isNew__" in x);
  }
  return [];
}

export default extractNewItems