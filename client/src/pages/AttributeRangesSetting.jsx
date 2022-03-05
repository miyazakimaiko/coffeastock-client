import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { PencilAltIcon, PlusIcon, XIcon } from '@heroicons/react/outline'
import { AttributeRangeContext } from '../context/AttributeRangeContext';
import { AccountContext } from '../context/AccountContext';
import { unescapeHtml } from '../utils/HtmlConverter'
import AttributeFormInput from '../components/AttributeFormInput';

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
  
  const [attribute, setAttribute] = useState({ value: '', label: '', def: '' });
  const [modal, setModal] = useState({ mode: '', isOpen: false });
  const [attributeListHtml, setAttributeListHtml] = useState([]);

  const inputs = [
    {
      id: 1,
      name: 'label',
      type: 'text',
      placeholder: 'Name',
      autoComplete: 'off',
      category: cat,
      message: `Special characters (", ', \`, <, >) cannot be used in this field.`,
      label: `${cat.charAt(0).toUpperCase() + cat.slice(1)} Name`,
      pattern: `[^'"<>\`]*$`,
      required: true,
    },
    {
      id: 2,
      name: 'def',
      type: 'textarea',
      placeholder: 'Details',
      autoComplete: 'off',
      category: cat,
      message: `Line change cannot be used in this field.`,
      label: `${cat.charAt(0).toUpperCase() + cat.slice(1)} Details`,
    },
  ];

  const onChange = (e) => {
    setAttribute({...attribute, [e.target.name]: e.target.value })
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

  const onEditSubmit = async (event) => {
    event.preventDefault();
    if (attribute.label.length === 0) {
      toast.error("Name cannot be empty.", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    }
    const editSuccess = await editAttribute(
      userData.sub, 
      cat, 
      attribute.value, 
      { "label": attribute.label, "def": attribute.def.replace(/(\r\n|\n|\r)/gm, " ") }
    );
    if (editSuccess) {
      setModal({ mode: '', isOpen: false })
      fetchAttributeRangeList(userData.sub)
    }
  }

  const onDeleteSubmit = async (event) => {
    event.preventDefault();
    const deleteSuccess = await deleteAttribute(userData.sub, cat, attribute.value);
    if (deleteSuccess) {
      setModal({ mode: '', isOpen: false })
      fetchAttributeRangeList(userData.sub)
    }
  } 

  useEffect(() => {
    if (Object.keys(attributeRangeList).length === 0) {
      fetchAttributeRangeList(userData.sub);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(attributeRangeList).length !== 0) {
      const attributeRange = attributeRangeList[cat + "_range"];
      if (Object.keys(attributeRange).length > 0) {
        let elements = [];
        Object.keys(attributeRange).forEach(key => {
          const item = attributeRange[key];
          elements.push(
            <tr id={`${cat}-${item['value']}`}>
              <td><p>{unescapeHtml(item['label'])}</p></td>
              <td><p>{unescapeHtml(item['def'])}</p></td>
              <td className="td-options">
                <button
                  className="option-button"
                  onClick={() => {
                    setAttribute({ value: item['value'], label: item['label'], def: item['def'] });
                    setModal({ mode: MODE.EDIT, isOpen: true })
                  }}><PencilAltIcon className="icon text-green" />
                </button>
                <button
                  type="button"
                  className="option-button delete-button" 
                  onClick={() => {
                    setAttribute({...attribute, value: item['value'], label: item['label'] })
                    setModal({ mode: MODE.DELETE, isOpen: true })
                  }}><XIcon className="icon text-red" />
                </button>
              </td>
            </tr>
          )
        });
        setAttributeListHtml(elements);
      }
      else setAttributeListHtml( [<tr><td className="text-center bg-white" colspan="3">There's no entry for this range.</td></tr>] );
    }
  }, [attributeRangeList, cat]);

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
                  setAttribute({ value: '', label: '', def: '' });
                  setModal({ mode: MODE.ADD, isOpen: true })
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
                  {attributeListHtml}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {(modal.isOpen === true && (modal.mode === MODE.ADD || modal.mode === MODE.EDIT)) ? 
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
                  {modal.mode === MODE.ADD ? <>add new</>: modal.mode === MODE.EDIT ? <>edit</>: null} {cat}
                </h3>
                <button
                  className="absolute top-4 right-4 text-black"
                  onClick={() => setModal({ mode: '', isOpen: false })}>
                  <XIcon className="h-6 w-6"/>
                </button>
              </div>
              {/*body*/}
              <div className="content">
                <form 
                  id={`${cat}AddForm`}
                  className="w-full"
                  onSubmit={
                    modal.mode === MODE.ADD ? onAddSubmit :
                    modal.mode === MODE.EDIT ? onEditSubmit : null
                  }
                >
                  <div className="bg-white px-6 shadow-sm rounded-md">
                    <div className="mt-3 mb-6">
                    {inputs.map((input) => (
                      <AttributeFormInput
                        key={input.id}
                        {...input}
                        value={attribute[input.name]}
                        onChange={onChange}
                      />
                    ))}
                    </div>
                    <div className="flex items-center justify-between pl-4 pr-4 pb-8">
                      <button
                        className="text-red-500 background-transparent 
                        font-bold uppercase px-6 py-2 text-md outline-none 
                        focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setModal({ mode: '', isOpen: false })}>
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

      {modal.isOpen === true && modal.mode === MODE.DELETE ? 
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
                  onClick={() => setModal({ mode: '', isOpen: false })}
                >
                  <XIcon className="h-6 w-6"/>
                </button>
              </div>
              {/*body*/}
              <div className="card-content px-3 py-10">
                <p className='text-center text-base'>
                  Are you sure to delete the entry <strong>{attribute.label}</strong> ?
                </p>
              </div>
              <div className="flex items-center justify-between px-8 pb-8">
                <button
                  className="text-red-500 background-transparent 
                  font-bold uppercase px-6 py-2 text-md outline-none 
                  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setModal({ mode: '', isOpen: false })}
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
