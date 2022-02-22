import React, { useState } from 'react';
import { createContext } from 'react';
import { toast } from 'react-toastify';

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

  const insertBean = async (userid, body) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/user/${userid}/bean`,
        {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();
      if (parseRes.status === 'error') {
        toast.error(parseRes.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
      else {
        fetchAllBeans(userid);
        toast.success("New coffee bean is added.", {
          position: toast.POSITION.BOTTOM_CENTER
        });
        return true
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    return false;
  }

  return (
    <BeansContext.Provider value={{beans, fetchAllBeans, setBeans, insertBean}}>
    {props.children}
    </BeansContext.Provider>
  );
};

export default Beans;
