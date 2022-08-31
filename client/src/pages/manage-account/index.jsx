import { BsCheckCircleFill, BsPlus } from 'react-icons/bs';
import React, { useContext } from 'react';
import { ModalStateContext } from '../../context/ModalStateContext';
import { useUserData } from '../../context/AccountContext';
import ChangeNicknameModal from '../../modals/change-nickname-modal';
import imgFace from '../../assets/images/face.jpg';
import './manageAccount.scss';
import ChangePasswordModal from '../../modals/change-password-modal';
import ChangeEmailModal from '../../modals/change-email-modal';


const ManageAccount = () => {
  const userData = useUserData();
  const { modal, 
          openChangeNicknameModal,
          openChangePasswordModal,
          openChangeEmailModal,
          modalModeSelection } = useContext(ModalStateContext);


  return (
    <>
      <div className="flex justify-center my-2">
        <div className="py-5 px-3">
          <div className="bg-white shadow-sm rounded w-full max-w-lg mx-auto py-6 p-10 mb-6">
            <h3 className="text-xl font-medium pb-6">Account Details</h3>
            <div className="relative h-40 w-40 mx-auto mb-8">
              <div className="flex-shrink-0">
                <img src={imgFace} className="h-full w-full rounded-full" />
              </div>
              <button className="absolute right-3 bottom-1">
                <BsPlus className="w-8 h-8 bg-orange rounded-full p-1 text-white" />
              </button>
            </div>
            <ul className="pt-4">
              <li key="name" className="flex pb-4">
                <div className="w-48">Nickname: </div>
                <div>{userData.nickname}</div>
                <div className="ml-6">
                  <a
                    href="#"
                    className="underline text-blue"
                    onClick={openChangeNicknameModal}
                  >
                    Edit
                  </a>
                </div>
              </li>
              <li key="email" className="flex pb-4">
                <div className="w-48">Email Address: </div>
                <div>{userData.email}</div>
                <div className="ml-6">
                  <a
                    href="#"
                    className="underline text-blue"
                    onClick={openChangeEmailModal}
                  >
                    Edit
                  </a>
                </div>
              </li>
              <li key="password" className="flex pb-4">
                <div className="w-48">Password: </div>
                <div>***********</div>
                <div className="ml-6">
                  <a
                    href="#"
                    className="underline text-blue"
                    onClick={openChangePasswordModal}
                  >
                    Edit
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white shadow-sm rounded w-full max-w-lg mx-auto py-6 p-10 mb-6">
            <h3 className="text-xl font-medium pb-6">Cofee / Recipe Units</h3>
            <div className="flex justify-between">
              <ul>
                <li key="name" className="flex pb-4">
                  <div className="w-48">Volume weight: </div>
                  <div>gram</div>
                  <div className="ml-6">
                    <a href="#" className="underline text-blue">
                      Edit
                    </a>
                  </div>
                </li>
                <li key="email" className="flex pb-4">
                  <div className="w-48">Fluid wight: </div>
                  <div>litle</div>
                  <div className="ml-6">
                    <a href="#" className="underline text-blue">
                      Edit
                    </a>
                  </div>
                </li>
                <li key="password" className="flex pb-4">
                  <div className="w-48">Water Temperature: </div>
                  <div>celcius</div>
                  <div className="ml-6">
                    <a href="#" className="underline text-blue">
                      Edit
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded w-full max-w-lg mx-auto py-6 p-10 mb-6">
            <h3 className="text-xl font-medium pb-6">Plan</h3>
            <div className="flex justify-between">
              <ul>
                <li key="name" className="flex pb-4">
                  <div className="w-48">Premium Plan</div>
                  <div className="ml-6">
                    <a href="#" className="underline text-blue">
                      Change
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded w-full max-w-lg mx-auto py-6 p-10 mb-6">
            <div className="flex justify-between">
              <div>
                <button>Delete Account</button>
              </div>
            </div>
          </div>
        </div>

        <div className="py-5 px-3">
          <div className="bg-white shadow-sm rounded w-full max-w-lg mx-auto py-6 p-10 mb-6">
            <h3 className="text-xl text-center font-medium pb-6">
              Upgrade to Premium
            </h3>
            <div>
              <ul>
                <li key="pro-1" className="flex pb-4">
                  <div className="flex">
                    <BsCheckCircleFill className="w-5 h-5 mr-3 text-green" />
                    Store up to <span className="font-medium px-2">
                      400
                    </span>{" "}
                    coffee beans data
                  </div>
                </li>
                <li key="pro-2" className="flex pb-4">
                  <div className="flex">
                    <BsCheckCircleFill className="w-5 h-5 mr-3 text-green" />
                    Store up to <span className="font-medium px-2">
                      100
                    </span>{" "}
                    recipes per bean
                  </div>
                </li>
                <li key="pro-3" className="flex pb-4">
                  <div className="flex">
                    <BsCheckCircleFill className="w-5 h-5 mr-3 text-green" />
                    Custom Beans/Recipes Attributes
                  </div>
                </li>
                <li key="pro-4" className="flex pb-4">
                  <div className="flex">
                    <BsCheckCircleFill className="w-5 h-5 mr-3 text-green" />
                    Compare Recipes functionality
                  </div>
                </li>
              </ul>
              <div>
                <a href="#" className="mt-4 btn upgrade-button">
                  Upgrade Plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal.isOpen && modal.mode === modalModeSelection.changeNickname && (
        <ChangeNicknameModal />
      )}

      {modal.isOpen && modal.mode === modalModeSelection.changePassword && (
        <ChangePasswordModal currentUserEmail={userData.email} />
      )}

      {modal.isOpen && modal.mode === modalModeSelection.changeEmail && (
        <ChangeEmailModal />
      )}
    </>
  );
}

export default ManageAccount