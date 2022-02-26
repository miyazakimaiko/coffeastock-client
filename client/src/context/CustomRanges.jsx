import React, { useState } from 'react';
import { createContext } from 'react';
import { toast } from 'react-toastify';

export const CustomRangesContext = createContext();

const CustomRanges = (props) => {
  // All Ranges
  const [customRanges, setCustomRanges] = useState({});

  const getCustomRanges = async (userid) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/user/${userid}/ranges`,
        { method: "GET" }
      );
      const parseRes = await response.json();  
      const orderedRanges = reorderAllRanges(parseRes);
      setCustomRanges(orderedRanges);
      return true;
    } catch (error) {}
    return false;
  };

  // Certain range
  const getCustomRange = async (userid, category) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/user/${userid}/range/${category}`,
        { method: "GET" }
      );
      const parseRes = await response.json();
      setNewRange(parseRes, category)
    } catch (error) {}
  }

  const insertEntry = async (userId, category, body) => {
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
        // returns message instead of throwing toast, because when this is done during Add New Coffee Bean is in process, we don't want this toast pop up.
        return {
          error: {
            message: message
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
        setNewRange(parseRes, category);
        return true;
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    return false;
  }

  const editEntry = async (userId, category, entryId, body) => {
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
        setNewRange(parseRes, category);
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

  const deleteEntry = async (userId, category, entryId) => {
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
        setNewRange(parseRes, category);
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

  const setNewRange = (newRange, category) => {
    const rangeName = category + "_range";
    const orderedRange = reorderRange(newRange)
    let orderedRanges = customRanges;
    orderedRanges[rangeName] = orderedRange;
    setCustomRanges(orderedRanges);
  }
  
  return (
    <CustomRangesContext.Provider value={{customRanges, getCustomRanges, getCustomRange, insertEntry, editEntry, deleteEntry }}>
      {props.children}
    </CustomRangesContext.Provider>
  )
}

const compareNames = ( a, b ) => {
  if ( a[1]['label'] < b[1]['label'] ){
    return -1;
  }
  if ( a[1]['label'] > b[1]['label'] ){
    return 1;
  }
  return 0;
}

const reorderAllRanges = (ranges) => {
  const orderedRanges = {};
  Object.entries(ranges).map(range => {
    const orderedRange = Object.entries(range[1]['range']).sort(compareNames).reduce(
      (obj, [key, value]) => {
        value['value'] = key; // ID is named as value to enable react-multi-select-component correctly
        obj['id-' + key] = value; // without 'id-' the object is sorted automatially by the id
        return obj;
      }, 
      {}
    );
    orderedRanges[range[0]] = orderedRange;
  });
  return orderedRanges;
}

const reorderRange = (range) => {
  const orderedRange = Object.entries(range).sort(compareNames).reduce(
    (obj, [key, value]) => {
      value['value'] = key; // ID is named as value to enable react-multi-select-component correctly
      obj['id-' + key] = value; // without 'id-' the object is sorted automatially by the id
      return obj;
    }, 
    {}
  );
  return orderedRange;
}

export default CustomRanges
