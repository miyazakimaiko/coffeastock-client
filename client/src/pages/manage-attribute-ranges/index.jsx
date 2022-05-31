import React, { useState, useEffect } from 'react'
import { useUserData } from '../../context/AccountContext';
import ToolBar from '../../components/tool-bar';
import ToolBarButton from '../../components/tool-bar/ToolBarButton';
import Table from './components/Table';
import Row from './components/Row';
import DeleteModal from '../../modals/delete-modal'
import useRange from '../../hooks/useRange';
import useEditRange from '../../hooks/useEditRange';
import useAddRange from '../../hooks/useAddRange';
import useDeleteRange from '../../hooks/useDeleteRange';
import { unescapeHtml } from '../../helpers/HtmlConverter';
import AddEditRangeModal from '../../modals/add-edit-range-modal';

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
            value={item.value}
            label={item.label}
            def={item.def}
            onEditClick={() => {
              setRangeItem({
                 ...item,
                 label: unescapeHtml(item.label),
                 def: unescapeHtml(item.def)
                });
              setModal({ mode: MODE.EDIT, isOpen: true });
            }}
            onDeleteClick={() => {
              setRangeItem({
                ...item,
                label: unescapeHtml(item.label),
                def: unescapeHtml(item.def)
               });
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
              setRangeItem({ value: "", label: "", def: "" });
              setModal({ mode: MODE.ADD, isOpen: true });
            }}
          />
        </ToolBar>
        <Table>{attributeListHtml}</Table>
      </div>

      {modal.isOpen === true &&
        (modal.mode === MODE.ADD || modal.mode === MODE.EDIT) ? (
          <AddEditRangeModal
            setModal={setModal}
            rangeName={rangeName}
            targetRangeItem={modal.mode === MODE.EDIT ? rangeItem : null}
            mode={modal.mode}
          />
        ) : null
      }

      {modal.isOpen === true && modal.mode === MODE.DELETE ? (
        <DeleteModal
          label={rangeItem.label}
          onCloseClick={() => setModal({ mode: "", isOpen: false })}
          onDeleteSubmit={onDeleteSubmit}
        />
        ) : null
      }
    </>
  );
}

export default ManageAttributeRanges
