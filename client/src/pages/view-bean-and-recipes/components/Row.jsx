import React, { useState } from 'react'
import { GiCoffeeBeans } from 'react-icons/gi'
import { MdWaterDrop } from 'react-icons/md'
import { FaCoffee } from 'react-icons/fa'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'
import convertIntervalObjToString from '../../../helpers/ConvertIntervalObjToString.js'
import { generateStarIconList } from '../../../helpers/GenerateIconList'
import PalateRadarChartSingle from '../../../elements/PalateRadarChartSignle'
import Dropdown from '../../../elements/Dropdown'
import Spinner from '../../../elements/Spinner'
import useRanges from '../../../hooks/useRanges'
import useUnits from '../../../hooks/useUnits'
import useUserUnitIds from '../../../hooks/useUserUnitIds'
import ErrorPage from '../../error/index.jsx'


const Row = ({recipe, onEditClick, onDeleteClick}) => {
  const { data: rangeList, 
          isLoading: rangeListIsLoading,
          isError: RangeListHasError,
        } = useRanges();

  const { data: units, 
          isLoading: unitsAreLoading,
          isError: unitsHaveError,
        } = useUnits();

  const { data: unitIds, 
          isLoading: unitIdsAreLoading,
          isError: unitIdsHaveError,
        } = useUserUnitIds();
  
  const [openDetails, setOpenDetails] = useState(false);

  if (rangeListIsLoading ||unitsAreLoading || unitIdsAreLoading) {
    return <Spinner />
  };

  if (RangeListHasError || unitsHaveError || unitIdsHaveError) {
    return <ErrorPage />
  }

  return (
    <>
      <div className="relative px-4 pt-8 pb-4 mb-4 bg-white shadow-sm rounded-md w-full transition-all">
        <div className="absolute top-2 right-2">
          <Dropdown dropdownText="" type="dot">
            <div className="dropdown-content">
              <button
                type="button"
                className="dropdown-item"
                onClick={onEditClick}
              >
                Edit
              </button>
              <button
                type="button"
                className="dropdown-item"
                onClick={onDeleteClick}
              >
                Delete
              </button>
            </div>
          </Dropdown>
        </div>

        <div className="flex">
          <div className="flex flex-col justify-between w-1/4 h-auto px-4 border-r">
            <p>
              {recipe.brew_date ? new Date(recipe.brew_date).toDateString() : "No date"}
            </p>
            <h3 className="text-xl my-2">
              {recipe.method & recipe.method[0]
                ? rangeList.method_range[recipe.method[0]].label
                : "-"}
            </h3>
            <div className="flex justify-end">
              {recipe.total_rate
                ? generateStarIconList(recipe.total_rate)
                : null}
            </div>
          </div>
          <div className="flex flex-col justify-between relative w-1/4 h-auto px-4 border-r">
            <div className="flex justify-between">
              <GiCoffeeBeans className="w-5 h-5 opacity-40" />
              <p className="text-right mb-4">
                <span className="text-2xl mr-1">{recipe.grounds_weight ?? "-"}</span>
                {units['solid' + unitIds['unit_solid_weight_id']].short_label}
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
          <div className="flex flex-col justify-between relative w-1/4 h-auto px-4 border-r">
            <div className="flex justify-between">
              <MdWaterDrop className="w-5 h-5 opacity-40" />
              <p className="text-right mb-4">
                <span className="text-2xl mr-1">{recipe.water_weight ?? "-"}</span>
                {units['fluid' + unitIds['unit_fluid_weight_id']].short_label}
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
          <div className="flex flex-col justify-between relative w-1/4 h-auto px-4">
            <div className="flex justify-between">
              <FaCoffee className="w-5 h-5 opacity-40" />
              <p className="text-right mb-4">
                <span className="text-2xl">{recipe.yield_weight ?? "-"}</span>{" "}
                {units['fluid' + unitIds['unit_fluid_weight_id']].short_label}
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
          <div
            className="ease-in-out transition-all duration-500"
            style={openDetails ? {} : { marginTop: "-100%" }}
          >
            <div className="flex my-12">
              <div className="w-1/2 px-6 mt-auto mb-0">
                <div className="coffee-detail-section">
                  <label>Total Rate: </label>
                  <p>{recipe.total_rate ?? "-"}/100</p>
                </div>
                <div className="coffee-detail-section">
                  <label>Grinder: </label>
                  <p>
                    {recipe.grinder & recipe.grinder[0]
                      ? rangeList.grinder_range[recipe.grinder[0]].label
                      : "-"}
                  </p>
                </div>
                <div className="coffee-detail-section">
                  <label>Grind Size: </label>
                  <p>{recipe.grind_size ?? "-"}</p>
                </div>
                <div className="coffee-detail-section">
                  <label>Grounds Weight: </label>
                  <p>
                    {recipe.grounds_weight ?? "-"}
                    <span className="ml-1">
                      {units['solid' + unitIds['unit_solid_weight_id']].short_label}
                    </span>
                  </p>
                </div>
                <div className="coffee-detail-section">
                  <label>Water: </label>
                  <p>
                    {recipe.water & recipe.water[0]
                      ? rangeList.water_range[recipe.water[0]].label
                      : "-"}
                  </p>
                </div>
                <div className="coffee-detail-section">
                  <label>Water Weight: </label>
                  <p>
                    {recipe.water_weight ?? "-"}
                    <span className="ml-1">
                      {units['fluid' + unitIds['unit_fluid_weight_id']].short_label}
                    </span>
                  </p>
                </div>
                <div className="coffee-detail-section">
                  <label>Water Temperature: </label>
                  <p>
                    {recipe.water_temp ?? "-"}
                    <span className="ml-1">
                      {units['temp' + unitIds['unit_temperature_id']].short_label}
                    </span>
                  </p>
                </div>
                <div className="coffee-detail-section">
                  <label>Extraction Time: </label>
                  <p>
                    {recipe.extraction_time
                      ? convertIntervalObjToString(recipe.extraction_time)
                      : "-"}
                  </p>
                </div>
                <div className="coffee-detail-section">
                  <label>Yield Weight: </label>
                  <p>
                    {recipe.yield_weight ?? "-"}
                    <span className="ml-1">
                      {units['fluid' + unitIds['unit_fluid_weight_id']].short_label}
                    </span>
                  </p>
                </div>
                <div className="coffee-detail-section">
                  <label>TDS: </label>
                  <p>{recipe.tds ?? "-"}</p>
                </div>
              </div>
              {Object.keys(recipe.palate_rates).length > 0 ? (
                <PalateRadarChartSingle
                  className="w-1/2 px-6 mx-auto"
                  labels={Object.keys(recipe.palate_rates).map(
                    (id) => rangeList.palate_range[id].label
                  )}
                  rates={Object.values(recipe.palate_rates).map((rate) => rate)}
                />
              ) : null}
            </div>
            <div className="px-8 mb-8">
              <label className="font-medium mr-3">Memo: </label>
              <p className="inline">{recipe.memo ?? "-"}</p>
            </div>
          </div>
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
      </div>
    </>
  );
}

export default Row
