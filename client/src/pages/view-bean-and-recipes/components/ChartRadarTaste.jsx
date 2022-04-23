import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);


const ChartRadarTaste = ({ className, labels, rates }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Palate Rate',
        data: rates,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scale: {
      min: 0,
      max: 10,
  },
};

  console.log('data: ', data)
  return (
    <div className={className}>
      <Radar data={data} options={options} />
    </div>
  )
}

export default ChartRadarTaste
