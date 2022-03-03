import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { InformationCircleIcon, PencilAltIcon } from '@heroicons/react/outline';
import { unescapeHtml } from '../../utils/HtmlConverter'
import { AccountContext } from '../../context/AccountContext';
import { AttributeRangeContext } from '../../context/AttributeRangeContext';
import { BeansContext } from '../../context/BeansContext';
import CoffeeBagRight from '../../svgs/CoffeeBagRight';
import StarFullIcon from '../../svgs/StarFullIcon';
import StarHalfIcon from '../../svgs/StarHalfIcon';
import FireFullIcon from '../../svgs/FireFullIcon';
import FireHalfIcon from '../../svgs/FireHalfIcon';
import Tooltip from '../../shared/Tooltip';
import RecipeSection from './RecipeSection';
import './ViewRecipes.scss'


const ViewRecipes = () => {
  const { id } = useParams();
  const { userData } = useContext(AccountContext);
  const { attributeRangeList, fetchAttributeRangeList } = useContext(AttributeRangeContext);
  const { beanList, fetchBeanList } = useContext(BeansContext);

  const [singleOrigin, setSingleOrigin] = useState(false);
  const [coffeeName, setCoffeeName] = useState("");
  const [roastDate, setRoastDate] = useState("");
  const [altitude, setAltitude] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [memo, setMemo] = useState("");
  const [gradeText, setGradeText] = useState("");
  const [roastLevelText, setRoastLevelText] = useState("");
  const [roasters, setRoasters] = useState([]);
  const [aroma, setAroma] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [process, setProcess] = useState([]);
  const [variety, setVariety] = useState([]);
  const [farm, setFarm] = useState([]);
  const [gradeStarIcons, setGradeStarIcons] = useState([]);
  const [roastLevelFireIcons, setRoastLevelFireIcons] = useState([]);
  const [blendRatio, setBlendRatio] = useState([])


  const makeHtmlTags = (targetBean, category) => {
    const result = [];
    if (targetBean[category]) {
      targetBean[category].forEach(id => {
        const range = attributeRangeList[category + '_range'];
        const label = unescapeHtml(range['id-' + id]['label']);
        const info = unescapeHtml(range['id-' + id]['def']);
        const text = `${info === "" ? "No Info" : info}`
        result.push(
          <div 
            className="flex justify-end"
            style={{ paddingTop: "4px", paddingBottom: "4px" }}>
            <Tooltip category={category} itemId={id} tooltipText={text}>
              <div className="flex items-center" id={`tooltip-${category}-${id}`} >
                <p className="text-right">{label}</p>
                <InformationCircleIcon className="h-4 w-4 ml-2 flex-shrink-0" />
              </div>
            </Tooltip>
          </div>
        );
      })
    }
    return result;
  }

  const makeNameListHtml = (category, bean) => {
    const ids = bean[category] ? bean[category] : [];
    let nameListHtml = ids.map(
      id => <span>{attributeRangeList[category + '_range']["id-" + id]['label']}</span>
    );
    if (nameListHtml.length === 0) {
      nameListHtml = <span>No Data</span>
    }
    return nameListHtml;
  }

  const makeBlendRatioHtmlTags = (targetBean) => {
    const result = [];  
    if (targetBean['blend_ratio']) {
      const blend = targetBean['blend_ratio'];
      for(const beanId of Object.keys(blend)) {
        const ratio = blend[beanId];
        const blendBean = beanList[beanId];
        const originNames = makeNameListHtml('origin', blendBean);
        const roasterNames = makeNameListHtml('roaster', blendBean);
        const processNames = makeNameListHtml('process', blendBean);
        const varietyNames = makeNameListHtml('variety', blendBean);
        const farmNames = makeNameListHtml('farm', blendBean);
        const aromaNames = makeNameListHtml('aroma', blendBean);
        const altitude = 
          blendBean['altitude'] === "" || 
          blendBean['altitude'] === null ? 
          "No Data" : blendBean['altitude'];
        const harvestPeriod = 
          blendBean['harvest_period'] === "" || 
          blendBean['harvest_period'] === null ? 
          "No Data" : blendBean['harvest_period'];
        const text = <>
          <p className="py-1 slash-end"><strong className="text-yellow">Roaster: </strong>{roasterNames}</p>
          <p className="py-1 slash-end"><strong className="text-yellow">Origin:</strong> {originNames}</p>
          <p className="py-1 slash-end"><strong className="text-yellow">Process:</strong> {processNames}</p>
          <p className="py-1 slash-end"><strong className="text-yellow">Variety:</strong> {varietyNames}</p>
          <p className="py-1 slash-end"><strong className="text-yellow">Farm:</strong> {farmNames}</p>
          <p className="py-1 slash-end"><strong className="text-yellow">Altitude:</strong> {altitude}</p>
          <p className="py-1 slash-end"><strong className="text-yellow">Harvest Period:</strong> {harvestPeriod}</p>
          <p className="py-1 slash-end"><strong className="text-yellow">Aroma:</strong> {aromaNames}</p>
        </>;
  
        result.push(
          <div 
            className="flex justify-end"
            style={{ paddingTop: "4px", paddingBottom: "4px" }}>
            <Tooltip category="blend" itemId={beanId} tooltipText={text}>            
              <div 
                className="flex items-center" 
                id={`tooltip-blend-${beanId}`} >
                <div className="text-right">
                  {`${unescapeHtml(beanList[beanId]['label'])}: ${ratio}%`}
                </div>
                <InformationCircleIcon className="h-4 w-4 ml-2 flex-shrink-0" />
              </div>
            </Tooltip>
          </div>
        );
      }
    }
    return result;
  }

  const makeGradeIconList = (targetBean) => {
    if (targetBean['grade']) {
      const result = []
      const rounded = Math.ceil(targetBean['grade']/10)/2;
      for (let i = 1; i <= rounded; i ++) {
        result.push(<StarFullIcon/>)
      }
      if (rounded % 1 !== 0) {
        result.push(<StarHalfIcon />)
      }
      return result;
    }
  }

  const makeRoastLevelIconList = (targetBean) => {
    if (targetBean['roast_level']) {
      const result = []
      const rounded = Math.ceil(targetBean['roast_level'])/2;
      for (let i = 1; i <= rounded; i ++) {
        result.push(<FireFullIcon/>)
      }
      if (rounded % 1 !== 0) {
        result.push(<FireHalfIcon />)
      }
      return result;
    }
  }

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
    if (Object.keys(attributeRangeList).length === 0) {
      fetchAttributeRangeList(userData.sub);
    }
    if (Object.keys(beanList).length === 0) {
      fetchBeanList(userData.sub);
    }
  },[]);

  useEffect(() => {
    if (Object.keys(beanList).length !== 0) {
      const targetBean = beanList[id];
      setSingleOrigin(targetBean['single_origin']);
      setGradeText(targetBean['grade']);
      setRoastLevelText(targetBean['roast_level'])
      setCoffeeName(unescapeHtml(targetBean['label']));
      setAltitude(unescapeHtml(targetBean['altitude']));
      setHarvestDate(unescapeHtml(targetBean['harvest_period']));
      setRoasters(makeHtmlTags(targetBean, 'roaster'));
      setAroma(makeHtmlTags(targetBean, 'aroma'));
      setOrigins(makeHtmlTags(targetBean, 'origin'));
      setProcess(makeHtmlTags(targetBean, 'process'));
      setVariety(makeHtmlTags(targetBean, 'variety'));
      setFarm(makeHtmlTags(targetBean, 'farm'));
      setRoastDate(
        targetBean['roast_date'] ? targetBean['roast_date'].split('T')[0] : null
      );
      setMemo(
        targetBean['memo'] === null ? "" : unescapeHtml(targetBean['memo'])
      )
      setGradeStarIcons(makeGradeIconList(targetBean));
      setRoastLevelFireIcons(makeRoastLevelIconList(targetBean));
      setBlendRatio(makeBlendRatioHtmlTags(targetBean));
    }
  }, [beanList]);

  return (
    <>
      <div className="px-4 pt-8">
        <div className="px-2">
          <div className="h-16 flex items-center justify-center mb-8">
            <h3 className="mr-3 text-xl text-center font-capitals uppercase">
              {singleOrigin? "Single Origin" : "Blend"}
            </h3>
          </div>
          <div className="w-full max-w-980px my-4 mx-auto">
            <div className="relative bg-white py-16 px-2 rounded-lg shadow-sm">
              <button
                type="button"
                className="absolute top-3 right-3 opacity-80 hover:opacity-100 
                ease-linear transition-all duration-150"> 
                <PencilAltIcon className="h-6 w-6" />
              </button>
              <div className="coffee-bag-container mx-auto mt-4">
                <CoffeeBagRight name={coffeeName} />
              </div>
              <div className="flex flex-wrap justify-center mt-16">
                <div className="w-1/2 my-4 px-4">
                  { roasters.length !== 0 ? 
                  <div className="coffee-detail-section">
                    <label className="text-xs font-semibold uppercase mr-3">Roasted By</label>
                    <div>{roasters}</div>
                  </div>
                  : null
                  }

                  { roastDate ? 
                  <div className="coffee-detail-section">
                    <label className="text-xs font-semibold uppercase mr-3">Roast Date</label>
                    <p>{roastDate}</p>
                  </div>
                  : null
                  }

                  { gradeText ? 
                  <div className="coffee-detail-section">
                    <label className="text-xs font-semibold uppercase mr-3">Grade</label>
                    <div className="flex">
                      {gradeStarIcons} 
                      <span className="ml-2">({gradeText}/100)</span>
                    </div>
                  </div>
                  : null
                  }

                  { roastLevelText ? 
                  <div className="coffee-detail-section">
                    <label className="text-xs font-semibold uppercase mr-3">Roast Level</label>
                    <div className="flex">
                      {roastLevelFireIcons}
                      <span className="ml-2">({gradeText}/10)</span>
                    </div>
                  </div>
                  : null
                  }
                </div>

                <div className="w-1/2 my-4 px-4">
                  { singleOrigin ? 
                  <>
                    <div className="coffee-detail-section">
                      <label className="text-xs font-semibold uppercase mr-6">Origin</label>
                      <div>{origins}</div >
                    </div>

                    { process.length !== 0 ? 
                    <div className="coffee-detail-section">
                      <label className="text-xs font-semibold uppercase mr-3">Process</label>
                      <div>{process}</div>
                    </div>
                    : null
                    }

                    { variety.length !== 0 ? 
                    <div className="coffee-detail-section">
                      <label className="text-xs font-semibold uppercase mr-3">Variety</label>
                      <div>{variety}</div>
                    </div>
                    : null
                    }

                    { farm.length !== 0 ? 
                    <div className="coffee-detail-section">
                      <label className="text-xs font-semibold uppercase mr-3">Farm</label>
                      <div>{farm}</div>
                    </div>
                    : null
                    }

                    { altitude ?
                    <div className="coffee-detail-section">
                      <label className="text-xs font-semibold uppercase mr-3">Altitude</label>
                      <p>{altitude}</p>
                    </div>
                    : null
                    }

                    { harvestDate ? 
                    <div className="coffee-detail-section">
                      <label className="text-xs font-semibold uppercase mr-3">Harvest Period</label>
                      <p>{harvestDate}</p>
                    </div>
                    : null
                    }
                  </>
                  :
                  <div className="coffee-detail-section">
                    <label className="text-xs font-semibold uppercase mr-3">Blend Ratio</label>
                    <div>{blendRatio}</div>
                  </div>
                  }

                  { aroma.length !== 0 ? 
                  <div className="coffee-detail-section">
                    <label className="text-xs font-semibold uppercase mr-3">Aroma</label>
                    <div>{aroma}</div>
                  </div>
                  : null
                  }
                </div>
              </div>
              
              { memo.length !== 0 ? 
              <div className="px-6 pt-4">
                <label className="text-xs font-semibold uppercase mr-3">Memo: </label>
                <div className="inline-block">{memo}</div>
              </div>
              : null
              }
            </div>
          </div>
          <div className="flex mb-4 w-full flex-wrap justify-center">
            <RecipeSection recipeId="1" />
            <RecipeSection recipeId="2" />
            <RecipeSection recipeId="3" />
            <RecipeSection recipeId="4" />
            <RecipeSection recipeId="5" />
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewRecipes
