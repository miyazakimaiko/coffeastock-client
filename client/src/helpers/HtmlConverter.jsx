export const unescapeHtml = (input) => {
  if (!Boolean(input)) return null;
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

export const escapeHtml = (unsafe) => {
  return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

export const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}