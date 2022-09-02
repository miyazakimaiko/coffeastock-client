import React, { useEffect, useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa';
import { useUserData } from '../../../context/AccountContext';
import TooltipLeft from '../../../elements/TooltipLeft';
import { unescapeHtml } from '../../../helpers/HtmlConverter';
import useRanges from '../../../hooks/useRanges';
import CoffeeRangeListItem from './CoffeeRangeListItem';

const CoffeeRangeListForSO = ({bean}) => {
  const { data: rangeList, 
          isLoading: rangeListIsLoading 
        } = useRanges();

  const [beanAttrNames, setBeanAttrNames] = useState({
    origin: null,
    process: null,
    variety: null,
    farm: null,
  })

  useEffect(() => {
    if (!rangeListIsLoading) {
      setBeanAttrNames({
        ...beanAttrNames,
        origin: makeHtmlTags(bean, "origin"),
        process: makeHtmlTags(bean, "process"),
        variety: makeHtmlTags(bean, "variety"),
        farm: makeHtmlTags(bean, "farm"),
      });
    }
  }, [rangeList]);

  const makeHtmlTags = (targetBean, category) => {
    const result = [];
    if (targetBean[category]) {
      const ranges = rangeList[`${category}_range`];
      targetBean[category].forEach((id) => {
        const range = ranges[id];
        const label = unescapeHtml(range ? range.label : "error");
        const info = unescapeHtml(range ? range.def : "error");
        const text = `${info === "" ? "No Info" : info}`;
        result.push(
          <div
            className="flex justify-end"
            style={{ paddingTop: "4px", paddingBottom: "4px" }}
          >
            <TooltipLeft category={category} itemId={id} tooltipText={text}>
              <div
                className="flex items-center"
                id={`tooltip-${category}-${id}`}
              >
                <p className="text-right">{label}</p>
                <FaInfoCircle className="h-4 w-4 ml-2 flex-shrink-0" />
              </div>
            </TooltipLeft>
          </div>
        );
      });
    }
    return result;
  };

  if (rangeListIsLoading) {
    return "Loading...";
  }
  return (
    <>
      <CoffeeRangeListItem
        title="Origin"
        contentType="array"
        content={beanAttrNames.origin}
      />
      <CoffeeRangeListItem
        title="Process"
        contentType="array"
        content={beanAttrNames.process}
      />
      <CoffeeRangeListItem
        title="Variety"
        contentType="array"
        content={beanAttrNames.variety}
      />
      <CoffeeRangeListItem
        title="Farm"
        contentType="array"
        content={beanAttrNames.farm}
      />
      <CoffeeRangeListItem
        title="Altitude"
        contentType="string"
        content={bean.altitude}
      />
      <CoffeeRangeListItem
        title="Harvest Period"
        contentType="string"
        content={bean.harvest_period}
      />
    </>
  )
}

export default CoffeeRangeListForSO