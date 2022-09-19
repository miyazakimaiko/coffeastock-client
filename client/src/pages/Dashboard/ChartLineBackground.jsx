import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
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
  },
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false,
    },
  },
  scales: {
    yAxes: {
      grid: {
        display: false,
      },
      ticks: {
        display: false
      },
    },
    xAxes: {
      grid: {
        display: false
      },
      ticks: {
        display: false
      }
    }
  }
};

const ChartLineBackground = ({data, color}) => {
  const resultArray = [];
  const TOTAL_SHOWN_DAYS = 30;
  const maxTotal = data.sort((a,b) => (b.total-a.total))[0].total;
  const mostRecentDateInData = new Date(data[data.length - 1].date);

  for (let i=TOTAL_SHOWN_DAYS; i>=0 ; i--) {
    const dateIdaysBeforeTmstmp = new Date().setDate(mostRecentDateInData.getDate()-i);
    const dateIdaysBefore = new Date(dateIdaysBeforeTmstmp);
    const dataInTheDay = data.find(d => {
      return new Date(d.date).getMonth() === dateIdaysBefore.getMonth()
             && new Date(d.date).getDate() === dateIdaysBefore.getDate()
    });
    if (dataInTheDay) {
      resultArray.push(parseFloat(dataInTheDay.total) + parseFloat((maxTotal/5).toFixed(2)))
    } 
    else resultArray.push(parseFloat((maxTotal/5).toFixed(2)))
  }


  const dataset = {
    labels: resultArray.map(d => ""),
    datasets: [
      {
        fill: true,
        data: resultArray,
        pointRadius: 0,
        tension: 0,
        backgroundColor: color,
        borderColor: 'rgba(255, 99, 132, 0)',
      },
    ],
  };

  return (
    <div className="h-full w-full">
      <Line options={options} data={dataset} className="font-sans" />
    </div>
  )
}

export default ChartLineBackground
