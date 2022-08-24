import React, { useEffect, useState } from 'react';
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
import useRange from '../hooks/useRange';
import { useUserData } from '../context/AccountContext';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);


const PalateRadarChartDouble = ({ className, redTitle, blueTitle, redRatesObj, blueRatesObj }) => {
  const userData = useUserData();
  const { data: palateRange, isLoading: palateRangeIsLoading } = useRange(userData.sub, 'palate')

  const [labels, setLabels] = useState([]);
  const [redRates, setRedRates] = useState([]);
  const [blueRates, setBlueRates] = useState([]);

  const [radarContent, setRadarContent] = useState(null);

  useEffect(() => {
    if (redRatesObj && blueRatesObj) {
      const rateCountObj = {};
      const redRatesIds = Object.keys(redRatesObj);
      const blueRatesIds = Object.keys(blueRatesObj);

      for (let id of redRatesIds) {
        rateCountObj[id] = 1;
      }
      for (let id of blueRatesIds) {
        rateCountObj[id] = (rateCountObj[id] + 1 || 1);
      }

      const idsSortedByCount = Object.keys(rateCountObj).sort(function(a, b) {
          if (rateCountObj[a] < rateCountObj[b]) return 1;
          else if (rateCountObj[a] > rateCountObj[b]) return -1;
          else return 0;
        });

      const redRates = Array(idsSortedByCount.length).fill(0);
      const blueRates = Array(idsSortedByCount.length).fill(0);
      
      for (let i=0; i<idsSortedByCount.length; i++) {
        const id = idsSortedByCount[i];
        redRates[i] = (redRatesObj[id] || null);
        blueRates[i] = (blueRatesObj[id] || null);
      }

      setRedRates(redRates);
      setBlueRates(blueRates);
      setLabels(idsSortedByCount.map(id => palateRange[`id-${id}`].label))
    }
  }, [redRatesObj, blueRatesObj]);

  useEffect(() => {
    if (labels && redRates && blueRates) {
      const data = {
        labels: labels,
        datasets: [
          {
            label: redTitle,
            data: redRates,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: blueTitle,
            data: blueRates,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
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
      setRadarContent(<Radar data={data} options={options} />);
    }
  }, [labels, redRates, blueRates])

  if (palateRangeIsLoading) {
    return 'Loading...'
  }

  return (
    <div className={className}>
      { radarContent }
    </div>
  )
}

export default PalateRadarChartDouble
