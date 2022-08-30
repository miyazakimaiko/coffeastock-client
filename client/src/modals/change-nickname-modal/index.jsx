import { XIcon } from '@heroicons/react/outline';
import React, { useContext, useState } from 'react';
import { useChangeAttribute } from '../../context/AccountContext';
import { ModalStateContext } from '../../context/ModalStateContext';


const ChangeNicknameModal = () => {
  const { closeModal } = useContext(ModalStateContext);
  const [nickname, setNickname] = useState('');
  const changeAttribute = useChangeAttribute();

  function changeNickname(e) {
    e.preventDefault();

    const success = changeAttribute('nickname', nickname);
    if (success) closeModal();
  }

  return (
    <>
      <div
        className="justify-center flex overflow-x-hidden 
        overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div 
          className="relative h-fit w-full max-w-xl md:px-2 md:my-8 mx-auto"
        >
          <div 
            className="w-full border-0 rounded-lg shadow-lg relative p-8
            flex flex-col bg-white outline-none focus:outline-none"
          >
            <h3 className="md:text-lg font-light">
              Change Nickname
            </h3>
            <button
              className="absolute right-4 top-4 border-0 text-black float-right"
              onClick={closeModal}>
              <XIcon className="h-6 w-6"/>
            </button>

            <div className="card-content py-6">
              <p>
                Please enter new nickname.
              </p>
            </div>
            <div className="w-full">
                <form onSubmit={(e) => changeNickname(e)}>
                  <div className="card-content w-80 mx-auto">
                    <div className="pb-6">
                      <input type="text" name="nickname" placeholder="Enter nickname" className="blue-outline-transition bg-creme block w-full py-2 px-3 rounded-md"
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <button 
                      type="submit"
                      disabled={nickname.length === 0}
                      className="shadow-sm rounded-3xl pl-6 pr-8 py-2 my-2 ml-4 bg-blue button-transition text-white flex"
                    >
                      <span className="ml-1">Save</span>
                    </button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default ChangeNicknameModal