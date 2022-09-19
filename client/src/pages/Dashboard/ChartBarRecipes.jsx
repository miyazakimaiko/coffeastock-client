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
      borderRadius: 5,
    },
  },
  maintainAspectRatio: false,
  responsive: true,
  barThickness: 10,
  scale: {
    min: 0,
    max: 100,
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: true,
        boxWidth: 6,
        font: {
          family: "system-ui" // Add your font here to change the font of your legend label
        },
      },
    },
    tooltip: {
      bodyFont: {
        family: "system-ui" // Add your font here to change the font of your tooltip body
      },
      titleFont: {
        family: "system-ui" // Add your font here to change the font of your tooltip title
      }
    }
  },
  scales: {
    yAxes: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          family: "system-ui", // Add your font here to change the font of your legend label
          size: 11
        }
      },
    },
    xAxes: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          family: "system-ui" // Add your font here to change the font of your legend label
        }
      },
    }
  }
};

const ChartBarRecipes = ({labels, totalRates, grades}) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Total Rate',
        data: totalRates,
        backgroundColor: 'rgb(184,216,215, 1)',
        borderColor: 'rgb(184,216,215, 0)',
      },
      {
        label: 'Bean\'s grade',
        data: grades,
        backgroundColor: 'rgb(214,228,163,1)',
        borderColor: 'rgb(214,228,163,0)',
      }
    ],
  }
  return (
    <div className="px-3 mb-4 lg:mb-6">
      <div
        className="w-full p-4 bg-white shadow-sm rounded-md"
      >
        <h3 className="font-medium text-md opacity-60 text-center pb-2">
          Recipes Total Rate Top 5
        </h3>
        <div style={{
           height: `calc(50px + 60px * ${labels.length})`,
          }}>
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  )
}

export default ChartBarRecipes
