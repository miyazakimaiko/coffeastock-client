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
          family: "system-ui" // Add your font here to change the font of your legend label
        }
      }
    },
    xAxes: {
      ticks: {
        font: {
          family: "system-ui" // Add your font here to change the font of your legend label
        }
      }
    }
  }
};

const ChartBarBeans = ({labels, beansData}) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Grade (0 - 100)',
        data: beansData,
        borderColor: 'rgba(243,187,69, 0.5)',
        backgroundColor: 'rgba(243,187,69, 0.5)',
      }
    ],
  };

  return (
    <div className="px-3 mb-4 md:mb-0">
      <div
        className="
          w-full p-4
          bg-white shadow-sm rounded-md"
    >
        <h3 className="font-light text-lg text-center pb-2">
          <strong>Beans</strong> Overall Rate TOP 10
        </h3>
        <Bar options={options} data={data} className="font-sans" />
      </div>
    </div>
  )
}

export default ChartBarBeans
