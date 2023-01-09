import React, { useState } from 'react'
import { GiCoffeeBeans } from 'react-icons/gi'
import { MdDelete, MdWaterDrop } from 'react-icons/md'
import { FaCoffee } from 'react-icons/fa'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'
import convertIntervalObjToString from '../../../helpers/ConvertIntervalObjToString.js'
import { generateStarIconList } from '../../../helpers/GenerateIconList'
import PalateRadarChartSingle from '../../../elements/PalateRadarChartSignle'
import Dropdown from '../../../elements/Dropdown'
import Spinner from '../../../elements/Spinner'
import useRanges from '../../../hooks/useRanges'
import useUnits from '../../../hooks/useUnits'
import useUserInfo from '../../../hooks/useUserInfo'
import ErrorPage from '../../error/index.jsx'
import { BiEdit } from 'react-icons/bi'


const Row = ({recipe, onEditClick, onDeleteClick}) => {
  const { data: rangeList, 
          isLoading: rangeListIsLoading,
          isError: RangeListHasError,
        } = useRanges();

  const { data: units, 
          isLoading: unitsAreLoading,
          isError: unitsHaveError,
        } = useUnits();

  const { data: userInfo, 
          isLoading: userInfoAreLoading,
          isError: userInfoHaveError,
        } = useUserInfo();
  
  const [openDetails, setOpenDetails] = useState(false);

  if (rangeListIsLoading ||unitsAreLoading || userInfoAreLoading) {
    return <Spinner />
  };

  if (RangeListHasError || unitsHaveError || userInfoHaveError) {
    return <ErrorPage />
  }

  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 p-1">
      <div className="relative px-2 pt-4 pb-2 bg-white shadow-sm rounded-md transition-all h-fit">
        <div className="flex flex-col md:flex-row flex-wrap">
          <div className="flex flex-col justify-between w-full border-b pb-2
                          h-auto px-4"
          >
            <h3 className="text-base md:text-lg">
              {recipe.method & recipe.method[0]
                ? rangeList.method_range[recipe.method[0]].label
                : "-"}
            </h3>
            <div className="flex justify-between">
              <span>
                {recipe.brew_date ? new Date(recipe.brew_date).toDateString().replace(/^\S+\s/,'') : "No date"}
              </span>
              <div className="flex justify-end">
                {recipe.total_rate
                  ? generateStarIconList(recipe.total_rate)
                  : null
                }
                <span className="ml-1">({recipe.total_rate})</span> 
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between relative w-full border-b py-2
                          h-auto px-4"
          >
            <div className="flex justify-between">
              <GiCoffeeBeans className="w-5 h-5 opacity-40" />
              <p className="text-right">
                <span className="text-base md:text-lg mr-1">{recipe.grounds_weight ?? "-"}</span>
                {units['solid' + userInfo.unit_solid_weight_id].short_label}
              </p>
            </div>
            <div className="flex justify-end flex-wrap">
              {recipe.grind_size && (
                <span className="basic-chip">{recipe.grind_size}</span>
              )}
              {recipe.grinder & recipe.grinder[0] && (
                <span className="basic-chip">
                  {rangeList.grinder_range[recipe.grinder[0]].label}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between relative w-full h-auto border-b p-2">
            <div className="flex justify-between">
              <MdWaterDrop className="w-5 h-5 opacity-40" />
              <p className="text-right">
                <span className="text-base md:text-lg mr-1">{recipe.water_weight ?? "-"}</span>
                {units['fluid' + userInfo.unit_fluid_weight_id].short_label}
              </p>
            </div>
            <div className="flex justify-end flex-wrap">
              {recipe.water_temp && (
                <span className="basic-chip">{recipe.water_temp}</span>
              )}
              {recipe.water && recipe.water[0] && (
                <span className="basic-chip">
                  {rangeList.water_range[recipe.water[0]].label}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between relative w-full h-auto p-2">
            <div className="flex justify-between">
              <FaCoffee className="w-5 h-5 opacity-40" />
              <p className="text-right">
                <span className="text-base md:text-lg">{recipe.yield_weight ?? "-"}</span>{" "}
                {units['fluid' + userInfo.unit_fluid_weight_id].short_label}
              </p>
            </div>
            <div className="flex justify-end flex-wrap">
              {recipe.extraction_time ? (
                <span className="basic-chip">
                  {convertIntervalObjToString(recipe.extraction_time)}
                </span>
              ) : null}
              {recipe.tds ? (
                <span className="basic-chip">{recipe.tds}</span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          { openDetails &&
            (<div>
              <div className="flex flex-wrap my-2 overflow-hidden">
                {Object.keys(recipe.palate_rates).length > 0 ? (
                  <PalateRadarChartSingle
                    className="w-full px-1 mx-auto -mt-6"
                    labels={Object.keys(recipe.palate_rates).map(
                      (id) => rangeList.palate_range[id].label
                    )}
                    rates={Object.values(recipe.palate_rates).map((rate) => rate)}
                  />
                ) : null}
              </div>
              <div className="px-1 sm:px-2 mb-2 sm:mb-4">
                <label className="font-medium mr-3">Memo: </label>
                <p className="inline">{recipe.memo ?? "-"}</p>
              </div>
            </div>)
          }
        </div>
        <div
          className="cursor-pointer"
          onClick={(e) => setOpenDetails(!openDetails)}
        >
          {openDetails ? (
            <HiOutlineChevronUp className="w-6 h-6 mt-2 mx-auto" />
          ) : (
            <HiOutlineChevronDown className="w-6 h-6 mt-2 mx-auto" />
          )}
        </div>
        <div className="flex absolute bottom-2 right-2">
          <button
            type="button"
            className="mr-2 underline text-deep-blue hover:opacity-70"
            onClick={onEditClick}
          >
            Edit
          </button>
          <button
            type="button"
            className="mr-2 underline text-red hover:opacity-70"
            onClick={onDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Row
