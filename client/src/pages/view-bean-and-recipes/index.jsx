import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineChevronRight } from 'react-icons/hi'
import { FaInfoCircle } from 'react-icons/fa'
import CoffeeBagRight from '../../assets/svgs/CoffeeBagRight';
import { generateStarIconList, generateFireIconList } from '../../helpers/GenerateIconList';
import { unescapeHtml } from '../../helpers/HtmlConverter'
import { useUserData } from '../../context/AccountContext';
import TooltipLeft from '../../elements/TooltipLeft';
import CoffeeAttributeSection from './components/CoffeeAttributeSection';
import ToolBar from '../../components/tool-bar';
import Dropdown from '../../elements/Dropdown';
import DeleteModal from '../delete-modal';
import RecipeGroupSection from './components/RecipeGroupSection';
import './ViewBeanAndRecipes.scss'
import useBeans from '../../hooks/useBeans';
import useBean from '../../hooks/useBean';
import useDeleteBean from '../../hooks/useDeleteBean';
import useRanges from '../../hooks/useRanges';
import AddEditBeanModal from '../add-edit-bean-modal'
import useRecipes from '../../hooks/useRecipes';

const ViewBeanAndRecipes = () => {
  const { id } = useParams();
  const userData = useUserData()
  const { data: rangeList, isLoading: rangeListIsLoading } = useRanges(userData.sub)
  const { data: beanList, isLoading: beanListIsLoading } = useBeans(userData.sub)
  const { data: targetBean, isLoading: targetBeanIsLoading } = useBean(userData.sub, id)
  const deleteBean = useDeleteBean(userData.sub, id)
  const { data: recipeList, isLoading: recipeListIsLoading } = useRecipes(userData.sub, id)

  const navigate = useNavigate()

  const [modal, setModal] = useState({mode: '', isOpen: false})

  const [blendRatio, setBlendRatio] = useState([])
  const [beanAttrIcons, setBeanAttrIcons] = useState({
    gradeStarIcons: null,
    roastLevelFireIcons: null,
  })
  const [beanAttrNames, setBeanAttrNames] = useState({
    roaster: null,
    aroma: null,
    origin: null,
    process: null,
    variety: null,
    farm: null,
  })
  const [recipeGroupSection, setRecipeGroupSection] = useState(null)

  const makeHtmlTags = (targetBean, category) => {
    const result = [];
    if (targetBean[category]) {
      const ranges = rangeList[`${category}_range`];
      targetBean[category].forEach((id) => {
        const range = ranges[`id-${id}`];
        const label = unescapeHtml(range ? range["label"] : "error");
        const info = unescapeHtml(range ? range["def"] : "error");
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

  const makeNameListHtml = (category, targetBean) => {
    const ids = targetBean[category] ? targetBean[category] : [];
    const ranges = rangeList[`${category}_range`];
    let nameListHtml = ids.map((id) => {
      const range = ranges[`id-${id}`];
      return <span>{range ? range["label"] : "error"}</span>;
    });
    if (nameListHtml.length === 0) {
      nameListHtml = <span>-</span>;
    }
    return nameListHtml;
  };

  const makeBlendRatioHtmlTags = (targetBean) => {
    const result = [];
    if (targetBean["blend_ratio"]) {
      const blend = targetBean["blend_ratio"];
      for (const beanId of Object.keys(blend)) {
        const ratio = blend[beanId];
        const blendBean = beanList?.find((d) => d.bean_id == beanId);
        const originNames = makeNameListHtml("origin", blendBean);
        const roasterNames = makeNameListHtml("roaster", blendBean);
        const processNames = makeNameListHtml("process", blendBean);
        const varietyNames = makeNameListHtml("variety", blendBean);
        const farmNames = makeNameListHtml("farm", blendBean);
        const aromaNames = makeNameListHtml("aroma", blendBean);
        const altitude =
          blendBean["altitude"] === "" || blendBean["altitude"] === null
            ? "-"
            : blendBean["altitude"];
        const harvestPeriod =
          blendBean["harvest_period"] === "" ||
          blendBean["harvest_period"] === null
            ? "-"
            : blendBean["harvest_period"];
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
            <TooltipLeft category="blend" itemId={beanId} tooltipText={text}>
              <div className="flex items-center" id={`tooltip-blend-${beanId}`}>
                <div className="text-right">
                  {`${unescapeHtml(
                    beanList?.find((d) => d.bean_id == beanId)["label"]
                  )}: ${ratio}%`}
                </div>
                <FaInfoCircle className="h-4 w-4 ml-2 flex-shrink-0" />
              </div>
            </TooltipLeft>
          </div>
        );
      }
    }
    return result;
  };

  const onDeleteSubmit = () => {
    deleteBean.mutate(targetBean, {
      onSuccess: navigate('/coffees', {replace: true})
    })
    setModal({mode: '', isOpen: false})
  }

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  },[]);
  
  useEffect(() => {
    if (rangeList && targetBean && recipeList) {
      setBeanAttrNames({
        ...beanAttrNames,
        roaster: makeHtmlTags(targetBean, "roaster"),
        aroma: makeHtmlTags(targetBean, "aroma"),
        origin: makeHtmlTags(targetBean, "origin"),
        process: makeHtmlTags(targetBean, "process"),
        variety: makeHtmlTags(targetBean, "variety"),
        farm: makeHtmlTags(targetBean, "farm"),
      });
      setBeanAttrIcons({
        ...beanAttrIcons,
        gradeStarIcons: targetBean["grade"]
          ? generateStarIconList(targetBean["grade"])
          : null,
        roastLevelFireIcons: targetBean["roast_level"]
          ? generateFireIconList(targetBean["roast_level"])
          : null,
      });
      setBlendRatio(makeBlendRatioHtmlTags(targetBean));
    }
  }, [rangeList, targetBean, recipeList]);

  useEffect(() => {
    if (recipeList && Object.keys(recipeList).length > 0) {
      const list = Object.values(recipeList)
        .filter((recipe) => recipe["bean_id"] === id)
        .map((recipe) => recipe);
      setRecipeGroupSection(<RecipeGroupSection recipeList={list} />);
    } else {
      setRecipeGroupSection(
        <p className="text-center mb-8">
          No recipe has been added for this coffee beans.
        </p>
      );
    }
  }, [recipeList]);

  if (
    beanListIsLoading ||
    targetBeanIsLoading ||
    rangeListIsLoading ||
    recipeListIsLoading
  ) {
    return "Loading...";
  }

  return (
    <>
      <div className="px-4 pt-8 w-full max-w-980px mx-auto">
        <ToolBar
          titleHtml={
            <span className="flex items-center">
              {targetBean["single_origin"] ? "Single Origin" : "Blend"}
              <HiOutlineChevronRight className="h-5 w-5 mx-5" />
              {unescapeHtml(targetBean["label"])}
            </span>
          }
        ></ToolBar>
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
              <CoffeeBagRight name={targetBean["label"]} />
            </div>
            <div className="flex flex-wrap justify-center mt-16">
              <div className="w-full md:w-1/2 my-4 md:px-4">
                <CoffeeAttributeSection
                  title="Roasted By"
                  contentType="array"
                  content={beanAttrNames.roaster}
                />
                <CoffeeAttributeSection
                  title="Roast Date"
                  contentType="date"
                  content={targetBean["roast_date"]}
                />
                <CoffeeAttributeSection
                  title="Grade"
                  contentType="html"
                  content={
                    <div className="flex">
                      {beanAttrIcons.gradeStarIcons}
                      <span className="ml-2">
                        {targetBean["grade"] !== null &&
                        targetBean["grade"] !== undefined &&
                        targetBean["grade"] !== ""
                          ? `(${targetBean["grade"]}/100)`
                          : "-"}
                      </span>
                    </div>
                  }
                />
                <CoffeeAttributeSection
                  title="Roast Level"
                  contentType="html"
                  content={
                    <div className="flex">
                      {beanAttrIcons.roastLevelFireIcons}
                      <span className="ml-2">
                        {targetBean["roast_level"] !== null &&
                        targetBean["roast_level"] !== undefined &&
                        targetBean["roast_level"] !== ""
                          ? `(${targetBean["roast_level"]}/10)`
                          : "-"}
                      </span>
                    </div>
                  }
                />
              </div>

              <div className="w-full md:w-1/2 my-4 md:px-4">
                {targetBean["single_origin"] ? (
                  <>
                    <CoffeeAttributeSection
                      title="Origin"
                      contentType="array"
                      content={beanAttrNames.origin}
                    />
                    <CoffeeAttributeSection
                      title="Process"
                      contentType="array"
                      content={beanAttrNames.process}
                    />
                    <CoffeeAttributeSection
                      title="Variety"
                      contentType="array"
                      content={beanAttrNames.variety}
                    />
                    <CoffeeAttributeSection
                      title="Farm"
                      contentType="array"
                      content={beanAttrNames.farm}
                    />
                    <CoffeeAttributeSection
                      title="Altitude"
                      contentType="string"
                      content={targetBean["altitude"]}
                    />
                    <CoffeeAttributeSection
                      title="Harvest Period"
                      contentType="string"
                      content={targetBean["harvest_period"]}
                    />
                  </>
                ) : (
                  <CoffeeAttributeSection
                    title="Blend Ratio"
                    contentType="array"
                    content={blendRatio}
                  />
                )}
                <CoffeeAttributeSection
                  title="Aroma"
                  contentType="array"
                  content={beanAttrNames.aroma}
                />
              </div>
            </div>

            {targetBean["memo"] !== null && targetBean["memo"] !== "" ? (
              <div className="px-6 pt-4">
                <label className=" font-medium mr-3">Memo: </label>
                <div className="inline-block">
                  {unescapeHtml(targetBean["memo"])}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {recipeGroupSection}
      </div>

      {modal.mode === "edit" && modal.isOpen === true ? (
        <AddEditBeanModal
          mode="edit"
          targetBean={targetBean}
          setModal={setModal}
        />
      ) : null}
      {modal.mode === "delete" && modal.isOpen === true ? (
        <DeleteModal
          label={targetBean["label"]}
          onCloseClick={() => setModal({ mode: "", isOpen: false })}
          onDeleteSubmit={onDeleteSubmit}
        />
      ) : null}
    </>
  );
}

export default ViewBeanAndRecipes
