import React, { useContext, useState } from 'react';
import { useChangeAttribute } from '../../context/AccountContext';
import { ModalStateContext } from '../../context/ModalStateContext';
import ModalWrapperContainer from '../../elements/ModalWrapperContainer';


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
      <ModalWrapperContainer
        onCloseClick={closeModal}
        title="Change Nickname"
      >
        <div className="card-content px-6 pb-6 justify-center text-center">
          <p className="mb-6">
            Please enter new nickname.
          </p>
          <form onSubmit={(e) => changeNickname(e)}>
            <div className="card-content w-80 mx-auto">
              <div className="pb-6">
                <input type="text" name="nickname" placeholder="Enter nickname" className="blue-outline-transition bg-creme block w-full py-2 px-3 rounded-md text-lg"
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
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
      </ModalWrapperContainer>
    </>
  )
}

export default ChangeNicknameModal