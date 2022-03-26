import React, { useState, useContext } from 'react';
import { createContext } from 'react';
import { toast } from 'react-toastify';

const RecipeContext = createContext();

const RecipeProvider = (props) => {
  const [recipeList, innerSetRecipeList] = useState({});

  const fetchRecipeList = async (userid, beanid = null) => {
    if (beanid) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/user/${userid}/bean/${beanid}/recipes`,
          { method: "GET" }
        );
        const parseRes = await response.json();  
        setRecipeList(parseRes);
      } catch (error) {}
    } else {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/user/${userid}/recipes`,
          { method: "GET" }
        );
        const parseRes = await response.json();  
        setRecipeList(parseRes);
      }
      catch (error) {}
    }
    return recipeList;
  };

  const setRecipeList = (recipe) => {
    const recipeObj = {};
    recipe.forEach(element => {
      recipeObj[element['recipe_id']] = element;
    });
    innerSetRecipeList(recipeObj);
  }

  const insertRecipe = async (userid, beanid, body) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/user/${userid}/bean/${beanid}/recipe`,
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
        fetchRecipeList(userid);
        toast.success("New recipe is added successfully.", {
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

  const updateRecipe = async (userid, beanid, recipeid, body) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/user/${userid}/bean/${beanid}/recipe/${recipeid}`,
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
        fetchRecipeList(userid);
        toast.success("Recipe is edited successfully.", {
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

  const deleteRecipe = async (userid, beanid, recipeid) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/user/${userid}/bean/${beanid}/recipe/${recipeid}`,
        { method: "DELETE" }
      );
      const parseRes = await response.json();
      if (response.status !== 200) {
        toast.error(
          parseRes.error.message ? parseRes.error.message : response.statusText, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
      else {
        fetchRecipeList(userid);
        toast.success("Recipe is deleted successfully.", {
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
    <RecipeContext.Provider value={{recipeList, fetchRecipeList, setRecipeList, insertRecipe, updateRecipe, deleteRecipe}}>
    {props.children}
    </RecipeContext.Provider>
  );
};

function useRecipeList() {
  const context = useContext(RecipeContext)
  if (!context) {
    throw new Error('useRecipeList must be used within a RecipeProvider')
  }
  return context.recipeList
}

function useFetchRecipeList() {
  const context = useContext(RecipeContext)
  if (!context) {
    throw new Error('useFetchRecipeList must be used within a RecipeProvider')
  }
  return context.fetchRecipeList
}

function useSetBeanList() {
  const context = useContext(RecipeContext)
  if (!context) {
    throw new Error('useSetBeanList must be used within a RecipeProvider')
  }
  return context.setRecipeList
}

function useInsertRecipe() {
  const context = useContext(RecipeContext)
  if (!context) {
    throw new Error('useInsertRecipe must be used within a RecipeProvider')
  }
  return context.insertRecipe
}

function useUpdateRecipe() {
  const context = useContext(RecipeContext)
  if (!context) {
    throw new Error('useUpdateRecipe must be used within a RecipeProvider')
  }
  return context.updateRecipe
}

function useDeleteRecipe() {
  const context = useContext(RecipeContext)
  if (!context) {
    throw new Error('useDeRecipeBean must be used within a RecipeProvider')
  }
  return context.deleteRecipe
}

export { RecipeProvider, useRecipeList, useFetchRecipeList, useSetBeanList, useInsertRecipe, useUpdateRecipe, useDeleteRecipe }
