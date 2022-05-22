import React, { useState } from 'react'
import FormInput from '../../../components/elements/FormInput';
import { escapeHtml } from '../../../helpers/HtmlConverter';

const AddEditAltitudeInput = ({bean, setBean}) => {

  const [altitudeWarningText, setAltitudeWarningText] = useState("60/60");

  const setAltitude = (altitude) => {
    const encoded = escapeHtml(altitude);
    if (encoded.length > 60) {
      setAltitudeWarningText(<span className="text-red">{60 - encoded.length}/60</span>)
    } else {
      setAltitudeWarningText(`${60 - encoded.length}/60`)
    }
    if (altitude.length === 0) {
      altitude = null
    }
    setBean({...bean, altitude})
  }

  return (
    <FormInput
      title="Altitude"
      type="text" 
      name="altitude"
      placeholder="e.g. 4000 MASL"
      value={bean.altitude}
      onChange={e => setAltitude(e.target.value)}
      warningText={altitudeWarningText}
    />
  )
}

export default AddEditAltitudeInput