import React from 'react'
import { useParams } from 'react-router-dom'
import { useUserData } from '../../../context/AccountContext';
import useBean from '../../../hooks/useBean';
import useBeans from '../../../hooks/useBeans';
import useRanges from '../../../hooks/useRanges';

const CoffeeSection = () => {
  const { id } = useParams();
  const userData = useUserData();
  const { data: rangeList, isLoading: rangeListIsLoading } = useRanges(userData.sub)
  const { data: beanList, isLoading: beanListIsLoading } = useBeans(userData.sub)
  const { data: targetBean, isLoading: targetBeanIsLoading } = useBean(userData.sub, id)
  const deleteBean = useDeleteBean(userData.sub, id)
  const navigate = useNavigate()

  return (
    <div className="my-4">
      <div className="relative bg-white p-2 py-12 rounded-lg shadow-sm">
        <div className="absolute top-5 right-4">
          <Dropdown dropdownText="" type="dot">
            <div className="dropdown-content">
              <button
                type="button"
                className="dropdown-item"
                onClick={() => setModal({ mode: "edit", isOpen: true })}
              >
                Edit
              </button>
              <button
                type="button"
                className="dropdown-item"
                onClick={() => setModal({ mode: "delete", isOpen: true })}
              >
                Delete
              </button>
            </div>
          </Dropdown>
        </div>
        <div className="coffee-bag-container mx-auto mt-14">
          <CoffeeBagRight name={targetBean.label} />
        </div>
        <div className="flex flex-wrap justify-center mt-16">
          <div className="w-full md:w-1/2 my-4 md:px-4">
            <CoffeeRangeListItem
              title="Roasted By"
              contentType="array"
              content={beanAttrNames.roaster}
            />
            <CoffeeRangeListItem
              title="Roast Date"
              contentType="date"
              content={targetBean.roast_date}
            />
            <CoffeeRangeListItem
              title="Grade"
              contentType="html"
              content={
                <div className="flex">
                  {beanAttrIcons.gradeStarIcons}
                  <span className="ml-2">
                    {targetBean.grade !== null &&
                    targetBean.grade !== undefined &&
                    targetBean.grade !== ""
                      ? `(${targetBean.grade}/100)`
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
                    {targetBean.roast_level !== null &&
                    targetBean.roast_level !== undefined &&
                    targetBean.roast_level !== ""
                      ? `(${targetBean.roast_level}/10)`
                      : "-"}
                  </span>
                </div>
              }
            />
          </div>

          <div className="w-full md:w-1/2 my-4 md:px-4">
            {targetBean.single_origin ? (
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
                  content={targetBean.altitude}
                />
                <CoffeeRangeListItem
                  title="Harvest Period"
                  contentType="string"
                  content={targetBean.harvest_period}
                />
              </>
            ) : (
              <CoffeeRangeListItem
                title="Blend Ratio"
                contentType="array"
                content={blendRatio}
              />
            )}
            <CoffeeRangeListItem
              title="Aroma"
              contentType="array"
              content={beanAttrNames.aroma}
            />
          </div>
        </div>

        {targetBean.memo !== null && targetBean.memo !== "" ? (
          <div className="px-6 pt-4">
            <label className=" font-medium mr-3">Memo: </label>
            <div className="inline-block">
              {unescapeHtml(targetBean.memo)}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default CoffeeSection