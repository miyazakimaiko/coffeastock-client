import React, { useEffect, useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Spinner from '../../../elements/Spinner';
import TooltipLeft from '../../../elements/TooltipLeft';
import { generateFireIconList, generateStarIconList } from '../../../helpers/GenerateIconList';
import { unescapeHtml } from '../../../helpers/HtmlConverter';
import useBean from '../../../hooks/useBean';
import useRanges from '../../../hooks/useRanges';
import { MAX_NUMBER } from '../../../utils/Constants';
import ErrorPage from '../../error';
import CoffeeRangeListItem from './CoffeeRangeListItem';

const CoffeeRangeListForAll = () => {
  const { id } = useParams();

  const { data: bean,
          isLoading: targetBeanIsLoading,
          isError: targetBeanHasError,
         } = useBean(id);

  const { data: rangeList, 
          isLoading: rangeListIsLoading,
          isError: rangeListHasError,
        } = useRanges();

  const [beanAttrIcons, setBeanAttrIcons] = useState({
    gradeStarIcons: null,
    roastLevelFireIcons: null,
  })
  const [beanAttrNames, setBeanAttrNames] = useState({
    roaster: null,
    aroma: null,
  })

  useEffect(() => {
    if (bean && rangeList) {
      setBeanAttrNames({
        ...beanAttrNames,
        roaster: makeHtmlTags(bean, "roaster"),
        aroma: makeHtmlTags(bean, "aroma"),
      });
      setBeanAttrIcons({
        ...beanAttrIcons,
        gradeStarIcons: bean.grade
          ? generateStarIconList(bean.grade)
          : null,
        roastLevelFireIcons: bean.roast_level
          ? generateFireIconList(bean.roast_level)
          : null,
      });
    }
  }, [bean, rangeList]);

  const makeHtmlTags = (targetBean, category) => {
    const result = [];
    if (targetBean[category]) {
      targetBean[category].forEach((id) => {
        const range = rangeList[`${category}_range`][id];
        const label = unescapeHtml(range ? range.label : "error");
        const info = unescapeHtml(range ? range.def : "error");
        const text = `${info === "" || !Boolean(info) ? "No Info" : info}`;
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

  if (targetBeanIsLoading || rangeListIsLoading) {
    return <Spinner />
  }

  if(targetBeanHasError || rangeListHasError) {
    return <ErrorPage />
  }

  return (
    <>
      <CoffeeRangeListItem
        title="Roast Date"
        contentType="date"
        content={bean.roast_date}
      />
      <CoffeeRangeListItem
        title="Grade"
        contentType="html"
        content={
          <div className="flex">
            {beanAttrIcons.gradeStarIcons}
            <span className="ml-2">
              {bean.grade !== null &&
              bean.grade !== undefined &&
              bean.grade !== ""
                ? `(${bean.grade}/${MAX_NUMBER.BEANS_GRADE})`
                : "-"}
            </span>
          </div>
        }
      />
      <CoffeeRangeListItem
        title="Roast Level"
        contentType="html"
        content={
          <div className="flex">
            {beanAttrIcons.roastLevelFireIcons}
            <span className="ml-2">
              {bean.roast_level !== null &&
              bean.roast_level !== undefined &&
              bean.roast_level !== ""
                ? `(${bean.roast_level}/${MAX_NUMBER.BEANS_ROAST_LEVEL})`
                : "-"}
            </span>
          </div>
        }
      />
      <CoffeeRangeListItem
        title="Aroma"
        contentType="array"
        content={beanAttrNames.aroma}
      />
    </>
  )
}

export default CoffeeRangeListForAll