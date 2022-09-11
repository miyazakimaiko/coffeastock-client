import { unescapeHtml } from "./HtmlConverter";

export const convertItemListToIdList = (selectedRange, rangeItems) => {
  const idList = [];
  selectedRange.forEach(range => {
    for (const entry of Object.values(rangeItems)) {
      if (Boolean(entry && range) && unescapeHtml(entry.label) === range.label) {
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
      selectedRangeList.push({
        ...entry,
        label: unescapeHtml(entry.label)
      });
    }
  }
  return selectedRangeList;
}