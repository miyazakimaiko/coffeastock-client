import { useEffect, useState } from 'react'
import { useUserData } from '../../../context/AccountContext';
import useBeans from '../../../hooks/useBeans';
import BlendRatioInput from '../components/BlendRatioInput';

const useSelectedBeansAndRatio = () => {
  const userData = useUserData()
  const { data: beanList } = useBeans(userData.sub)

  const [selectedBlendBeans, setSelectedBlendBeans] = useState([]);
  const [blendRatios, setBlendRatio] = useState({});
  const [blendRatioHtmlDict, setBlendRatioHtmlDict] = useState({});


  useEffect(() => {
    selectedBlendBeans.forEach(bean => {
      let found = false;
      for (const beanId of Object.keys(blendRatios)) {
        if (bean.value === beanId) found = true;
      }
      if (!found) {
        setBlendRatio(blendRatio => ({...blendRatio, [bean.value]: '0'}));
      }
    })
  }, [selectedBlendBeans])


  useEffect(() => {
    if (Object.keys(blendRatios).length > 0) {
      for (const beanId of Object.keys(blendRatios)) {
        let found = false;
        selectedBlendBeans.forEach(selectedBean => {
          if (selectedBean.value === beanId) found = true;
        });
        if (!found) {
          delete blendRatios[beanId]
          delete blendRatioHtmlDict[beanId]
        }
      }
    }
  }, [selectedBlendBeans, blendRatios]);


  useEffect(() => {
    Object.keys(blendRatios).forEach((id) => {
      const html = {};
      html[id] = (
        <BlendRatioInput
          title={beanList[id].label}
          name={id}
          value={blendRatios[id]}
          onChange={(e) => setBlendRatio(blendRatio => ({...blendRatio, [id]: e.target.value}))}
        />
      );
      setBlendRatioHtmlDict((blendRatioHtmlDict) => ({
        ...blendRatioHtmlDict,
        ...html,
      }));
    });
  }, [blendRatios]);

  return [
    selectedBlendBeans,
    setSelectedBlendBeans,
    blendRatios,
    setBlendRatio,
    blendRatioHtmlDict,
  ];
}

export default useSelectedBeansAndRatio