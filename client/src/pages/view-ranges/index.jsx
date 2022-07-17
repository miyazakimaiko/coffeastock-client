import React, { useState, useContext } from 'react'
import ToolBar from '../../components/toolbar';
import ToolBarButton from '../../components/toolbar/ToolBarButton';
import Table from './components/Table';
import ToolBarSearchBar from '../../components/toolbar/ToolBarSearchBar';
import { ModalStateContext } from '../../context/ModalStateContext';
import AddEditRangeModal from '../../modals/add-edit-range-modal';


const ViewRanges = ({cat: rangeName}) => {
  const { modal,  openAddRangeModal, modalModeSelection } = useContext(ModalStateContext);

  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="px-2 md:px-4 pt-8">
        <ToolBar pageTitle={`${rangeName} Range`}>
          <ToolBarButton
            title={`New ${rangeName}`}
            onClick={() => {
              openAddRangeModal();
            }}
          />
          <div className="flex">
            <ToolBarSearchBar value={searchValue} onChange={setSearchValue} />
          </div>
        </ToolBar>
        <Table searchValue={searchValue} rangeName={rangeName}/>
      </div>

      {modal.mode === modalModeSelection.addRange && modal.isOpen === true ? (
        <AddEditRangeModal
          rangeName={rangeName}
        />
      ) : null}
    </>
  );
}

export default ViewRanges
