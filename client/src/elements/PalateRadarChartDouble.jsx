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
import Spinner from './Spinner';
import ErrorPage from '../pages/error';


ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const PalateRadarChartDouble = ({ className, redTitle, blueTitle, redRatesObj, blueRatesObj }) => {
  const { data: palateRange, 
          isLoading: palateRangeIsLoading,
          isError: palateRangeHasError
        } = useRange('palate');

  const [labels, setLabels] = useState([]);
  const [redRates, setRedRates] = useState([]);
  const [blueRates, setBlueRates] = useState([]);

  const [radarContent, setRadarContent] = useState(null);

  useEffect(() => {
    if (!Boolean(redRatesObj)) {
      setRedRates([])
    }
  }, [redRatesObj])

  useEffect(() => {
    if (!Boolean(blueRatesObj)) {
      setBlueRates([])
    }
  }, [blueRatesObj])

  useEffect(() => {
    if (Boolean(palateRange)) {
      if (Boolean(redRatesObj) && !Boolean(blueRatesObj)) {
        setRedRates(Object.values(redRatesObj));
        setLabels(Object.keys(redRatesObj).map(id => [palateRange[id].label.slice(0, 15), palateRange[id].label.slice(15)]))
      }
      else if (!Boolean(redRatesObj) && Boolean(blueRatesObj)) {
        setBlueRates(Object.values(blueRatesObj));
        setLabels(Object.keys(blueRatesObj).map(id => [palateRange[id].label.slice(0, 15), palateRange[id].label.slice(15)]))
      }
      else if (Boolean(redRatesObj) && Boolean(blueRatesObj)) {
        const rateCountObj = makeRateCountObj(redRatesObj, blueRatesObj);
        const idsSortedByCount = makeSortedRateIdsByCount(rateCountObj);
        const [redRates, blueRates] = 
          makeSortedRatesByCount(idsSortedByCount, redRatesObj, blueRatesObj)
  
        setRedRates(redRates);
        setBlueRates(blueRates);
        setLabels(idsSortedByCount.map(id => [palateRange[id].label.slice(0, 15), palateRange[id].label.slice(15)]))
      }
    }
  }, [redRatesObj, blueRatesObj, palateRange]);

  function makeRateCountObj(redRatesObj, blueRatesObj) {
    const rateCountObj = {};
    const redRatesIds = Object.keys(redRatesObj);
    const blueRatesIds = Object.keys(blueRatesObj);

    for (let id of redRatesIds) {
      rateCountObj[id] = 0.5;
    }
    for (let id of blueRatesIds) {
      rateCountObj[id] = (rateCountObj[id] + 1 || 1);
    }
    return rateCountObj;
  }

  function makeSortedRateIdsByCount(rateCountObj) {
    return Object.keys(rateCountObj).sort(function(a, b) {
      if (rateCountObj[a] < rateCountObj[b]) return 1;
      else if (rateCountObj[a] > rateCountObj[b]) return -1;
      else return 0;
    });
  }

  function makeSortedRatesByCount(idsSortedByCount, redRatesObj, blueRatesObj) {
    const redRates = Array(idsSortedByCount.length).fill(0);
    const blueRates = Array(idsSortedByCount.length).fill(0);
    
    for (let i=0; i<idsSortedByCount.length; i++) {
      const id = idsSortedByCount[i];
      redRates[i] = (redRatesObj[id] || null);
      blueRates[i] = (blueRatesObj[id] || null);
    }
    return [redRates, blueRates]
  }

  useEffect(() => {
    if (labels.length > 0 && redRates.length > 0 && blueRates.length > 0) {
      console.log("labels: ", labels)
      console.log("redRates: ", redRates)
      console.log("blueRates: ", blueRates)
      setDoubleRadarChartContent(labels, redRates, blueRates)
    }
  }, [labels, redRates, blueRates])

  useEffect(() => {
    if (!Boolean(redRatesObj), !Boolean(blueRatesObj)) {
      setDoubleRadarChartContent(
        ["sample1", "sample2", "sample3", "sample4", "sample5", "sample6"], 
        [5, 8, 6, 9, 7, 9], 
        [7, 5, 8, 5, 6, 8]
      )
    }
  }, [])

  function setDoubleRadarChartContent(labels, redRates, blueRates) {
    const data = {
      labels: labels,
      datasets: [
        {
          label: redTitle,
          data: redRates,
          backgroundColor: 'rgb(255,143,93,0.2)',
          borderColor: 'rgb(255,143,93)',
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
      scale: { min: 0, max: 10 },
    };
    setRadarContent(<Radar data={data} options={options} />);
  }

  if (palateRangeIsLoading) {
    return <Spinner />
  }

  if (palateRangeHasError) {
    return <ErrorPage />
  }

  return (
    <div className={className}>
      { radarContent }
    </div>
  )
}

export default PalateRadarChartDouble
