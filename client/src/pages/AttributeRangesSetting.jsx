import React, { useState, useEffect, useContext, useReducer } from 'react'
import { toast } from 'react-toastify'
import { PencilAltIcon, PlusIcon, XIcon } from '@heroicons/react/outline'
import { AttributeRangeContext } from '../context/AttributeRangeContext';
import { AccountContext } from '../context/AccountContext';
import { unescapeHtml } from '../utils/HtmlConverter'

const ACTION = {
  SET_ID: 'setId',
  SET_LABEL: 'setLabel',
  SET_DEFINITION: 'setDefinition'
}

const MODE = {
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete'
}

const ManageAttributeRanges = ({cat}) => {
  const { userData } = useContext(AccountContext);
  const { 
    attributeRangeList, 
    fetchAttributeRangeList, 
    insertAttribute, 
    editAttribute, 
    deleteAttribute 
  } = useContext(AttributeRangeContext);
  
  const [nameWarningText, setNameWarningText] = useState('');

  const validateLabel = (label) => {
    const banned = ['&', '<', '>', '"', "'"];
    let includesBannedChar = false;
    banned.forEach(char => {
      if (label.includes(char)) includesBannedChar = true;
    })
    if (includesBannedChar) {
      setNameWarningText(<span className="text-red">Special characters cannot be used in this field.</span>)
    }     
    else if (label.length > 60) {
      setNameWarningText(<span className="text-red">{60 - label.length}/60</span>)
    } 
    else {
      setNameWarningText(`${60 - label.length}/60`)
    }
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'setId':
        return { ...state, value: action.payload };
      case 'setLabel':
        validateLabel(action.payload);
        return { ...state, label: action.payload };
      case 'setDefinition':
        return { ...state, def: action.payload };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, { value: '', label: '', def: '' });

  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [mode, setMode] = useState('');

  const closeAddEditModal = () => {
    setOpenAddEditModal(false);
    dispatch({ type: ACTION.SET_LABEL, payload: '' });
    dispatch({ type: ACTION.SET_DEFINITION, payload: '' });
  }

  const onAddSubmit = async (event) => {
    event.preventDefault();
    if (state.label.length === 0) {
      toast.error('Name field is required.', {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    }

    const OneLinerangeDef = state.def.replace(/(\r\n|\n|\r)/gm, " ");
    const insertBody = {
      "label": state.label,
      "def": OneLinerangeDef
    }
    const insertStatus = await insertAttribute(userData.sub, cat, insertBody);

    if (typeof insertStatus === 'object') {
      toast.error(insertStatus.error.message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    else if (insertStatus === true) {
      toast.success("Entry is added successfully.", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      closeAddEditModal();
      fetchAttributeRangeList(userData.sub)
    }
  }

  const onEditSubmit = async (event) => {
    event.preventDefault();
    if (state.label === '') {
      toast.error("Name cannot be empty.", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    }
    const OneLineRangeDef = state.def.replace(/(\r\n|\n|\r)/gm, " ");
    const body = {
      "label": state.label,
      "def": OneLineRangeDef
    }
    const editSuccess = await editAttribute(userData.sub, cat, state.value, body);
    if (editSuccess) {
      closeAddEditModal();
      fetchAttributeRangeList(userData.sub)
    }
  }

  const onDeleteSubmit = async (event) => {
    event.preventDefault();
    const deleteSuccess = await deleteAttribute(userData.sub, cat, state.value);
    if (deleteSuccess) {
      setOpenDeleteModal(false);
      fetchAttributeRangeList(userData.sub)
    }
  } 

  const [rangeElements, setRangeElements] = useState([]);
  
  const makeRangeElements = (attributeRangeList) => {
    let elements = [];
    const attributeRange = attributeRangeList[cat + "_range"];

    if (Object.keys(attributeRange).length > 0) {
      Object.entries(attributeRange).forEach((entry) => {
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
                onClick={() => {
                  setMode(MODE.EDIT);
                  dispatch({ type: ACTION.SET_ID, payload: item['value'] });
                  dispatch({ type: ACTION.SET_LABEL, payload: item['label'] });
                  dispatch({ type: ACTION.SET_DEFINITION, payload: item['def'] });
                  setOpenAddEditModal(true);
                  }}>
                <PencilAltIcon className="icon text-green" />
              </button>
              <button
                type="button"
                className="option-button delete-button" 
                onClick={ async () => {
                  dispatch({ type: ACTION.SET_ID, payload: item['value'] });
                  await setOpenDeleteModal(true);
                  document.getElementById("labelToDelete").innerHTML = item['label'];
                }}>
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
          <td className="text-center bg-white" colspan="3">There's no entry for this range.</td>
        </tr>
      )
    }
    setRangeElements(elements)
  }

  useEffect(() => {
    if (Object.keys(attributeRangeList).length === 0) {
      fetchAttributeRangeList(userData.sub);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(attributeRangeList).length !== 0) {
      makeRangeElements(attributeRangeList);
    }
  }, [attributeRangeList]);

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
                onClick={() => {
                  setMode(MODE.ADD)
                  setOpenAddEditModal(true);
                }}
                type="button"
                className="flex items-center text-burnt-sienna 
                font-capitals uppercase text-md 
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
                    <div className="mt-3 mb-6">
                      <div className="form-section">
                        <label className="font-semibold uppercase mb-2">{cat} name</label>
                        <input
                          type="text" 
                          name="label"
                          autoComplete="off"
                          placeholder={`${cat} name`} 
                          className="blue-outline-transition 
                          bg-creme block w-full text-base py-2 px-3 rounded-md"
                          value={state.label}
                          onChange={e => dispatch({ type: ACTION.SET_LABEL, payload: e.target.value })}
                        />
                        <span className="text-sm float-right mt-1">{nameWarningText}</span>
                      </div>
                      <div className="form-section">
                        <label className="font-semibold uppercase">{cat} details</label>
                        <textarea 
                          type="text" 
                          name="definition"
                          autoComplete="off"
                          placeholder={`${cat} details`} 
                          className="blue-outline-transition 
                          bg-creme block w-full h-32 text-base py-2 px-3 rounded-lg"
                          value={state.def}
                          onChange={e => dispatch({ type: ACTION.SET_DEFINITION, payload: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pl-4 pr-4 pb-8">
                      <button
                        className="text-red-500 background-transparent 
                        font-bold uppercase px-6 py-2 text-md outline-none 
                        focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={closeAddEditModal}>
                        Cancel
                      </button>
                      <button
                        className="bg-blue text-white opacity-80 
                        hover:opacity-100 font-bold uppercase text-md 
                        px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
                        type="submit">
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
                  font-bold uppercase px-6 py-2 text-md outline-none 
                  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOpenDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red text-white opacity-80 
                  hover:opacity-100 font-bold uppercase text-md 
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

export default ManageAttributeRanges
