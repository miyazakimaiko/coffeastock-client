import React from 'react'
import { escapeHtml } from '../../../utils/HtmlConverter';
import FormInput from '../../elements/FormInput';

const AddEditHarvestPeriodInput = ({bean, setBean, periodWarningText, setPeriodWarningText}) => {
  const setHarvestPeriod = (period) => {
    setBean({...bean, harvest_period: period})
    const encoded = escapeHtml(period);
    if (encoded.length > 60) {
      setPeriodWarningText(<span className="text-red">{60 - encoded.length}/60</span>)
    } else {
      setPeriodWarningText(`${60 - encoded.length}/60`)
    }
    setBean({...bean, period})
  }

  return (
    <FormInput
      title="Harvest Period"
      type="text" 
      name="harvest-period"
      placeholder="e.g. Sep 2020" 
      value={bean.harvest_period}
      onChange={e => setHarvestPeriod(e.target.value)}
      warningText={periodWarningText}
    />
  )
}

export default AddEditHarvestPeriodInput