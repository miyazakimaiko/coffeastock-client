import React, { useState, useEffect } from 'react'
import { useUserData } from '../../context/AccountContext';
import ToolBar from '../../components/tool-bar';
import ToolBarButton from '../../components/tool-bar/ToolBarButton';
import Table from './components/Table';
import Row from './components/Row';
import AddEditModal from './components/AddEditModal';
import NameInput from './components/NameInput';
import DetailsTextarea from './components/DetailsTextarea';
import DeleteModal from '../../modals/delete-modal'
import useRange from '../../hooks/useRange';
import useEditRange from '../../hooks/useEditRange';
import toastOnBottomCenter from '../../utils/customToast';
import useAddRange from '../../hooks/useAddRange';
import useDeleteRange from '../../hooks/useDeleteRange';
import RedOutlineButton from '../../elements/RedOutlineButton';
import BlueButton from '../../elements/BlueButton';

const MODE = {
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete'
}

const ManageAttributeRanges = ({cat: rangeName}) => {
  const userData = useUserData()
  const { data: range , isLoading: rangeIsLoading } = useRange(userData.sub, rangeName)
  const editRange = useEditRange(userData.sub, rangeName)
  const addRange = useAddRange(userData.sub)
  const deleteRange = useDeleteRange(userData.sub)

  const [rangeItem, setRangeItem] = useState({ value: '', label: '', def: '' });
  const [rangeItemIsValid, setRangeItemIsValid] = useState(false);
  const [modal, setModal] = useState({ mode: '', isOpen: false });
  const [attributeListHtml, setAttributeListHtml] = useState([]);

  const onAddSubmit = async (event) => {
    event.preventDefault();
    if (rangeItem.label.length === 0) {
      toastOnBottomCenter('error', 'Name field is required.')
      return;
    }
    const body = { 
      "label": rangeItem.label, 
      "def": rangeItem.def.replace(/(\r\n|\n|\r)/gm, " "),
    }
    addRange.mutate(
      {
        rangeName: rangeName,
        body: body,
      },
      {
        onSuccess: () => {
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
    })
  }

  const onDeleteSubmit = async (event) => {
    event.preventDefault();
    deleteRange.mutate({
      rangeName: rangeName, 
      body: rangeItem
    })
    setModal({ mode: '', isOpen: false })
  }

  useEffect(() => {
    if (rangeItem.label.length < 1 || rangeItem.label.length > 60 || rangeItem.def.length > 600) {
      setRangeItemIsValid(false);
    }
    else {
      setRangeItemIsValid(true);
    }
  }, [rangeItem])

  useEffect(() => {
    if (editRange.isSuccess || addRange.isSuccess || deleteRange.isSuccess) {
      setModal({ mode: '', isOpen: false })
    }
  }, [editRange.isSuccess, addRange.isSuccess, deleteRange.isSuccess])

  useEffect(() => {
    if (!rangeIsLoading && range) {
      let elements = [];
      Object.keys(range).forEach((key) => {
        const item = range[key];
        elements.push(
          <Row
            category={rangeName}
            value={item["value"]}
            label={item["label"]}
            def={item["def"]}
            onEditClick={() => {
              setRangeItem({ ...rangeItem, ...item });
              setModal({ mode: MODE.EDIT, isOpen: true });
            }}
            onDeleteClick={() => {
              setRangeItem({ ...rangeItem, ...item });
              setModal({ mode: MODE.DELETE, isOpen: true });
            }}
          />
        );
      });
      setAttributeListHtml(elements);
    } 
    else {
      setAttributeListHtml([
        <tr>
          <td className="text-center bg-white" colSpan="3">
            There's no entry for this range.
          </td>
        </tr>,
      ]);
    }
  }, [range, rangeName]);

  if (rangeIsLoading) {
    return 'loading...'
  }
  return (
    <>
      <div className="px-2 md:px-4 pt-8">
        <ToolBar pageTitle={`${rangeName} Range`}>
          <ToolBarButton 
            title={`New ${rangeName}`}
            onClick={() => {
              setRangeItem({ value: '', label: '', def: '' });
              setModal({ mode: MODE.ADD, isOpen: true })
            }}
          />
        </ToolBar>
        <Table>
          {attributeListHtml}
        </Table>
      </div>

      {(modal.isOpen === true && (modal.mode === MODE.ADD || modal.mode === MODE.EDIT)) 
        ? 
      <AddEditModal
        mode={modal.mode}
        category={rangeName}
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
                  onClick={modal.mode === MODE.ADD ? onAddSubmit : modal.mode === MODE.EDIT ? onEditSubmit : null}
                />
              </div>
            </div>
          </form>
        </div>
      </AddEditModal>
      : null}

      {modal.isOpen === true && modal.mode === MODE.DELETE
        ?
      <DeleteModal 
        label={rangeItem.label}
        onCloseClick={() => setModal({ mode: '', isOpen: false })}
        onDeleteSubmit={onDeleteSubmit}
      />
      : null}
    </>
  )
}

export default ManageAttributeRanges
