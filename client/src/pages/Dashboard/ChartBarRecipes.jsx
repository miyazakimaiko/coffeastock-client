import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          family: "Mukta" // Add your font here to change the font of your legend label
        }
      }
    },
    tooltip: {
      bodyFont: {
        family: "Mukta" // Add your font here to change the font of your tooltip body
      },
      titleFont: {
        family: "Mukta" // Add your font here to change the font of your tooltip title
      }
    }
  },
  scales: {
    yAxes: {
      ticks: {
        font: {
          family: "Mukta" // Add your font here to change the font of your legend label
        }
      }
    },
    xAxes: {
      ticks: {
        font: {
          family: "Mukta" // Add your font here to change the font of your legend label
        }
      }
    }
  }
};

const labels = ['Waltz Blend', 'Tropical Blend', 'Su Nolag', 'April', 'Ethopian heirloom', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgba(122, 194, 154, 0.5)',
      backgroundColor: 'rgba(122, 194, 154, 0.5)',
    }
  ],
};

const ChartBarRecipes = () => {
  return (
    <div className="px-3 mb-4 md:mb-0">
      <div
        className="
          w-full p-4
          bg-white shadow-sm rounded-md"
    >
        <h3 className="font-light text-lg text-center pb-2">
          <strong>Recipes</strong> Overall Rate TOP 10
        </h3>
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}

export default ChartBarRecipes
