import { useState } from 'react'

const useBeanModel = () => {
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

  return [bean, setBean];
}

export default useBeanModel