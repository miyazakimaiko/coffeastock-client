import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useFetchAttributeRangeList, useInsertAttribute, useEditAttribute, useDeleteAttribute } from '../../context/AttributeRangeContext';
import { useUserData } from '../../context/AccountContext';
import ToolBar from '../../components/tool-bar';
import ToolBarButton from '../../components/tool-bar/ToolBarButton';
import Table from './components/Table';
import Row from './components/Row';
import AddEditModal from './components/AddEditModal';
import AddEditForm from './components/AddEditForm';
import NameInput from './components/NameInput';
import DetailsTextarea from './components/DetailsTextarea';
import DeleteModal from '../../components/delete-modal'
import useRange from '../../hooks/useRange';
import useRanges from '../../hooks/useRanges';
import useEditRange from '../../hooks/useEditRange';

const MODE = {
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete'
}

const ManageAttributeRanges = ({cat}) => {
  const userData = useUserData()
  const { data: range , isLoading: rangeIsLoading } = useRange(userData.sub, cat)
  const { data: rangeList, isLoading: rangeListIsLoading } = useRanges(userData.sub)
  const fetchAttributeRangeList = useFetchAttributeRangeList()
  const insertAttribute = useInsertAttribute()
  const editAttribute = useEditAttribute()
  const deleteAttribute = useDeleteAttribute()
  const editRange = useEditRange(userData.sub, cat)

  const [attribute, setAttribute] = useState({ value: '', label: '', def: '' });
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
    setAttribute({...attribute, label: name})
  }

  const onAddSubmit = async (event) => {
    event.preventDefault();
    if (attribute.label.length === 0) {
      toast.error('Name field is required.', {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    }
    const insertStatus = await insertAttribute(
      userData.sub,
      cat, 
      { "label": attribute.label, "def": attribute.def.replace(/(\r\n|\n|\r)/gm, " ") }
    );
    if (typeof insertStatus === 'object') {
      toast.error(insertStatus.error.message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    else if (insertStatus === true) {
      toast.success("Entry is added successfully.", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      setModal({ mode: '', isOpen: false })
      fetchAttributeRangeList(userData.sub);
    }
  }

  const onEditSubmit = (event) => {
    event.preventDefault();
    if (attribute.label.length === 0) {
      toast.error("Name cannot be empty.", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    }
    editRange.mutate(attribute)
  }

  useEffect(() => {
    if (editRange.isSuccess) {
      setModal({ mode: '', isOpen: false })
    }
  }, [editRange.isSuccess])

  const onDeleteSubmit = async (event) => {
    event.preventDefault();
    const deleteSuccess = await deleteAttribute(userData.sub, cat, attribute.value);
    if (deleteSuccess) {
      setModal({ mode: '', isOpen: false })
      fetchAttributeRangeList(userData.sub)
    }
  } 

  useEffect(() => {
    if (!rangeIsLoading && Object.keys(range).length !== 0) {
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
              setAttribute({ value: item['value'], label: item['label'], def: item['def'] });
              setModal({ mode: MODE.EDIT, isOpen: true })
            }}
            onDeleteClick={() => {
              setAttribute({...attribute, value: item['value'], label: item['label'] })
              setModal({ mode: MODE.DELETE, isOpen: true })
            }}
          />
        )
      });
      setAttributeListHtml(elements);
    }
    else setAttributeListHtml( [<tr><td className="text-center bg-white" colspan="3">There's no entry for this range.</td></tr>] );
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
              setAttribute({ value: '', label: '', def: '' });
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
            onCloseClick={() => setModal({ mode: '', isOpen: false })}
            onSubmit={modal.mode === MODE.ADD ? onAddSubmit : modal.mode === MODE.EDIT ? onEditSubmit : null}
          >
            <NameInput 
              category={cat}
              nameValue={attribute.label}
              nameOnChange={e => setName(e.target.value)}
              nameWarningText={nameWarningText}
            />
            <DetailsTextarea 
              category={cat}
              detailsValue={attribute.def}
              detailsOnChange={e => setAttribute({...attribute, def: e.target.value})}
            />
          </AddEditForm>
      </AddEditModal>
      : null}

      {modal.isOpen === true && modal.mode === MODE.DELETE
        ?
      <DeleteModal 
        label={attribute.label}
        onCloseClick={() => setModal({ mode: '', isOpen: false })}
        onDeleteSubmit={onDeleteSubmit}
      />
      : null}
    </>
  )
}

export default ManageAttributeRanges
