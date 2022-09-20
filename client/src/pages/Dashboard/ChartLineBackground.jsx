import React, { useEffect, useState } from 'react'
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

const ChartLineBackground = ({data, color, max}) => {

  const [lineChartContent, setLineChartContent] = useState(null);

  const resultArray = [];
  const TOTAL_SHOWN_DAYS = 30;

  const dataset = {
    labels: Array(5).fill(""), // default
    datasets: [
      {
        fill: true,
        data: Array(5).fill(max/5), // default
        pointRadius: 0,
        tension: 0,
        backgroundColor: color,
        borderColor: 'rgba(255, 99, 132, 0)',
      },
    ],
  };

  const options = {
    elements: {
      bar: {
        borderWidth: 2,
        borderRadius: 20,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    scale: { min: 0, max },
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      yAxes: {
        grid: { display: false },
        ticks: { display: false },
      },
      xAxes: {
        grid: { display: false },
        ticks: { display: false }
      }
    }
  };

  useEffect(() => {
    
    if (Boolean(data) && data.length > 0) {
      
      const maxTotal = data.sort((a,b) => (b.total-a.total))[0].total;
      const today = new Date();
    
      for (let i=TOTAL_SHOWN_DAYS; i>=0 ; i--) {
        const dateIdaysBeforeTmstmp = new Date().setDate(today.getDate()-i);
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
    
      options.scale.max = maxTotal;
      dataset.labels = resultArray.map(d => "");
      dataset.datasets[0].data = resultArray;
  
    }
    setLineChartContent(<Line options={options} data={dataset} className="font-sans" />)

  }, [max, data])
  

  return (
    <div className="h-full w-full">
      {lineChartContent}
    </div>
  )
}

export default ChartLineBackground
