import React, { useEffect, useState } from 'react'
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

const MODE = {
  ADD: "add",
  EDIT: "edit",
}

const AddEditRangeModal = ({setModal, rangeName, targetRangeItem = null, mode = MODE.ADD}) => {
  const userData = useUserData()
  const editRange = useEditRange(userData.sub, rangeName)
  const addRange = useAddRange(userData.sub)

  const [rangeItem, setRangeItem] = useState({ value: '', label: '', def: '' });
  const [rangeItemIsValid, setRangeItemIsValid] = useState(false);

  useEffect(() => {
    if (targetRangeItem && mode === MODE.EDIT) {
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
            setModal({ mode: '', isOpen: false });
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
        setModal({ mode: '', isOpen: false });
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
        mode === MODE.ADD ? `Add New ${capitalize(rangeName)} Range` :
        mode === MODE.EDIT ? `Edit ${capitalize(rangeName)} Range` : null
      }
      onCloseClick={() => setModal({ mode: '', isOpen: false })}
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
                onClick={() => setModal({ mode: '', isOpen: false })}
              />
              <BlueButton
                text={editRange.isLoading || addRange.isLoading ? 'Saving...' : 'Save'}
                disabled={!rangeItemIsValid}
                onClick={mode === MODE.ADD ? onAddSubmit : mode === MODE.EDIT ? onEditSubmit : null}
              />
            </div>
          </div>
        </form>
      </div>
    </ModalWrapperContainer>
  )
}

export default AddEditRangeModal