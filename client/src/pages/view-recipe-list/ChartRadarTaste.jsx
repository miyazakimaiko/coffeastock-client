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

export const data = {
  labels: ['Aroma', 'Floral', 'Berryfruit', 'Citrusfruit', 'Stonefruit', 'Chocolate', 'Caramel', 'Bitter', 'Smoky', 'Spicy', 'Savory', 'Body', 'Linger', 'Clean'],
  datasets: [
    {
      label: '# of Votes',
      data: [7, 9, 5, 5, 7, 10, 6, 9, 3, 6, 7, 9, 4, 5],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const ChartRadarTaste = () => {
  return (
    <div className="">
      <Radar data={data} />
    </div>
  )
}

export default ChartRadarTaste
