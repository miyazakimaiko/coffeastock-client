import React, { useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import CoffeeBagRight from '../../assets/svgs/CoffeeBagRight';
import { unescapeHtml } from '../../helpers/HtmlConverter'
import { TO_COFFEE } from '../../utils/Paths';
import { ModalStateContext } from '../../context/ModalStateContext';
import useBean from '../../hooks/useBean';
import useDeleteBean from '../../hooks/useDeleteBean';
import Dropdown from '../../elements/Dropdown';
import Spinner from '../../elements/Spinner';
import DeleteModal from '../../modals/delete-modal';
import AddEditBeanModal from '../../modals/add-edit-bean-modal'
import ErrorPage from '../error';
import RecipeSection from './components/RecipeSection';
import CoffeeRangeListForBlend from './components/CoffeeRangeListForBlend';
import CoffeeRangeListForSO from './components/CoffeeRangeListForSO';
import CoffeeRangeListForAll from './components/CoffeeRangeListForAll';
import './ViewBeanAndRecipes.scss'


const ViewBeanAndRecipes = ({setTitle}) => {

  useEffect(() => {
    setTitle("Beans & Recipes");
  }, [])
  
  const { id } = useParams();
  
  const { data: targetBean,
          isLoading: targetBeanIsLoading,
         } = useBean(id);

  const deleteBean = useDeleteBean()

  const navigate = useNavigate()

  const { modal, 
          openEditBeanModal, 
          openDeleteBeanModal, 
          closeModal, 
          modalModeSelection
        } = useContext(ModalStateContext);

  const onDeleteSubmit = () => {
    deleteBean.mutate(targetBean, {
      onSuccess: () => navigate(TO_COFFEE, {replace: true})
    })
    closeModal();
  }

  useEffect(() => {
    window.scroll({ top: 0});
  },[]);


  if (targetBeanIsLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className="px-4 w-full max-w-980px mx-auto">
        <div className="my-4">
          <div className="relative p-2">
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
            <div className="coffee-bag-container mx-auto mt-10">
              <CoffeeBagRight name={targetBean.label} />
            </div>
            <div className="flex flex-wrap justify-center mt-10">
              <div className="w-full md:w-1/2 my-4 md:px-4">
                <CoffeeRangeListForAll />
              </div>

              <div className="w-full md:w-1/2 my-4 md:px-4">
                { targetBean.single_origin 
                  ? <CoffeeRangeListForSO /> 
                  : <CoffeeRangeListForBlend /> }
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
