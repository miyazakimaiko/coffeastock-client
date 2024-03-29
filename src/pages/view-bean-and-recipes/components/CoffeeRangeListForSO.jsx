import React, { useEffect, useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Spinner from '../../../elements/Spinner';
import TooltipBottomLeft from '../../../elements/TooltipBottomLeft';
import { unescapeHtml } from '../../../helpers/HtmlConverter';
import useBean from '../../../hooks/useBean';
import useRanges from '../../../hooks/useRanges';
import ErrorPage from '../../error';
import CoffeeRangeListItem from './CoffeeRangeListItem';

const CoffeeRangeListForSO = () => {
  const { id } = useParams();

  const { data: bean,
          isLoading: targetBeanIsLoading,
          isError: targetBeanHasError,
         } = useBean(id);

  const { data: rangeList, 
          isLoading: rangeListIsLoading,
          isError: rangeListHasError,
        } = useRanges();

  const [beanAttrNames, setBeanAttrNames] = useState({
    origin: null,
    process: null,
    variety: null,
    farm: null,
  })

  useEffect(() => {
    if (bean && rangeList) {
      setBeanAttrNames({
        ...beanAttrNames,
        origin: makeHtmlTags(bean, "origin"),
        process: makeHtmlTags(bean, "process"),
        variety: makeHtmlTags(bean, "variety"),
        farm: makeHtmlTags(bean, "farm"),
      });
    }
  }, [bean, rangeList]);

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
            <TooltipBottomLeft category={category} itemId={id} tooltipText={text}>
              <div
                className="flex items-center"
                id={`tooltip-${category}-${id}`}
              >
                <p className="text-right">{label}</p>
                <FaInfoCircle className="h-4 w-4 ml-2 flex-shrink-0" />
              </div>
            </TooltipBottomLeft>
          </div>
        );
      });
    }
    return result;
  };

  if (targetBeanIsLoading || rangeListIsLoading) {
    return <Spinner />
  }

  if (targetBeanHasError || rangeListHasError) {
    return <ErrorPage />
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