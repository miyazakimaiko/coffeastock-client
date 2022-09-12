import React, { useContext, useEffect, useState } from 'react'
import toastOnBottomCenter from '../../utils/customToast'
import ModalWrapperContainer from '../../elements/ModalWrapperContainer'
import RedOutlineButton from '../../elements/RedOutlineButton'
import BlueButton from '../../elements/BlueButton'
import useAddRange from '../../hooks/useAddRange'
import useEditRange from '../../hooks/useEditRange'
import NameInput from './components/NameInput'
import DetailsTextarea from './components/DetailsTextarea'
import { capitalize } from '../../helpers/HtmlConverter'
import { ModalStateContext } from '../../context/ModalStateContext'
import { useGetSession, useSignout } from '../../context/AccountContext'
import { useNavigate } from 'react-router-dom'
import { MAX_LENGTH } from '../../utils/Constants'


const AddEditRangeModal = ({rangeName, targetRangeItem = null}) => {

  const getSession = useGetSession();
  const signout = useSignout();
  const navigate = useNavigate();

  // prevent from filling form while token is expired
  // (This prevents warning user to login again after filling the form)
  useEffect(() => {
    getSession((err, _) => {
      if (err) {
        signout();
        navigate('/login', { replace: true } );
      }
    });
    if (targetRangeItem && modal.mode === modalModeSelection.editRange) {
      setRangeItem(targetRangeItem);
    }
  }, []);

  const editRange = useEditRange(rangeName)
  const addRange = useAddRange()
  const {modal, closeModal, modalModeSelection} = useContext(ModalStateContext);

  const [rangeItem, setRangeItem] = useState({ value: '', label: '', def: '' });
  const [rangeItemIsValid, setRangeItemIsValid] = useState(false);

  useEffect(() => {
    if (Boolean(rangeItem) 
      && (rangeItem.label.length < 1 
          || rangeItem.label.length > MAX_LENGTH.RANGES_LABEL
          || rangeItem.def?.length > MAX_LENGTH.RANGES_DEFINITION)
    ) {
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
        def: rangeItem.def?.replace(/(\r\n|\n|\r)/gm, " "),
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
      "def": rangeItem.def?.replace(/(\r\n|\n|\r)/gm, " ")
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