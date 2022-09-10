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
      borderRadius: 20,
    },
  },
  maintainAspectRatio: false,
  responsive: true,
  barThickness: 15,
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
        }
      }
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
      ticks: {
        font: {
          family: "system-ui", // Add your font here to change the font of your legend label
          size: 11
        }
      }
    },
    xAxes: {
      ticks: {
        font: {
          family: "system-ui", // Add your font here to change the font of your legend label
        }
      }
    }
  }
};

const ChartBarBeans = ({labels, grades, avgRecipeRate}) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Grade',
        data: grades,
        backgroundColor: 'rgba(255, 99, 132, 0.4)',
        borderColor: 'rgba(255, 99, 132, 0)',
      },
      {
        label: 'Average Recipe Rate',
        data: avgRecipeRate,
        backgroundColor: 'rgba(243,187,69, 0.4)',
        borderColor: 'rgba(243,187,69, 0)',
      }
    ],
  };

  return (
    <div className="px-3 mb-4 lg:mb-6">
      <div
        className="
          w-full p-4
          bg-white shadow-sm rounded-md"
    >
        <h3 className="font-medium text-md opacity-60 text-center pb-2">
           Beans Grade Top 5
        </h3>
        <div style={{
           height: `calc(50px + 60px * ${labels.length})`,
          }}>
          <Bar options={options} data={data} className="font-sans" />
        </div>
      </div>
    </div>
  )
}

export default ChartBarBeans
