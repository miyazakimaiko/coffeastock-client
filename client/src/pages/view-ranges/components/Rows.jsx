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
  const deleteRange = useDeleteRange(userData.sub, userData.accessToken.jwtToken);
  const {modal, openEditRangeModal, openDeleteRangeModal, closeModal, modalModeSelection} = useContext(ModalStateContext);
  const [rangeItem, setRangeItem] = useState({ value: "", label: "", def: "" });


  const onEditClick = (item) => {
    setRangeItem({
      ...item,
      label: unescapeHtml(item.label),
      def: unescapeHtml(item.def),
    });
    openEditRangeModal();
  }


  const onDeleteClick = (item) => {
    setRangeItem({
      ...item,
      label: unescapeHtml(item.label),
      def: unescapeHtml(item.def),
    });
    openDeleteRangeModal();
  }


  const onDeleteSubmit = async (event) => {
    event.preventDefault();
    deleteRange.mutate({
      rangeName: rangeName, 
      body: rangeItem
    })
    closeModal();
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

      {modal.mode === modalModeSelection.editRange && modal.isOpen === true ? (
        <AddEditRangeModal
          rangeName={rangeName}
          targetRangeItem={rangeItem}
        />
      ) : null}

      {modal.mode === modalModeSelection.deleteRange && modal.isOpen === true ? (
        <DeleteModal
          label={rangeItem.label}
          onDeleteSubmit={onDeleteSubmit}
        />
      ) : null}
    </>
  );
}

export default Rows