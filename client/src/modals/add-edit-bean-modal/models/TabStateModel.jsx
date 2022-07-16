import { useState } from 'react'

const TabStateModel = () => {
  const [tabState, setTabState] = useState({
    baseInfoTabIsOpen: true,
    detailsTabIsOpen: false,
    confirmationTabIsOpen: false,
    canOpenDetailsTab: false,
    canOpenConfirmation: false
  });

  return [tabState, setTabState];
}

export default TabStateModel