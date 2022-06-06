import React, { useContext, useState } from 'react'
import { useUserData } from '../../../context/AccountContext';
import { ModalStateContext } from '../../../context/ModalStateContext'
import { unescapeHtml } from '../../../helpers/HtmlConverter';
import useDeleteRange from '../../../hooks/useDeleteRange';
import AddEditRangeModal from '../../../modals/add-edit-range-modal';
import DeleteModal from '../../../modals/delete-modal';
import Row from './Row'

const Rows = ({data, rangeName}) => {

  const userData = useUserData();
  const deleteRange = useDeleteRange(userData.sub);
  const {modal, setModal, mode} = useContext(ModalStateContext);
  const [rangeItem, setRangeItem] = useState({ value: "", label: "", def: "" });


  const onEditClick = (item) => {
    setRangeItem({
      ...item,
      label: unescapeHtml(item.label),
      def: unescapeHtml(item.def),
    });
    setModal({ mode: mode.editRange, isOpen: true });
  }


  const onDeleteClick = (item) => {
    setRangeItem({
      ...item,
      label: unescapeHtml(item.label),
      def: unescapeHtml(item.def),
    });
    setModal({ mode: mode.deleteRange, isOpen: true });
  }


  const onDeleteSubmit = async (event) => {
    event.preventDefault();
    deleteRange.mutate({
      rangeName: rangeName, 
      body: rangeItem
    })
    setModal({ mode: '', isOpen: false })
  }


  return (
    <>
      {data.map((item) => (
        <Row
          value={item.value}
          label={item.label}
          def={item.def}
          onEditClick={() => onEditClick(item)}
          onDeleteClick={() => onDeleteClick(item)}
        />
      ))}

      {modal.mode === mode.editRange && modal.isOpen === true ? (
        <AddEditRangeModal
          setModal={setModal}
          rangeName={rangeName}
          targetRangeItem={rangeItem}
          mode={modal.mode}
        />
      ) : null}

      {modal.mode === mode.deleteRange && modal.isOpen === true ? (
        <DeleteModal
          label={rangeItem.label}
          onCloseClick={() => setModal({ mode: "", isOpen: false })}
          onDeleteSubmit={onDeleteSubmit}
        />
      ) : null}
    </>
  );
}

export default Rows