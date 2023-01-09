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
import RecipeSection from './components/RecipeSection';
import CoffeeRangeListForBlend from './components/CoffeeRangeListForBlend';
import CoffeeRangeListForSO from './components/CoffeeRangeListForSO';
import CoffeeRangeListForAll from './components/CoffeeRangeListForAll';
import './ViewBeanAndRecipes.scss'
import useRanges from '../../hooks/useRanges';


const ViewBeanAndRecipes = ({setTitle}) => {

  useEffect(() => {
    setTitle("Beans & Recipes");
  }, [])
  
  const { id } = useParams();
  
  const { data: targetBean,
          isLoading: targetBeanIsLoading,
         } = useBean(id);

  const { data: rangeList, 
          isLoading: rangeListIsLoading,
        } = useRanges();

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


  if (targetBeanIsLoading || rangeListIsLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className="px-4 w-full max-w-[1200px] mx-auto">
        <div className="p-2">
          <div className="flex items-center justify-center flex-col md:flex-row mt-5">
            <div className="coffee-bag-container md:mr-10 px-2 mb-5">
              <CoffeeBagRight name={targetBean.label} />
            </div>
            <div className="w-full md:w-3/4">
              <div className="flex items-center justify-between">
                <div className="border-b-burnt-sienna">
                  <h2 className="text-3xl mb-2">{targetBean.label}</h2>
                  <p className="opacity-70">By {rangeList.roaster_range[targetBean.roaster]?.label ?? "?"}</p>
                </div>
                <div>
                  <div className="top-5 right-4 md:hidden">
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
                  <div className="top-5 right-4 hidden md:flex">
                    <button
                      type="button"
                      className="mr-2 underline text-deep-blue hover:opacity-70"
                      onClick={openEditBeanModal}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="mr-2 underline text-red hover:opacity-70"
                      onClick={openDeleteBeanModal}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center">
                <div className="w-full sm:w-1/2 my-4 sm:pr-4">
                  <CoffeeRangeListForAll />
                </div>
                <div className="w-full sm:w-1/2 my-4 sm:pl-4">
                  { targetBean.single_origin 
                    ? <CoffeeRangeListForSO /> 
                    : <CoffeeRangeListForBlend /> }
                </div>
              </div>
            </div>
          </div>

          {targetBean.memo !== null && targetBean.memo !== "" ? (
            <div>
              <label className=" font-medium mr-3">Memo: </label>
              <div className="inline-block">
                {unescapeHtml(targetBean.memo)}
              </div>
            </div>
          ) : null}
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
