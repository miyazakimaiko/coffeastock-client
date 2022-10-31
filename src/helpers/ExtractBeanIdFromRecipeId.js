export default function extractBeanIdFromRecipeId(recipeId) {
  if (!Boolean(recipeId)) return null;
  return recipeId.slice(0, recipeId.lastIndexOf('-'));
}