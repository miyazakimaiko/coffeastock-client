export default function extractRecipeNoFromRecipeId(recipeId) {
  if (!Boolean(recipeId)) return null;
  return recipeId.slice(recipeId.lastIndexOf('-') + 1);
}