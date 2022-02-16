import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BeansContext } from '../../context/Beans';
import { CustomRangesContext } from '../../context/CustomRanges';
import AddBeanModal from './AddBeanModal'

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
const beans = {
  '07452d28-9a6d-4224-b150-f3d065fa2220': {
    altitude: '1200-1300 MASL',
    aroma: [2, 3],
    blend_ratio: null,
    coffee_bean_id: "07452d28-9a6d-4224-b150-f3d065fa2220",
    farm: [3],
    grading: 90,
    harvest_date: "Aug - Oct 2021",
    label: "SO Beans 2",
    memo: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure r",
    origin: [2],
    process: [1],
    roast_date: "2021-12-10T00:00:00.000Z",
    roast_level: 5.5,
    roaster: [2],
    single_origin: false,
    user_id: "30a80906-2334-48ec-9f5d-88e0f68210fc",
    variety: [2, 3],
  },
  "07452d28-9a6d-4224-b150-f3d065fa2220": {
    altitude: "1200-1300 MASL",
    aroma: [2, 3],
    blend_ratio: null,
    coffee_bean_id: "07452d28-9a6d-4224-b150-f3d065fa2220",
    farm: [3],
    grading: 90,
    harvest_date: "Aug - Oct 2021",
    label: "SO Beans 2",
    memo: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure r",
    origin: [2],
    process: [1],
    roast_date: "2021-12-10T00:00:00.000Z",
    roast_level: 5.5,
    roaster: [2],
    single_origin: false,
    user_id: "30a80906-2334-48ec-9f5d-88e0f68210fc",
    variety: [2, 3]
  },
  "b08b8b04-9903-42f6-aad0-d9c72ec11dd4": {
    altitude: "1100-1200 MASL",
    aroma: [1, 2, 4],
    blend_ratio: null,
    coffee_bean_id: "b08b8b04-9903-42f6-aad0-d9c72ec11dd4",
    farm: [1, 2],
    grading: 55.5,
    harvest_date: "Sept - Oct 2020",
    label: "SO Beans 3",
    memo: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Ev",
    origin: [2],
    process: [2],
    roast_date: "2021-10-17T23:00:00.000Z",
    roast_level: 5,
    roaster: [1],
    single_origin: false,
    user_id: "30a80906-2334-48ec-9f5d-88e0f68210fc",
    variety: [1],
  }
}
const setOpenAddBeanModal = jest.fn();

const renderAddBeanModal = () => {
  return render(
    <CustomRangesContext.Provider value={{customRanges}}>
      <BeansContext.Provider value={{beans}}>
        <AddBeanModal setOpenThisModal={setOpenAddBeanModal} />
      </BeansContext.Provider>
    </CustomRangesContext.Provider>
  )
}

test('If Name is entered, the next button on Base Info should be enabled, otherwise disabled', async () => {
  renderAddBeanModal();
  const targetButton = screen.getAllByRole('button', {name: /next/i})[0];
  expect(targetButton).toBeDisabled();

  const nameInput = screen.getByPlaceholderText(/seasonal house blend/i);
  userEvent.type(nameInput, "Waltz Blend");
  expect(targetButton).toBeEnabled();

  userEvent.clear(nameInput);
  expect(targetButton).toBeDisabled();
});

test('If Name is entered, the Details tab button should be enabled, otherwise disabled', async () => {
  renderAddBeanModal();
  const targetButton = screen.getAllByRole('tab', {name: /details/i})[0];
  expect(targetButton).toBeDisabled();

  const nameInput = screen.getByPlaceholderText(/seasonal house blend/i);
  userEvent.type(nameInput, "Waltz Blend");
  expect(targetButton).toBeEnabled();

  userEvent.clear(nameInput);
  expect(targetButton).toBeDisabled();
});

test('If Next button on the Base Info conponent is clicked, the Details component should be displayed', async () => {
  renderAddBeanModal();
  const targetButton = screen.getAllByRole('button', {name: /next/i})[0];
  const nameInput = screen.getByPlaceholderText(/seasonal house blend/i);

  userEvent.type(nameInput, "Waltz Blend");
  expect(targetButton).toBeEnabled();

  const detailsContents = screen.getByTestId('details')
  expect(detailsContents.classList.contains('show')).toBe(false);


  userEvent.click(targetButton);
  expect(detailsContents.classList.contains('show')).toBe(true);
  // const nameInput = screen.getAllByPlaceholderText(/seasonal house blend/i)[0];
  // userEvent.type(nameInput, "Waltz Blend");
  // expect(targetButton).toBeEnabled();

  // userEvent.clear(nameInput);
  // expect(targetButton).toBeDisabled();
});