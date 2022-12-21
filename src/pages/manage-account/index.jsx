import { BsCheckCircleFill } from 'react-icons/bs';
import React, { useContext, useEffect } from 'react';
import { ModalStateContext } from '../../context/ModalStateContext';
import { useUserData } from '../../context/AccountContext';
import Spinner from '../../elements/Spinner';
import useUserInfo from '../../hooks/useUserInfo';
import useUnits from '../../hooks/useUnits';
import ChangeNicknameModal from '../../modals/change-nickname-modal';
import ChangePasswordModal from '../../modals/change-password-modal';
import ChangeEmailModal from '../../modals/change-email-modal';
import ChangeUnitsModal from '../../modals/change-units-modal';
import DeleteAccountModal from '../../modals/delete-account-modal';
import './manageAccount.scss';


const ManageAccount = ({setTitle}) => {

  useEffect(() => {
    setTitle("Manage Account");
  }, [])

  const userData = useUserData();
  
  const { data: units, 
          isLoading: unitsAreLoading,
        } = useUnits();

  const { data: userUnitIds, 
          isLoading: userUnitIdsAreLoading,
        } = useUserInfo();
  
  const { modal, 
          openChangeNicknameModal,
          openChangePasswordModal,
          openChangeEmailModal,
          openChangeUnitsModal,
          openDeleteAccountModal,
          modalModeSelection 
        } = useContext(ModalStateContext);

  if (unitsAreLoading || userUnitIdsAreLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className="justify-center my-2">
        <div className="py-5 px-3">
          <div className="bg-white shadow-sm rounded w-full lg:max-w-xl mx-auto py-6 p-10 mb-6">
            <h3 className="text-xl font-medium pb-6">Account Details</h3>
            <ul>
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

          <div className="bg-white shadow-sm rounded w-full lg:max-w-xl mx-auto py-6 p-10 mb-6">
            <div className="flex justify-between">
              <h3 className="text-xl font-medium pb-6">Coffee / Recipe Units</h3>
              <div className="ml-6">
                <a
                  href="#"
                  onClick={openChangeUnitsModal}
                  className="underline text-blue"
                >
                  Edit
                </a>
              </div>
            </div>
            <div className="flex justify-between">
              <ul>
                <li key="name" className="flex pb-4">
                  <div className="w-48">Volume weight: </div>
                  <div>
                    {units["solid" + userUnitIds.unit_solid_weight_id].label}
                  </div>
                  <div className="ml-2">
                    {units["solid" + userUnitIds.unit_solid_weight_id].short_label}
                  </div>
                </li>
                <li key="email" className="flex pb-4">
                  <div className="w-48">Fluid wight: </div>
                  <div>
                    {units["fluid" + userUnitIds.unit_fluid_weight_id].label}
                  </div>
                  <div className="ml-2">
                    {units["fluid" + userUnitIds.unit_fluid_weight_id].short_label}
                  </div>
                </li>
                <li key="password" className="flex pb-4">
                  <div className="w-48">Water Temperature: </div>
                  <div>
                    {units["temp" + userUnitIds.unit_temperature_id]?.label}
                  </div>
                  <div className="ml-2">
                    {units["temp" + userUnitIds.unit_temperature_id]?.short_label}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded w-full lg:max-w-xl mx-auto py-6 p-10 mb-6">
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

          <div className="bg-white shadow-sm rounded w-full lg:max-w-xl mx-auto py-6 p-10 mb-6">
            <div className="flex justify-between">
              <div>
                <a
                  href="#"
                  onClick={openDeleteAccountModal}
                  className="underline text-blue"
                >
                  Delete Account
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="py-5 px-3">
          <div className="bg-white shadow-sm rounded w-full lg:max-w-xl mx-auto py-6 p-10 mb-6">
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

      {modal.isOpen && modal.mode === modalModeSelection.changeUnits && (
        <ChangeUnitsModal />
      )}

      {modal.isOpen && modal.mode === modalModeSelection.deleteAccount && (
        <DeleteAccountModal email={userData.email} />
      )}
    </>
  );
}

export default ManageAccount