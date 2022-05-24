import React, { useState, useEffect } from 'react'
import { useUserData } from '../../context/AccountContext';
import ToolBar from '../../components/tool-bar';
import ToolBarButton from '../../components/tool-bar/ToolBarButton';
import Table from './components/Table';
import Row from './components/Row';
import AddEditModal from './components/AddEditModal';
import AddEditForm from './components/AddEditForm';
import NameInput from './components/NameInput';
import DetailsTextarea from './components/DetailsTextarea';
import DeleteModal from '../../modals/delete-modal'
import useRange from '../../hooks/useRange';
import useEditRange from '../../hooks/useEditRange';
import toastOnBottomCenter from '../../utils/customToast';
import useAddRange from '../../hooks/useAddRange';
import useDeleteRange from '../../hooks/useDeleteRange';

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
  const [modal, setModal] = useState({ mode: '', isOpen: false });
  const [attributeListHtml, setAttributeListHtml] = useState([]);

  const [nameWarningText, setNameWarningText] = useState("");

  const setName = (name) => {
    const banned = ['&', '<', '>', '"', "'"];
    let includesBannedChar = false;
    banned.forEach(char => {
      if (name.includes(char)) includesBannedChar = true;
    })
    if (includesBannedChar) {
      setNameWarningText(<span className="text-red">Special characters cannot be used in this field.</span>)
    }     
    else if (name.length > 60) {
      setNameWarningText(<span className="text-red">{60 - name.length}/60</span>)
    } 
    else {
      setNameWarningText(`${60 - name.length}/60`)
    }
    setRangeItem({...rangeItem, label: name})
  }

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
        onSuccess: 
          toastOnBottomCenter(
            "success",
            `New range is added successfully.`
          ),
        onError: (error) =>
          toastOnBottomCenter(
            "error",
            error.message ?? "An unknown error has ocurred."
          ),
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
        onCloseClick={() => setModal({ mode: '', isOpen: false })}>
          <AddEditForm
            category={rangeName}
            isLoading={editRange.isLoading}
            onCloseClick={() => setModal({ mode: '', isOpen: false })}
            onSubmit={modal.mode === MODE.ADD ? onAddSubmit : modal.mode === MODE.EDIT ? onEditSubmit : null}
          >
            <NameInput 
              category={rangeName}
              nameValue={rangeItem.label}
              nameOnChange={e => setName(e.target.value)}
              nameWarningText={nameWarningText}
            />
            <DetailsTextarea 
              category={rangeName}
              detailsValue={rangeItem.def}
              detailsOnChange={e => setRangeItem({...rangeItem, def: e.target.value})}
            />
          </AddEditForm>
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
