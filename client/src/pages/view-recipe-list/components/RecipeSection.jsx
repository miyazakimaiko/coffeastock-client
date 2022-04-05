import React, { useState } from 'react'
import { GiCoffeeBeans } from 'react-icons/gi'
import { MdWaterDrop } from 'react-icons/md'
import { FaCoffee } from 'react-icons/fa'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'
import ChartRadarTaste from './ChartRadarTaste'
import { useAttributeRangeList } from '../../../context/AttributeRangeContext'
import { generateStarIconList } from '../../../utils/GenerateIconList'
import Dropdown from '../../../components/elements/Dropdown'
import AddEditRecipeModal from '../../../components/add-edit-recipe-modal'

const MODAL_MODE = {
  EDIT: 'edit',
  DELETE: 'delete'
}

const RecipeSection = ({recipe}) => {
  const attributeRangeList = useAttributeRangeList()
  const {
    recipe_id, 
    brew_date,
    extraction_time, 
    method, 
    total_rate,
    grinder,
    grind_size,
    grounds_weight,
    water,
    water_temp,
    water_weight, 
    yield_weight,
    tds,
    palate,
    memo
  } = recipe
  const [showEditModal, setShowEditModal] = useState(false);
  const [modal, setModal] = useState({mode: null, isOpen: false})
  const [openDetails, setOpenDetails] = useState(false)

  const parseExtractionTime = () => {
    const extractionTime = Object.keys(extraction_time).map(timeUnit => {
      const unit = timeUnit === 'hours' ? 'hr' : timeUnit === 'minutes' ? 'min' : 'sec';
      return `${extraction_time[timeUnit]} ${unit} `
    })
    return extractionTime
  }

  return (
    <>
      <div className="relative px-4 pt-8 pb-4 mb-4 bg-white shadow-sm rounded-md w-full transition-all">
        <div className="absolute top-2 right-2">
          <Dropdown dropdownText="" type="dot">
            <div className="dropdown-content" >
              <button type="button" className="dropdown-item" onClick={() => setModal({mode: MODAL_MODE.EDIT, isOpen: true})}>Edit</button>
              <button type="button" className="dropdown-item" onClick={() => setModal({mode: MODAL_MODE.DELETE, isOpen: true})}>Delete</button>
            </div>
          </Dropdown>
        </div>

        <div className="flex">
          <div className="flex flex-col justify-between w-1/4 h-auto px-4 border-r">
            <p>{brew_date ? brew_date.split('T')[0] : '-'}</p>
            <h3 className="text-xl my-2">{method ? attributeRangeList['method_range']['id-' + method]['label'] : '-'}</h3>
            <div className="flex justify-end">
              {total_rate ? generateStarIconList(total_rate) : null} 
            </div>
          </div>
          <div className="flex flex-col justify-between relative w-1/4 h-auto px-4 border-r">
            <div className="flex justify-between">
              <GiCoffeeBeans className="w-5 h-5 opacity-40"/>
              <p className="text-right mb-4">
                <span className="text-2xl">{grounds_weight ? grounds_weight : '-'}</span> g
              </p>
            </div>
            <div className="flex justify-end flex-wrap">
              {grind_size 
                  ? 
              <span className="basic-chip">{grind_size}</span> 
                  : 
              null}
              {grinder 
                  ? 
              <span className="basic-chip">{attributeRangeList['grinder_range']['id-' + grinder]['label']}</span> 
                  : 
              null}
            </div>
          </div>
          <div className="flex flex-col justify-between relative w-1/4 h-auto px-4 border-r">
            <div className="flex justify-between">
              <MdWaterDrop className="w-5 h-5 opacity-40" />
              <p className="text-right mb-4">
                <span className="text-2xl">{water_weight ? water_weight : '-'}</span> ml
              </p>
            </div>
            <div className="flex justify-end flex-wrap">
              {water_temp 
                  ? 
              <span className="basic-chip">{water_temp}</span> 
                  : 
              null}
              {water 
                  ? 
              <span className="basic-chip">{attributeRangeList['water_range']['id-' + water]['label']}</span> 
                  : 
              null}
            </div>
          </div>
          <div className="flex flex-col justify-between relative w-1/4 h-auto px-4">
            <div className="flex justify-between">
              <FaCoffee className="w-5 h-5 opacity-40" />
              <p className="text-right mb-4">
                <span className="text-2xl">{yield_weight ? yield_weight : '-'}</span> ml
              </p>
            </div>
            <div className="flex justify-end flex-wrap">
              {extraction_time 
                  ? 
              <span className="basic-chip">{parseExtractionTime()}</span> 
                  : 
              null}            
              {tds 
                  ? 
              <span className="basic-chip">{tds}</span> 
                  : 
              null}
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            className="ease-in-out transition-all duration-500"
            style={openDetails ? {} : {'marginTop': '-100%'}}
          >
            <div className="flex my-8">
              <div className="w-1/2 px-6 mt-auto mb-0">
                <div className="coffee-detail-section">
                  <label>Total Rate: </label>
                  <p>{total_rate ? total_rate : '-'}/100</p>
                </div>
                <div className="coffee-detail-section">
                  <label>Grinder: </label>
                  <p>{grinder ? attributeRangeList['grinder_range']['id-' + grinder]['label'] : '-'}</p>
                </div>
                <div className="coffee-detail-section">
                  <label>Grind Size: </label>
                  <p>{grind_size ? grind_size : '-'}</p>
                </div>
                <div className="coffee-detail-section">
                  <label>Grounds Weight: </label>
                  <p>{grounds_weight ? grounds_weight : '-'}</p>
                </div>
                <div className="coffee-detail-section">
                  <label>Water: </label>
                  <p>{water ? attributeRangeList['water_range']['id-' + water]['label'] : '-'}</p>
                </div>
                <div className="coffee-detail-section">
                  <label>Water Weight: </label>
                  <p>{water_weight ? water_weight : '-'}</p>
                </div>
                <div className="coffee-detail-section">
                  <label>Water Temperature: </label>
                  <p>{water_temp ? water_temp : '-'}</p>
                </div>
                <div className="coffee-detail-section">
                  <label>Extraction Time: </label>
                  <p>{extraction_time ? parseExtractionTime() : '-'}</p>
                </div>
                <div className="coffee-detail-section">
                  <label>Yield Weight: </label>
                  <p>{yield_weight ? yield_weight : '-'}</p>
                </div>
                <div className="coffee-detail-section">
                  <label>TDS: </label>
                  <p>{tds ? tds : '-'}</p>
                </div>
              </div>
              {Object.keys(palate).length > 0 
                  ?
                <ChartRadarTaste 
                  className="w-1/2 px-6 mx-auto"
                  labels={Object.keys(palate).map(palateId => { return attributeRangeList['palate_range']['id-' + palateId]['label'] })}
                  rates={Object.values(palate).map(value => { return parseFloat(value) })}
                />
                  :
                null
              }
            </div>
            <div className="px-8 mb-8">
              <label className="font-medium mr-3">Memo: </label>
              <p className="inline">{memo ? memo : '-'}</p>
            </div>
          </div>
        </div>
        <div
          className="cursor-pointer" 
          onClick={e => setOpenDetails(!openDetails)}>
          {openDetails
            ? 
          <HiOutlineChevronUp className="w-6 h-6 mt-2 mx-auto"/>
            :
          <HiOutlineChevronDown className="w-6 h-6 mt-2 mx-auto"/>
          }
        </div>
      </div>

      {modal.mode === MODAL_MODE.EDIT && modal.isOpen
          ?
        <AddEditRecipeModal setModal={setModal} targetRecipe={recipe} mode="edit"/>
          :
        null
      }
    </>
  )
}

export default RecipeSection
