import axios from './CustomAxios'

export const getRecipes = async (userid, beanid) => await axios.get(`/user/${userid}/bean/${beanid}/recipes`).then(res => res.data)

export const getRecipe = async (userid, beanid, recipeNo) => await axios.get(`/user/${userid}/bean/${beanid}/recipe/${recipeNo}`).then(res => res.data)

export const addRecipe = async (userid, beanid, body) => await axios.post(`/user/${userid}/bean/${beanid}/recipe`, body).then(res => res.data)

export const editRecipe = async (userid, body) => await axios.post(`/user/${userid}/bean/${body.bean_id}/recipe/${body.recipe_no}`, body).then(res => res.data)

export const deleteRecipe = async (userid, beanid, body) => await axios.post(`/user/${userid}/bean/${beanid}/recipe/delete/${body.recipe_no}`, body).then(res => res.data)