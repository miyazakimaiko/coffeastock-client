import React, { useContext, useEffect, useState } from 'react'
import toastOnBottomCenter from '../../utils/customToast'
import { useUserData } from '../../context/AccountContext'
import ModalWrapperContainer from '../../elements/ModalWrapperContainer'
import RedOutlineButton from '../../elements/RedOutlineButton'
import BlueButton from '../../elements/BlueButton'
import useAddRange from '../../hooks/useAddRange'
import useEditRange from '../../hooks/useEditRange'
import NameInput from './components/NameInput'
import DetailsTextarea from './components/DetailsTextarea'
import { capitalize } from '../../helpers/HtmlConverter'
import { ModalStateContext } from '../../context/ModalStateContext'


const AddEditRangeModal = ({rangeName, targetRangeItem = null}) => {
  const userData = useUserData()
  const editRange = useEditRange(userData.sub, rangeName, userData.accessToken.jwtToken)
  const addRange = useAddRange(userData.sub, userData.accessToken.jwtToken)
  const {modal, closeModal, modalModeSelection} = useContext(ModalStateContext);


  const [rangeItem, setRangeItem] = useState({ value: '', label: '', def: '' });
  const [rangeItemIsValid, setRangeItemIsValid] = useState(false);

  useEffect(() => {
    if (targetRangeItem && modal.mode === modalModeSelection.editRange) {
      setRangeItem(targetRangeItem);
    }
  }, []);

  useEffect(() => {
    if (rangeItem.label.length < 1 || rangeItem.label.length > 60 || rangeItem.def.length > 600) {
      setRangeItemIsValid(false);
    }
    else {
      setRangeItemIsValid(true);
    }
  }, [rangeItem]);

  const onAddSubmit = async (event) => {
    event.preventDefault();
    if (rangeItem.label.length === 0) {
      toastOnBottomCenter('error', 'Name field is required.')
    }
    else {
      const body = { 
        label: rangeItem.label, 
        def: rangeItem.def.replace(/(\r\n|\n|\r)/gm, " "),
      }
      addRange.mutate(
        {
          rangeName: rangeName,
          body: body,
        },
        {
          onSuccess: () => {
            closeModal();
            toastOnBottomCenter(
              "success",
              `New range is added successfully.`
            )
          },
          onError: (error) => {
            toastOnBottomCenter(
              "error",
              error.message ?? "An unknown error has ocurred."
            )
          }
        }
      );
    }
  }

  const onEditSubmit = (event) => {
    event.preventDefault();
    if (rangeItem.label.length === 0) {
      toastOnBottomCenter('error', 'Name cannot be empty.')
      return
    }
    const decodedRangeItem = {
      ...rangeItem, 
      "def": rangeItem.def.replace(/(\r\n|\n|\r)/gm, " ")
    }
    editRange.mutate({
      rangeName: rangeName, 
      body: decodedRangeItem
    },
    {
      onSuccess: () => {
        closeModal();
        toastOnBottomCenter(
          "success",
          `Entry is edited successfully.`
        );
      },
      onError: (error) => {
        toastOnBottomCenter(
          "error",
          error.message ?? "An unknown error has ocurred."
        )
      }
    })
  }

  return (
    <ModalWrapperContainer
      title={
        modal.mode === modalModeSelection.addRange ? `Add New ${capitalize(rangeName)} Range` :
        modal.mode === modalModeSelection.editRange ? `Edit ${capitalize(rangeName)} Range` : null
      }
      onCloseClick={closeModal}
      maxWidthClass="max-w-6xl"
    >
      <div className="content">
        <form className="w-full">
          <div className="bg-white md:px-6 shadow-sm rounded-md">
            <div className="my-6">
              <NameInput 
                rangeName={rangeName}
                rangeItem={rangeItem}
                setRangeItem={setRangeItem}
              />
              <DetailsTextarea 
                rangeName={rangeName}
                rangeItem={rangeItem}
                setRangeItem={setRangeItem}
              />
            </div>
            <div className="flex items-center justify-between pl-4 pr-4 pb-8">
              <RedOutlineButton
                text="Cancel"
                onClick={closeModal}
              />
              <BlueButton
                text={editRange.isLoading || addRange.isLoading ? 'Saving...' : 'Save'}
                disabled={!rangeItemIsValid}
                onClick={modal.mode === modalModeSelection.addRange ? onAddSubmit : modal.mode === modalModeSelection.editRange ? onEditSubmit : null}
              />
            </div>
          </div>
        </form>
      </div>
    </ModalWrapperContainer>
  )
}

export default AddEditRangeModal