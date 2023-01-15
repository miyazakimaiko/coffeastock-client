import React, { useEffect, useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import Spinner from '../../../elements/Spinner'
import TooltipBottomLeft from '../../../elements/TooltipBottomLeft'
import { unescapeHtml } from '../../../helpers/HtmlConverter'
import useBean from '../../../hooks/useBean'
import useBeans from '../../../hooks/useBeans'
import useRanges from '../../../hooks/useRanges'
import ErrorPage from '../../error'
import CoffeeRangeListItem from './CoffeeRangeListItem'

const CoffeeRangeListForBlend = () => {
  const { id } = useParams();

  const { data: bean,
          isLoading: targetBeanIsLoading,
          isError: targetBeanHasError,
         } = useBean(id);

  const { data: rangeList, 
          isLoading: rangeListIsLoading,
          isError: rangeListHasError,
        } = useRanges();

  const { data: beanList, 
          isLoading: beanListIsLoading,
          isError: beanListHasError,
        } = useBeans();

  const [blendRatio, setBlendRatio] = useState([]);

  useEffect(() => {
    if (bean && rangeList && beanList) {
      setBlendRatio(makeBlendRatioHtmlTags(bean));
    }
  },[bean, rangeList, beanList]);

  const makeBlendRatioHtmlTags = (targetBean) => {
    const result = [];
    if (targetBean.blend_ratio) {
      const blend = targetBean.blend_ratio;
      for (const beanId of Object.keys(blend)) {
        const ratio = blend[beanId];
        const blendBean = beanList[beanId];
        const originNames = makeNameListHtml("origin", blendBean);
        const roasterNames = makeNameListHtml("roaster", blendBean);
        const processNames = makeNameListHtml("process", blendBean);
        const varietyNames = makeNameListHtml("variety", blendBean);
        const farmNames = makeNameListHtml("farm", blendBean);
        const aromaNames = makeNameListHtml("aroma", blendBean);
        const altitude =
          blendBean.AddEditBeanModalaltitude === "" || blendBean.altitude === null
            ? "-"
            : blendBean.altitude;
        const harvestPeriod =
          blendBean.harvest_period === "" ||
          blendBean.harvest_period === null
            ? "-"
            : blendBean.harvest_period;
        const text = (
          <>
            <p className="py-1 slash-end">
              <strong className="text-yellow">Roaster: </strong> {roasterNames}
            </p>
            <p className="py-1 slash-end">
              <strong className="text-yellow">Origin:</strong> {originNames}
            </p>
            <p className="py-1 slash-end">
              <strong className="text-yellow">Process:</strong> {processNames}
            </p>
            <p className="py-1 slash-end">
              <strong className="text-yellow">Variety:</strong> {varietyNames}
            </p>
            <p className="py-1 slash-end">
              <strong className="text-yellow">Farm:</strong> {farmNames}
            </p>
            <p className="py-1 slash-end">
              <strong className="text-yellow">Altitude:</strong> {altitude}
            </p>
            <p className="py-1 slash-end">
              <strong className="text-yellow">Harvest Period:</strong>{" "}
              {harvestPeriod}
            </p>
            <p className="py-1 slash-end">
              <strong className="text-yellow">Aroma:</strong> {aromaNames}
            </p>
          </>
        );

        result.push(
          <div
            className="flex justify-end"
            style={{ paddingTop: "4px", paddingBottom: "4px" }}
          >
            <TooltipBottomLeft category="blend" itemId={beanId} tooltipText={text}>
              <div className="flex items-center" id={`tooltip-blend-${beanId}`}>
                <div className="text-right">
                  {`${unescapeHtml(
                    beanList[beanId].label
                  )}: ${ratio}%`}
                </div>
                <FaInfoCircle className="h-4 w-4 ml-2 flex-shrink-0" />
              </div>
            </TooltipBottomLeft>
          </div>
        );
      }
    }
    return result;
  };

  const makeNameListHtml = (category, targetBean) => {
    const ids = targetBean[category] ? targetBean[category] : [];
    const ranges = rangeList[`${category}_range`];
    let nameListHtml = ids.map((id) => {
      const range = ranges[id];
      return <span>{range ? range.label : "error"}</span>;
    });
    if (nameListHtml.length === 0) {
      nameListHtml = <span>-</span>;
    }
    return nameListHtml;
  };

  if (targetBeanIsLoading
    || rangeListIsLoading
    || beanListIsLoading
  ) {
    return <Spinner />
  }

  if (targetBeanHasError
    || rangeListHasError
    || beanListHasError
  ){
    return <ErrorPage />
  }

  return (
    <CoffeeRangeListItem
      title="Blend Ratio"
      contentType="array"
      content={blendRatio}
    />
  )
}

export default CoffeeRangeListForBlend