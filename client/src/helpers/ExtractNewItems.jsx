const extractNewItems = (Items) => {
  if (Boolean(Items) && Items.length > 0) {
    console.log({Items})
    return Items.filter((x) => Boolean(x) && "__isNew__" in x);
  }
  return [];
}

export default extractNewItems