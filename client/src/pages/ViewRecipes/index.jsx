import { DotsHorizontalIcon } from '@heroicons/react/outline';
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

  const getLabelsFromIds = (cat) => {
    const result = [];
    if (bean[cat]) {
      let count = 0;
      bean[cat].forEach(id => {
        const range = customRanges[cat + '_range'];
        if (count !== 0) {
          result.push(' / ')
        }
        result.push(unescapeHtml(range['id-' + id]['label']));
        count++;
      })
    }
    else {
      result.push('-')
    }
    return result;
  }

  const coffeeName = unescapeHtml(beans[id]['label']);
  const roasters = getLabelsFromIds('roaster')
  const roastDate = beans[id]['roast_date'] ? beans[id]['roast_date'].split('T')[0] : null;
  const aroma = getLabelsFromIds('aroma')
  const origins = getLabelsFromIds('origin')
  const process = getLabelsFromIds('process');
  const variety = getLabelsFromIds('variety');
  const farm = getLabelsFromIds('farm');
  const altitude = unescapeHtml(beans[id]['altitude']);
  const harvestDate = unescapeHtml(beans[id]['harvest_date']);
  const roastLevel = beans[id]['roast_level'];
  const memo = unescapeHtml(beans[id]['memo']);

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
      <div className="px-2">
        <div className="w-full max-w-980px my-4 mx-auto">
          <div className="flex flex-wrap justify-center">
            <div className="min-w-150px max-w-10 mx-10 my-auto">
              <CoffeeBagRight name={coffeeName} />
            </div>
            <div className="my-4 mx-10">
              <div className="flex justify-between bg-gray-200">
                <div>
                  <h2 className="font-bold text-2xl">{coffeeName}</h2>
                  <p>By {roasters}</p>
                </div>
                <button type="button">
                  <DotsHorizontalIcon 
                    className="h-8 w-8 p-1 border-1 border-green rounded-3xl
                      transition-all duration-300 ease-out text-green hover:text-white hover:bg-green" 
                  />
                </button>
              </div>
              <div className="flex bg-gray-300">
                <ul>
                  <li>{roastDate}</li>
                  <li className="flex">{grade} ({beans[id]['grade']}/100)</li>
                  <li>{roastLevel}</li>
                  <li>{aroma}</li>
                </ul>
                <ul>
                  <li>{blendRatio}</li>
                  <li>{origins}</li>
                  <li>{process}</li>
                  <li>{variety}</li>
                  <li>{farm}</li>
                  <li>{altitude}</li>
                  <li>{harvestDate}</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <p>{memo}</p>
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
    </>
  )
}

export default ViewRecipes
