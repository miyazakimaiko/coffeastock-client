import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { PencilAltIcon, PlusSmIcon, XIcon } from '@heroicons/react/outline'
import Header from '../../shared/Header'
import { CustomRangeContext } from '../../context/CustomRange';
import { AccountContext } from '../../context/Account';

const SettingsCustomRange = ({parentCat, cat}) => {
  const { userData } = useContext(AccountContext);
  const { customRange, setCustomRange } = useContext(CustomRangeContext);
  let elements = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/user/${userData.sub}/range/${cat}`,
          { method: "GET" }
        );
        const parseRes = await response.json();  
        setCustomRange(parseRes);
      } catch (error) {}
    };
    fetchData();
  }, [cat]);
 
  const setElements = () => {
    if (customRange !== null) {
      Object.keys(customRange).forEach((key) => {
        elements.push(
          <tr id={`${cat}-${key}`}>
            <td>
              <p>{customRange[key]['name']}</p>
            </td>
            <td>
              <p>{customRange[key]['def']}</p>
            </td>
            <td className="td-options">
              <button
                onClick={() => setEditMode({
                  'id': key,
                  'name': customRange[key]['name'],
                  'def': customRange[key]['def']
                })}
                className="option-button"
              >
                <PencilAltIcon className="icon text-green" />
              </button>
              <button 
                onClick={() => setDeleteMode({
                  'id': key.replace('id-', ''),
                  'name': customRange[key]['name']
                })}
                type="button"
                className="option-button delete-button"
              >
                <XIcon className="icon text-red" />
              </button>
            </td>
          </tr>
        )
      })
    }
  }
  setElements();

  const [mode, setMode] = useState('');
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const closeAddEditModal = () => {
    setOpenAddEditModal(false);
    setAddRangeName('');
    setAddRangeDef('');
  }

  //====================================================================
  //                             ADD 
  //====================================================================
  const [addRangeName, setAddRangeName] = useState('');
  const [addRangeDef, setAddRangeDef] = useState('')
  const setAddMode = () => {
    setMode('add')
    setOpenAddEditModal(true);
  }

  const onAddSubmit = async (event) => {
    event.preventDefault();
    if (addRangeName == '') {
      document.getElementById("nameError").innerHTML = 'This field is required.';
      return;
    }

    try {
      const OneLinerangeDef = addRangeDef.replace(/(\r\n|\n|\r)/gm, " ");
      const response = await fetch(
        `http://localhost:4000/api/v1/user/${userData.sub}/range/${cat}`,
        {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({
            "name": addRangeName,
            "def": OneLinerangeDef
          })
        }
      );
      const parseRes = await response.json();
      if (parseRes.status === 'error') {
        toast.error(parseRes.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
      else {
        setCustomRange(parseRes);
        closeAddEditModal();
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  }


  //====================================================================
  //                             EDIT 
  //====================================================================
  const [editRangeId, setEditRangeId] = useState('');
  const [editRangeName, setEditRangeName] = useState('');
  const [editRangeDef, setEditRangeDef] = useState('');
  const setEditMode = async (entry) => {
    setMode('edit');
    await setEditRangeId(entry.id.replace('id-', ''));
    await setEditRangeName(entry.name);
    await setEditRangeDef(entry.def);
    setOpenAddEditModal(true);
  }

  const onEditSubmit = async (event) => {
    event.preventDefault();
    if (editRangeName == '') {
      toast.error("Name cannot be empty.", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    }

    try {
      const OneLineRangeDef = editRangeDef.replace(/(\r\n|\n|\r)/gm, " ");
      const response = await fetch(
        `http://localhost:4000/api/v1/user/${userData.sub}/range/${cat}/${editRangeId}`,
        {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({
            "name": editRangeName,
            "def": OneLineRangeDef
          })
        }
      );
      const parseRes = await response.json();
      if (parseRes.status === 'error') {
        toast.error(parseRes.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
      else {
        setCustomRange(parseRes);
        closeAddEditModal();
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  }

  //====================================================================
  //                             DELETE
  //====================================================================
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState({})
  const setDeleteMode = async (entry) => {
    setEntryToDelete(entry);
    await setOpenDeleteModal(true);
    document.getElementById("nameToDelete").innerHTML = entry.name;
  }

  const onDeleteSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/user/${userData.sub}/range/${cat}/${entryToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            'Content-Type': "application/json"
          }
        }
      );
      const parseRes = await response.json();
      if (parseRes.status === 'error') {
        toast.error(parseRes.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
      else {
        setCustomRange(parseRes);
        setOpenDeleteModal(false);
      }

    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  } 


  return (
    <>
      <Header title={`Customize ${parentCat} Setting`}/>
      <div className="px-2">
        <div className="flex mb-4 w-full flex-wrap justify-center">
          <div className="px-3 w-full">
            <div className="p-4 flex justify-center">
              <h3 className="mr-3 font-bold text-2xl text-center capitalize">{cat} range</h3>
              <button
                onClick={setAddMode}
                type="button"
                className="bg-blue text-white rounded-3xl px-2 py-1 flex items-center font-capitals uppercase font-bold text-xs tracking-widest"
                >
                <PlusSmIcon className="w-4 h-4 mr-1 inline" />
                Add New
              </button>
            </div>
            
            <div 
              className="mt-3 p-4 bg-white shadow-sm rounded-md max-w-5xl m-auto"
            >
              <table className="settings-table w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Details</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {elements}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {openAddEditModal ? 
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-1/2 my-6 mx-auto">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center justify-between p-4 rounded-t">
                <h3 className="text-xl font-light capitalize">
                  {mode === 'add' ? <>add new</>: mode === 'edit' ? <>edit</>: null} {cat}
                </h3>
                <button
                  className="p-1 ml-auto border-0 text-black float-right"
                  onClick={closeAddEditModal}
                >
                  <XIcon className="h-6 w-6"/>
                </button>
              </div>
              {/*body*/}
              <div class="content">
                <form 
                  id={`${cat}AddForm`}
                  className="w-full"
                  onSubmit={
                    mode === 'add' ? onAddSubmit :
                    mode === 'edit' ? onEditSubmit : null
                  }
                >
                  <div className="bg-white px-6 shadow-sm rounded-md">
                    <div className="card-content pt-3">
                      <div className="pb-3">
                        <label className="font-bold capitalize">{cat} name</label>
                        <input type="text" name="name" placeholder={`${cat} name`} className="blue-outline-transition bg-creme block w-full text-base py-2 px-3 rounded-md"
                          value={mode === 'add' ? addRangeName : mode === 'edit' ? editRangeName : null}
                          onChange={
                            mode === 'add' ? e => setAddRangeName(e.target.value) :
                            mode === 'edit' ? e => setEditRangeName(e.target.value) : null
                          }
                        />
                      </div>
                      <div className="pb-3">
                        <label className="font-bold capitalize">{cat} details</label>
                        <textarea type="text" name="definition" placeholder={`${cat} details`} className="blue-outline-transition bg-creme block w-full h-32 text-base py-2 px-3 rounded-md"
                          value={mode === 'add' ? addRangeDef : mode === 'edit' ? editRangeDef : null}
                          onChange={
                            mode === 'add' ? e => setAddRangeDef(e.target.value) :
                            mode === 'edit' ? e => setEditRangeDef(e.target.value) : null
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-end py-4 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={closeAddEditModal}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-blue text-white opacity-80 hover:opacity-100 font-bold uppercase text-sm px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
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
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-1/3 my-6 mx-auto">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center justify-between p-3 rounded-t">
                <button
                  className="p-1 ml-auto border-0 text-black float-right"
                  onClick={() => setOpenDeleteModal(false)}
                >
                  <XIcon className="h-6 w-6"/>
                </button>
              </div>
              {/*body*/}
              <div className="card-content px-3 pb-2">
                <p className='text-center text-base'>Are you sure to delete the entry <strong id="nameToDelete"></strong> ?</p>
              </div>
              <div className="flex items-center justify-end py-3 px-6 rounded-xl">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOpenDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red text-white opacity-80 hover:opacity-100 font-bold uppercase text-sm px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
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

export default SettingsCustomRange
