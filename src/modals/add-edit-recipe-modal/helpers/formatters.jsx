const formatExtractionTimeInputValue = (extraction_time) => {
  const units = ['hours', 'minutes', 'seconds']
  let result = '';
  if (extraction_time) {
    units.forEach(unit => {
      let time = '00'
      if (extraction_time[unit] !== undefined) {
        time = extraction_time[unit].toString()
        if (time.length === 1) {
          time = `0${time}`
        }
      }
      if (unit !== 'hours') {
        result = result.concat(':', time)
      }
      else result = result.concat(time)
    })
  }
  return result.length === 0 ? null : result
}

export {
  formatExtractionTimeInputValue
}