import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { PencilAltIcon, PlusIcon, XIcon } from '@heroicons/react/outline'
import { CustomRangesContext } from '../../context/CustomRanges';
import { AccountContext } from '../../context/Account';
import { unescapeHtml } from '../../utils/HtmlConverter'

const SettingsCustomRanges = ({cat}) => {
  const { userData } = useContext(AccountContext);
  const { customRanges, getCustomRange, insertEntry, editEntry, deleteEntry } = useContext(CustomRangesContext);

  const [addRangeName, setAddRangeName] = useState('');
  const [addRangeValue, setAddRangeValue] = useState('')
  const [editRangeId, setEditRangeId] = useState('');
  const [editRangeName, setEditRangeName] = useState('');
  const [editRangeValue, setEditRangeValue] = useState('');
  const [entryToDelete, setEntryToDelete] = useState({})

  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [mode, setMode] = useState('');
  const setAddMode = () => {
    setMode('add')
    setOpenAddEditModal(true);
  }
  const setEditMode = async (entry) => {
    setMode('edit');
    setEditRangeId(entry.id);
    setEditRangeName(entry.label);
    setEditRangeValue(entry.def);
    setOpenAddEditModal(true);
  }
  const setDeleteMode = async (entry) => {
    setEntryToDelete(entry);
    await setOpenDeleteModal(true);
    document.getElementById("labelToDelete").innerHTML = entry.label;
  }

  const closeAddEditModal = () => {
    setOpenAddEditModal(false);
    setAddRangeName('');
    setAddRangeValue('');
  }

  const onAddSubmit = async (event) => {
    event.preventDefault();
    if (addRangeName == '') {
      toast.error('Name field is required.', {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    }

    const OneLinerangeDef = addRangeValue.replace(/(\r\n|\n|\r)/gm, " ");
    const insertBody = {
      "label": addRangeName,
      "def": OneLinerangeDef
    }
    const insertStatus = await insertEntry(userData.sub, cat, insertBody);

    if (typeof insertStatus == 'object') {
      toast.error(insertStatus.error.message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    else if (insertStatus == true) {
      toast.success("Entry is added successfully.", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      closeAddEditModal();
    }
  }

  const onEditSubmit = async (event) => {
    event.preventDefault();
    if (editRangeName == '') {
      toast.error("Name cannot be empty.", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    }

    const OneLineRangeValue = editRangeValue.replace(/(\r\n|\n|\r)/gm, " ");
    const body = {
      "label": editRangeName,
      "def": OneLineRangeValue
    }
    const editSuccess = await editEntry(userData.sub, cat, editRangeId, body);
    if (editSuccess) {
      closeAddEditModal();
    }
  }

  const onDeleteSubmit = async (event) => {
    event.preventDefault();
    const deleteSuccess = await deleteEntry(userData.sub, cat, entryToDelete.id);
    if (deleteSuccess) {
      setOpenDeleteModal(false);
    }
  } 
 
  const makeRangeElements = () => {
    let elements = [];
    const customRange = customRanges[cat + "_range"];

    if (Object.keys(customRange).length > 0) {
      Object.entries(customRange).forEach((entry) => {
        const item = entry[1];
        elements.push(
          <tr id={`${cat}-${item['value']}`}>
            <td>
              <p>{unescapeHtml(item['label'])}</p>
            </td>
            <td>
              <p>{unescapeHtml(item['def'])}</p>
            </td>
            <td className="td-options">
              <button
                className="option-button"
                onClick={() => setEditMode({
                  'id': item['value'],
                  'label': item['label'],
                  'def': item['def']
                })}>
                <PencilAltIcon className="icon text-green" />
              </button>
              <button
                type="button"
                className="option-button delete-button" 
                onClick={() => setDeleteMode({
                  'id': item['value'],
                  'label': item['label']
                })}>
                <XIcon className="icon text-red" />
              </button>
            </td>
          </tr>
        )
      })
    }
    else {
      elements.push(
        <tr>
          <td className="text-center bg-white" colspan="3">There's no entry in this range.</td>
        </tr>
      )
    }
    return elements
  }
  const rangeElements = makeRangeElements();

  useEffect(() => {
    getCustomRange(userData.sub, cat)
  }, [customRanges]);

  return (
    <>
      <div className="px-4 pt-8">
        <div className="flex mb-4 w-full flex-wrap justify-center">
          <div className="px-3 w-full">
            <div className="h-16 flex items-center justify-center mb-8">
              <h3 className="mr-3 text-xl text-center font-capitals uppercase">
                {cat} range
              </h3>
              <button
                onClick={setAddMode}
                type="button"
                className="flex items-center text-burnt-sienna 
                font-capitals uppercase text-sm 
                px-3 ml-4 mr-0 opacity-80 
                hover:opacity-100 ease-linear transition-all duration-150"
                >
                <PlusIcon className="w-4 h-4 mr-1 inline" />
                New {cat}
              </button>
            </div>
            
            <div className="mt-3 px-8 py-4 bg-white shadow-sm rounded-md max-w-5xl m-auto">
              <table className="mb-4 settings-table w-full table-fixed">
                <thead>
                  <tr className="uppercase">
                    <th className="text-left font-medium">Name</th>
                    <th className="text-left font-medium">Details</th>
                    <th className="font-medium">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {rangeElements}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {openAddEditModal ? 
      <>
        <div
          className="justify-center flex 
          overflow-x-hidden overflow-y-auto 
          fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-full md:w-550px px-2 my-16 mx-auto">
            {/*content*/}
            <div
              className="border-0 rounded-lg 
              shadow-lg relative flex flex-col 
              w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div 
                className="flex justify-center py-8 rounded-t 
                border-b border-burnt-sienna border-opacity-20">
                <h3 className="text-lg font-light font-capitals uppercase">
                  {mode === 'add' ? <>add new</>: mode === 'edit' ? <>edit</>: null} {cat}
                </h3>
                <button
                  className="absolute top-4 right-4 text-black"
                  onClick={closeAddEditModal}>
                  <XIcon className="h-6 w-6"/>
                </button>
              </div>
              {/*body*/}
              <div className="content">
                <form 
                  id={`${cat}AddForm`}
                  className="w-full"
                  onSubmit={
                    mode === 'add' ? onAddSubmit :
                    mode === 'edit' ? onEditSubmit : null
                  }
                >
                  <div className="bg-white px-6 shadow-sm rounded-md">
                    <div className="card-content mt-3 mb-6">
                      <div className="form-section">
                        <label className="font-semibold uppercase mb-2">{cat} name</label>
                        <input
                          type="text" 
                          name="label" 
                          placeholder={`${cat} name`} 
                          className="blue-outline-transition 
                          bg-creme block w-full text-base py-2 px-3 rounded-md"
                          value={mode === 'add' ? addRangeName : mode === 'edit' ? unescapeHtml(editRangeName) : null}
                          onChange={
                            mode === 'add' ? e => setAddRangeName(e.target.value) :
                            mode === 'edit' ? e => setEditRangeName(e.target.value) : null
                          }
                        />
                      </div>
                      <div className="form-section">
                        <label className="font-semibold uppercase">{cat} details</label>
                        <textarea 
                          type="text" 
                          name="definition" 
                          placeholder={`${cat} details`} 
                          className="blue-outline-transition 
                          bg-creme block w-full h-32 text-base py-2 px-3 rounded-lg"
                          value={mode === 'add' ? addRangeValue : mode === 'edit' ? unescapeHtml(editRangeValue) : null}
                          onChange={
                            mode === 'add' ? e => setAddRangeValue(e.target.value) :
                            mode === 'edit' ? e => setEditRangeValue(e.target.value) : null
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pl-4 pr-4 pb-8">
                      <button
                        className="text-red-500 background-transparent 
                        font-bold uppercase px-6 py-2 text-sm outline-none 
                        focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={closeAddEditModal}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-blue text-white opacity-80 
                        hover:opacity-100 font-bold uppercase text-sm 
                        px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      : null}

      {openDeleteModal ? 
      <>
        <div
          className="justify-center flex overflow-x-hidden 
          overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">        
          <div className="relative w-full md:w-550px px-2 my-16 mx-auto">
            {/*content*/}
            <div
              className="border-0 rounded-lg
              shadow-lg relative flex flex-col 
              w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div 
                className="flex items-center justify-between p-3 rounded-t 
                border-b border-burnt-sienna border-opacity-20">
                <button
                  className="p-1 ml-auto border-0 text-black float-right"
                  onClick={() => setOpenDeleteModal(false)}
                >
                  <XIcon className="h-6 w-6"/>
                </button>
              </div>
              {/*body*/}
              <div className="card-content px-3 py-10">
                <p className='text-center text-base'>
                  Are you sure to delete the entry <strong id="labelToDelete"></strong> ?
                </p>
              </div>
              <div className="flex items-center justify-between px-8 pb-8">
                <button
                  className="text-red-500 background-transparent 
                  font-bold uppercase px-6 py-2 text-sm outline-none 
                  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOpenDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red text-white opacity-80 
                  hover:opacity-100 font-bold uppercase text-sm 
                  px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
                  type="submit"
                  onClick={onDeleteSubmit}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      : null}
    </>
  )
}

export default SettingsCustomRanges
