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
import DeleteModal from '../../pages/delete-modal'
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

const ManageAttributeRanges = ({cat}) => {
  const userData = useUserData()
  const { data: range , isLoading: rangeIsLoading } = useRange(userData.sub, cat)
  const editRange = useEditRange(userData.sub)
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
    addRange.mutate({
      rangeName: cat,
      body: body
    })
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
      rangeName: cat, 
      body: decodedRangeItem
    })
  }

  const onDeleteSubmit = async (event) => {
    event.preventDefault();
    deleteRange.mutate({
      rangeName: cat, 
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
      Object.keys(range).forEach(key => {
        const item = range[key];
        elements.push(
          <Row 
            category={cat}
            value={item['value']}
            label={item['label']}
            def={item['def']}
            onEditClick={() => {
              setRangeItem({...rangeItem, ...item});
              setModal({ mode: MODE.EDIT, isOpen: true })
            }}
            onDeleteClick={() => {
              setRangeItem({...rangeItem, ...item})
              setModal({ mode: MODE.DELETE, isOpen: true })
            }}
          />
        )
      });
      setAttributeListHtml(elements);
    }
    else setAttributeListHtml( [<tr><td className="text-center bg-white" colSpan="3">There's no entry for this range.</td></tr>] );
  }, [range, cat]);

  if (rangeIsLoading) {
    return 'loading...'
  }
  return (
    <>
      <div className="px-2 md:px-4 pt-8">
        <ToolBar pageTitle={`${cat} Range`}>
          <ToolBarButton 
            title={`New ${cat}`}
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
        category={cat}
        onCloseClick={() => setModal({ mode: '', isOpen: false })}>
          <AddEditForm
            category={cat}
            isLoading={editRange.isLoading}
            onCloseClick={() => setModal({ mode: '', isOpen: false })}
            onSubmit={modal.mode === MODE.ADD ? onAddSubmit : modal.mode === MODE.EDIT ? onEditSubmit : null}
          >
            <NameInput 
              category={cat}
              nameValue={rangeItem.label}
              nameOnChange={e => setName(e.target.value)}
              nameWarningText={nameWarningText}
            />
            <DetailsTextarea 
              category={cat}
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
