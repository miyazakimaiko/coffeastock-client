import React, { useState } from 'react';
import { createContext } from 'react'

export const BeansContext = createContext();

const Beans = (props) => {
  const [beans, innerSetBeans] = useState({});

  const fetchAllBeans = async (userid) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/user/${userid}/beans`,
        { method: "GET" }
      );
      const parseRes = await response.json();  
      setBeans(parseRes);
    } catch (error) {}
  };

  const setBeans = (beans) => {
    const beansObj = {};
    beans.forEach(element => {
      beansObj[element['coffee_bean_id']] = element;
    });
    innerSetBeans(beansObj);
  }

  return (
    <BeansContext.Provider value={{beans, fetchAllBeans, setBeans}}>
    {props.children}
    </BeansContext.Provider>
  );
};

export default Beans;
