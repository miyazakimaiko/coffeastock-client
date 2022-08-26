export default function convertIntervalObjToString(intervalObj) {
  if (!Boolean(intervalObj)) return null;

  const extractionTime = Object.keys(intervalObj).map((timeUnit) => {
    const unit = timeUnit === "hours" ? "hr" : timeUnit === "minutes" ? "min" : "sec";
    return `${intervalObj[timeUnit]} ${unit} `;
  });
  return extractionTime;
}