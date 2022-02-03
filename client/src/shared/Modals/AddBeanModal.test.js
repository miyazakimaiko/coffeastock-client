import { render, screen } from '@testing-library/react'
import { useState } from 'react';
import { CustomRangesContext } from '../../context/CustomRanges';
import AddBeanModal from './AddBeanModal'

const renderAddBeanModal = (customRanges, setOpenAddBeanModal) => {
  return render(
    <CustomRangesContext.Provider value={{customRanges}}>
      <AddBeanModal setOpenThisModal={setOpenAddBeanModal} />
    </CustomRangesContext.Provider>
  )
}

const customRanges = {
    'aroma_range': {
      'id-1': {
        def: 'test detail for id-1...',
        label: 'Pineapple',
        value: '1'
      },
      'id-2': {
        def: 'test detail for id-2...',
        label: 'Peach',
        value: '2'
      },
      'id-3': {
        def: 'test detail for id-3...', 
        label: 'Green apple', 
        value: '3'
      },
      'id-4': {
        def: 'test detail for id-4...', 
        label: 'Walnut', 
        value: '4'
      }
    },
    'farm_range': {
      'id-1': {
        def: 'test detail for id-1...',
        label: 'Farm 3',
        value: '1'
      },
      'id-2': {
        def: 'test detail for id-2...',
        label: 'Farm 2',
        value: '2'
      },
      'id-3': {
        def: 'test detail for id-3...', 
        label: 'Farm 1', 
        value: '3'
      },
      'id-4': {
        def: 'test detail for id-4...', 
        label: 'Farm 4', 
        value: '4'
      }
    },
    'roaster_range': {
      'id-1': {
        def: 'test detail for id-1...',
        label: 'Koppi',
        value: '1'
      },
      'id-2': {
        def: 'test detail for id-2...',
        label: 'Waltz Coffee',
        value: '2'
      },
      'id-3': {
        def: 'test detail for id-3...', 
        label: 'Coffee Collective', 
        value: '3'
      },
      'id-4': {
        def: 'test detail for id-4...', 
        label: 'Farmhand', 
        value: '4'
      }
    }
}

const setOpenAddBeanModal = jest.fn();

test('On initial render, the next button is disabled', () => {
  renderAddBeanModal(customRanges, setOpenAddBeanModal)
  screen.debug();
})