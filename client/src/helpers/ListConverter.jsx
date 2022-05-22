import { unescapeHtml } from "./HtmlConverter";

export const convertItemListToIdList = (selectedRange, rangeItems) => {
  console.log('selectedRange: ', selectedRange) // does not work as expected
  console.log('rangeItems: ', rangeItems) 
  const idList = [];
  selectedRange.forEach(range => {
    for (const entry of Object.values(rangeItems)) {
      if (unescapeHtml(entry['label']) === range['label']) {
        idList.push(parseInt(entry['value']));
      }
    }
  })
  return idList;
}

export const convertIdListToItemList = (idList, rangeItems) => {
  const selectedRangeList = [];
  for (const entry of Object.values(rangeItems)) {
    const id = parseInt(entry['value'])
    if (idList.includes(id)) {
      selectedRangeList.push(entry);
    }
  }
  return selectedRangeList;
}