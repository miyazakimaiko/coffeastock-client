import { PencilAltIcon } from '@heroicons/react/outline';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { BeansContext } from '../../context/Beans';
import { CustomRangesContext } from '../../context/CustomRanges';
import CoffeeBagRight from '../../svgs/CoffeeBagRight';
import StarFullIcon from '../../svgs/StarFullIcon';
import StarHalfIcon from '../../svgs/StarHalfIcon';
import RecipeSection from './RecipeSection';
import { unescapeHtml } from '../../utils/HtmlConverter'
import './ViewRecipes.scss'

const ViewRecipes = () => {
  const { id } = useParams();
  const { customRanges } = useContext(CustomRangesContext);
  const { beans } = useContext(BeansContext);
  const bean = beans[id];

  const makeHtmlTags = (category) => {
    const result = [];
    if (bean[category]) {
      bean[category].forEach(id => {
        const range = customRanges[category + '_range'];
        result.push(
          <>
            <button data-tooltip-target={`tooltip-${category}-${id}`} type="button">{unescapeHtml(range['id-' + id]['label'])}</button>
            <div id={`tooltip-${category}-${id}`} role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
              Tooltip content
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
          </>
        );
      })
    }
    else {
      result.push('No Data')
    }
    return result;
  }

  const coffeeName = unescapeHtml(beans[id]['label']);
  const roasters = makeHtmlTags('roaster')
  const roastDate = beans[id]['roast_date'] ? beans[id]['roast_date'].split('T')[0] : null;
  const aroma = makeHtmlTags('aroma')
  const origins = makeHtmlTags('origin')
  const process = makeHtmlTags('process');
  const variety = makeHtmlTags('variety');
  const farm = makeHtmlTags('farm');
  const altitude = unescapeHtml(beans[id]['altitude']);
  const harvestDate = unescapeHtml(beans[id]['harvest_date']);
  const roastLevel = beans[id]['roast_level'];
  const memo = beans[id]['memo'] === null ? "" : unescapeHtml(beans[id]['memo']);
  const singleOrigin = bean['single_origin']

  const grade = [];
  if (beans[id]['grade']) {
    const rounded = Math.ceil(beans[id]['grade']/10)/2;
    for (let i = 1; i <= rounded; i ++) {
      grade.push(<StarFullIcon/>)
    }
    if (rounded % 1 !== 0) {
      grade.push(<StarHalfIcon />)
    }
  }

  const blendRatio = [];
  let blendCount = 0;
  if (beans[id]['blend_ratio']) {
    for(const item of Object.entries(beans[id]['blend_ratio'])) {
      if (blendCount !== 0) {
        blendRatio.push(' / ')
      }
      const id = item[0];
      const ratio = item[1];
      blendRatio.push(`${unescapeHtml(beans[id]['label'])} (${ratio})`);
      blendCount++;
    }
  } else {
    blendRatio.push('-')
  }

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
                  <div className="coffee-detail-section">
                    <label className="text-xs font-semibold uppercase">Roasted By</label>
                    <div className="tag-section">{roasters}</div>
                  </div>
                  <div className="coffee-detail-section">
                    <label className="text-xs font-semibold uppercase">Roast Date</label>
                    <p>{roastDate}</p>
                  </div>
                  <div className="coffee-detail-section">
                    <label className="text-xs font-semibold uppercase">Grade</label>
                    <div className="flex">
                      {grade} 
                      <span className="ml-2">({beans[id]['grade']}/100)</span>
                    </div>
                    </div>
                  <div className="coffee-detail-section">
                    <label className="text-xs font-semibold uppercase">Roast Level</label>
                    <p>({roastLevel}/10)</p>
                  </div>
                </div>
                <div className="w-1/2 my-4 px-4">
                  {singleOrigin ? 
                  <>
                    <div className="coffee-detail-section">
                      <label className="text-xs font-semibold uppercase">Origin</label>
                      <div className="tag-section">{origins}</div >
                    </div>
                    <div className="coffee-detail-section">
                      <label className="text-xs font-semibold uppercase">Process</label>
                      <div className="tag-section">{process}</div>
                    </div>
                    <div className="coffee-detail-section">
                      <label className="text-xs font-semibold uppercase">Variety</label>
                      <div className="tag-section">{variety}</div>
                    </div>
                    <div className="coffee-detail-section">
                      <label className="text-xs font-semibold uppercase">Farm</label>
                      <div className="tag-section">{farm}</div>
                    </div>
                    <div className="coffee-detail-section">
                      <label className="text-xs font-semibold uppercase">Altitude</label>
                      <p>{altitude}</p>
                    </div>
                    <div className="coffee-detail-section">
                      <label className="text-xs font-semibold uppercase">Harvest Period</label>
                      <p>{harvestDate}</p>
                    </div>
                  </>
                  :
                  <div className="coffee-detail-section">{blendRatio}</div>
                  }
                  <div className="coffee-detail-section">
                    <label className="text-xs font-semibold uppercase">Aroma</label>
                    <div className="tag-section">{aroma}</div>
                  </div>
                </div>
              </div>
              <div className="px-6 pt-4">
                <label className="text-xs font-semibold uppercase">Memo: </label>
                <div className="inline-block">{memo}</div>
              </div>
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
