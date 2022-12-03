import React, { useEffect, useState } from 'react'
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
          family: "system-ui", // Add your font here to change the font of your legend label
        }
      }
    }
  }
};

const ChartBarBeans = ({labels, grades, avgRecipeRate}) => {

    const data = {
      labels : labels.length > 0 ? labels : ["Beans #1", "Beans #2", "Beans #3", "Beans #4"],
      datasets: [
        {
          label: 'Grade',
          data: grades.length > 0 ? grades : [87, 76, 65, 43],
          backgroundColor: 'rgb(255,143,93,0.7)',
          borderColor: 'rgb(255,143,93,0)',
        },
        {
          label: 'Average Recipe Rate',
          data: avgRecipeRate.length > 0 ? avgRecipeRate : [76, 80, 50, 55],
          backgroundColor: 'rgb(213,193,171,1)',
          borderColor: 'rgb(213,193,171,0)',
        }
      ],
    };
  
  return (
    <div className="px-3 mb-4 lg:mb-6">
      <div className="w-full p-4 bg-white shadow-sm rounded-md">
        <h3 className="font-medium text-md opacity-60 text-center pb-2">
           Beans Grade Top 5
        </h3>
        <div style={{ height: `calc(50px + 50px * ${data.labels.length})`, position: "relative" }}>
          <Bar options={options} data={data} />
          {labels.length === 0 && (
            <div 
              className="absolute backdrop-filter backdrop-blur-sm bg-white/30 
                top-0 bottom-0 left-0 right-0 flex justify-center items-center"
            >
              <p className="text-lg text-burnt-sienna">
                No Data Available Yet...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChartBarBeans
