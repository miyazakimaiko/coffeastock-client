import axios from './CustomAxios'

export const getRecipes = async (userid, beanid, token) => {
  return await axios.get(`/user/${userid}/bean/${beanid}/recipes`, { headers: { accesstoken: token } }).then(res => res.data)
}

export const getRecipe = async (userid, beanid, recipeNo, token) => {
  return await axios.get(`/user/${userid}/bean/${beanid}/recipe/${recipeNo}`, { headers: { accesstoken: token } }).then(res => res.data)
}

export const getRecipesSummary = async (userid, token) => {
  return await axios.get(`/user/${userid}/recipes-summary`, { headers: { accesstoken: token } }).then(res => res.data)
}

export const addRecipe = async (userid, beanid, body, token) => {
  return await axios.post(`/user/${userid}/bean/${beanid}/recipe`, body, { headers: { accesstoken: token } }).then(res => res.data)
}
export const editRecipe = async (userid, body, token) => {
  return await axios.post(`/user/${userid}/bean/${body.bean_id}/recipe/${body.recipe_no}`, body, { headers: { accesstoken: token } }).then(res => res.data)
}

export const deleteRecipe = async (userid, beanid, body, token) => {
  return await axios.post(`/user/${userid}/bean/${beanid}/recipe/delete/${body.recipe_no}`, body, { headers: { accesstoken: token } }).then(res => res.data)
}