import React, { useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineChevronRight } from 'react-icons/hi'
import CoffeeBagRight from '../../assets/svgs/CoffeeBagRight';
import { unescapeHtml } from '../../helpers/HtmlConverter'
import { ModalStateContext } from '../../context/ModalStateContext';
import useBean from '../../hooks/useBean';
import useDeleteBean from '../../hooks/useDeleteBean';
import ToolBar from '../../components/toolbar';
import Dropdown from '../../elements/Dropdown';
import DeleteModal from '../../modals/delete-modal';
import AddEditBeanModal from '../../modals/add-edit-bean-modal'
import RecipeSection from './components/RecipeSection';
import CoffeeRangeListForBlend from './components/CoffeeRangeListForBlend';
import CoffeeRangeListForSO from './components/CoffeeRangeListForSO';
import CoffeeRangeListForAll from './components/CoffeeRangeListForAll';
import './ViewBeanAndRecipes.scss'


const ViewBeanAndRecipes = () => {
  const { id } = useParams();
  const { data: targetBean, isLoading: targetBeanIsLoading } = useBean(id)
  const deleteBean = useDeleteBean()

  const navigate = useNavigate()

  const { modal, 
          openEditBeanModal, 
          openDeleteBeanModal, 
          closeModal, 
          modalModeSelection} = useContext(ModalStateContext);

  const onDeleteSubmit = () => {
    deleteBean.mutate(targetBean, {
      onSuccess: () => navigate('/coffees', {replace: true})
    })
    closeModal();
  }

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  },[]);


  if (targetBeanIsLoading) {
    return "Loading...";
  }

  return (
    <>
      <div className="px-4 pt-8 w-full max-w-980px mx-auto">
        <ToolBar
          titleHtml={
            <span className="flex items-center">
              {targetBean.single_origin ? "Single Origin" : "Blend"}
              <HiOutlineChevronRight className="h-5 w-5 mx-5" />
              {unescapeHtml(targetBean.label)}
            </span>
          }
        ></ToolBar>
        <div className="my-4">
          <div className="relative p-2 py-12">
            <div className="absolute top-5 right-4">
              <Dropdown dropdownText="" type="dot">
                <div className="dropdown-content">
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={openEditBeanModal}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={openDeleteBeanModal}
                  >
                    Delete
                  </button>
                </div>
              </Dropdown>
            </div>
            <div className="coffee-bag-container mx-auto mt-14">
              <CoffeeBagRight name={targetBean.label} />
            </div>
            <div className="flex flex-wrap justify-center mt-16">
              <div className="w-full md:w-1/2 my-4 md:px-4">
                { <CoffeeRangeListForAll bean={targetBean} /> }
              </div>

              <div className="w-full md:w-1/2 my-4 md:px-4">
                { targetBean.single_origin 
                  ? <CoffeeRangeListForSO bean={targetBean} /> 
                  : <CoffeeRangeListForBlend bean={targetBean} /> }
              </div>
            </div>

            {targetBean.memo !== null && targetBean.memo !== "" ? (
              <div className="px-6 pt-4">
                <label className=" font-medium mr-3">Memo: </label>
                <div className="inline-block">
                  {unescapeHtml(targetBean.memo)}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <RecipeSection />
      </div>

      {modal.mode === modalModeSelection.editBean && modal.isOpen ? (
        <AddEditBeanModal
          mode="edit"
          targetBean={targetBean}
        />
      ) : null}
      {modal.mode === modalModeSelection.deleteBean && modal.isOpen ? (
        <DeleteModal
          label={targetBean.label}
          onDeleteSubmit={onDeleteSubmit}
        />
      ) : null}
    </>
  );
}

export default ViewBeanAndRecipes
