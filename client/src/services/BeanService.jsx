import { useContext, useEffect, useState } from 'react'
import { useUserData } from '../context/AccountContext';
import { ModalStateContext } from '../context/ModalStateContext';
import useAddBean from '../hooks/useAddBean';
import useEditBean from '../hooks/useEditBean';
import toastOnBottomCenter from '../utils/customToast';

const BeanService = () => {
  const userData = useUserData();
  const addBean = useAddBean(userData.sub);
  const editBean = useEditBean(userData.sub);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {modal, closeModal, modalModeSelection} = useContext(ModalStateContext);

  const [processAddSubmit, setProcessAddSubmit] = useState(false);
  const [processEditSubmit, setProcessEditSubmit] = useState(false);
  
  const [bean, setBean] = useState({
    bean_id: null,
    single_origin: true,
    label: null,
    grade: null,
    roast_level: null,
    roast_date: null,
    harvest_period: null,
    altitude: null,
    memo: null,
    blend_ratio: {},
    origin: [],
    farm: [],
    variety: [],
    process: [],
    roaster: [],
    aroma: []
  });


  const onSubmit = () => {
    if (modal.mode === modalModeSelection.addBean) {
      setProcessAddSubmit(true);
    }
    else if (modal.mode === modalModeSelection.editBean) {
      setProcessEditSubmit(true);
    }
  }

  useEffect(() => {
    if (editBean.isLoading || addBean.isLoading) {
      setIsSubmitting(true);
    }
    else {
      setIsSubmitting(false);
    }
  }, [editBean.isLoading, addBean.isLoading])


  useEffect(() => {
    if (processAddSubmit) {
      if (Object.keys(bean.blend_ratio).length > 5) {
        toastOnBottomCenter('error', 'No more than five coffee types can be selected as blend beans.')
      } 
      else if (bean.label === null) {
        toastOnBottomCenter('error', 'Coffee Bean Name is blank.')
      }
      else {
        addBean.mutate(bean, {
          onSuccess: () => closeModal()
        });
      }
      setProcessAddSubmit(false);
    }
  }, [processAddSubmit])


  useEffect(() => {
    if (processEditSubmit) {

      if (!bean.single_origin && Object.keys(bean.blend_ratio).length > 5) {
        toastOnBottomCenter('error', 'No more than five coffee types can be selected as blend beans.');
        return;
      } 
      if (bean.label === null) {
        toastOnBottomCenter('error', 'Coffee Bean Name is blank.')
        return;
      }

      if (bean.single_origin) {
        bean.blend_ratio = {}
        bean.blend_bean_id_1 = null;
        bean.blend_bean_id_2 = null;
        bean.blend_bean_id_3 = null;
        bean.blend_bean_id_4 = null;
        bean.blend_bean_id_5 = null;
      }
      else {
        bean.origin = [];
        bean.farm = [];
        bean.variety = [];
        bean.process = [];
        bean.variety = [];
      }

      editBean.mutate(bean, {
        onSuccess: () => closeModal()
      });
      setProcessEditSubmit(false);
    }
  }, [processEditSubmit])

  return [bean, setBean, onSubmit, isSubmitting];
}

export default BeanService