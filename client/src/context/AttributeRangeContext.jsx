import React, { useState } from 'react';
import { createContext } from 'react';
import { toast } from 'react-toastify';

export const AttributeRangeContext = createContext();

const reorderAttributes = (attributes) => {
  const orderedAttributes = Object.entries(attributes).sort(sortByName).reduce(
    (obj, [key, value]) => {
      value['value'] = key; // ID is named as value to enable react-multi-select-component correctly
      obj['id-' + key] = value; // without 'id-' the object is sorted automatially by the id
      return obj;
    }, 
    {}
  );
  return orderedAttributes;
}

const sortByName = ( a, b ) => {
  if ( a[1]['label'] < b[1]['label'] ){
    return -1;
  }
  if ( a[1]['label'] > b[1]['label'] ){
    return 1;
  }
  return 0;
}

const reorderAttributeRangeList = (attributeList) => {
  const orderedRangeList = {};
  Object.entries(attributeList).map(attributes => {
    const orderedRange = Object.entries(attributes[1]['range']).sort(sortByName).reduce(
      (obj, [key, value]) => {
        value['value'] = key; // ID is named as value to enable react-multi-select-component correctly
        obj['id-' + key] = value; // without 'id-' the object is sorted automatially by the id
        return obj;
      }, 
      {}
    );
    orderedRangeList[attributes[0]] = orderedRange;
  });
  return orderedRangeList;
}

const AttributeRangeProvider = (props) => {
  // All RangeList
  const [attributeRangeList, setAttributeRangeList] = useState({});

  const setAttributeRange = (newRange, category) => {
    const rangeName = category + "_range";
    const orderedRange = reorderAttributes(newRange)
    let orderedRangeList = attributeRangeList;
    orderedRangeList[rangeName] = orderedRange;
    setAttributeRangeList(orderedRangeList);
  }

  const fetchAttributeRangeList = async (userid) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/user/${userid}/ranges`,
        { method: "GET" }
      );
      const parseRes = await response.json();  
      const orderedRangeList = reorderAttributeRangeList(parseRes);
      setAttributeRangeList(orderedRangeList);
      return true;
    } catch (error) {}
    return false;
  };

  const insertAttribute = async (userId, category, body) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/user/${userId}/range/${category}`,
        {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();
      if (response.status === 422) {
        const message = parseRes.error.message ? parseRes.error.message : response.statusText;
        console.log('error message from insertEntry(): ', message)
        // returns message instead of throwing toast, because when this is done during Add New Coffee Bean is in process, we don't want this toast pop up.
        return {
          "error": {
            "message": message
          }
        }
      }
      if (response.status !== 200) {
        toast.error(
          parseRes.error.message ? parseRes.error.message : response.statusText, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
      else {
        setAttributeRange(parseRes, category);
        return true;
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    return false;
  }

  const editAttribute = async (userId, category, entryId, body) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/user/${userId}/range/${category}/${entryId}`,
        {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();
      if (response.status !== 200) {
        toast.error(
          parseRes.error.message ? parseRes.error.message : response.statusText, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
      else {
        setAttributeRange(parseRes, category);
        toast.success("Change is saved successfully.", {
          position: toast.POSITION.BOTTOM_CENTER
        });
        return true;
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    return false;
  }

  const deleteAttribute = async (userId, category, entryId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/user/${userId}/range/${category}/${entryId}`,
        {
          method: "DELETE",
          headers: {
            'Content-Type': "application/json"
          }
        }
      );
      const parseRes = await response.json();
      if (response.status !== 200) {
        toast.error(
          parseRes.error.message ? parseRes.error.message : response.statusText, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
      else {
        setAttributeRange(parseRes, category);
        toast.success("Entry is deleted successfully.", {
          position: toast.POSITION.BOTTOM_CENTER
        });
        return true;
      }

    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    return false;
  }

  return (
    <AttributeRangeContext.Provider 
      value={{attributeRangeList, fetchAttributeRangeList, insertAttribute, editAttribute, deleteAttribute }}>
      {props.children}
    </AttributeRangeContext.Provider>
  )
}





export default AttributeRangeProvider
