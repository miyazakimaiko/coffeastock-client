import React, { useState, useEffect, useContext } from 'react'
import ToolBar from '../../components/toolbar';
import ToolBarButton from '../../components/toolbar/ToolBarButton';
import Table from './components/Table';
import ToolBarSearchBar from '../../components/toolbar/ToolBarSearchBar';
import { ModalStateContext } from '../../context/ModalStateContext';
import AddEditRangeModal from '../../modals/add-edit-range-modal';

const modalMode = {
  addRange: 'addRange',
  editRange: 'editRange',
  deleteRange: 'deleteRange'
}

const ManageAttributeRanges = ({cat: rangeName}) => {
  const { modal, setModal } = useContext(ModalStateContext);

  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="px-2 md:px-4 pt-8">
        <ToolBar pageTitle={`${rangeName} Range`}>
          <ToolBarButton
            title={`New ${rangeName}`}
            onClick={() => {
              setModal({ mode: modalMode.addRange, isOpen: true });
            }}
          />
          <div className="flex">
            <ToolBarSearchBar value={searchValue} onChange={setSearchValue} />
          </div>
        </ToolBar>
        <Table searchValue={searchValue} rangeName={rangeName}/>
      </div>

      {modal.mode === modalMode.addRange && modal.isOpen === true ? (
        <AddEditRangeModal
          setModal={setModal}
          rangeName={rangeName}
          mode={modal.mode}
        />
      ) : null}
    </>
  );
}

export default ManageAttributeRanges
