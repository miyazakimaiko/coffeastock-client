import { useQuery } from 'react-query'
import * as apiRecipes from '../api/Recipes'
import * as apiRanges from '../api/Ranges'

export default function useRecipes(userid, beanid) {
  const rangeNames = ["method", "grinder", "water"];

  return useQuery(
    ['bean', beanid, 'recipes'], 
    async () => {
      const ranges = await apiRanges.getRanges(userid);
      const recipes = await apiRecipes.getRecipes(userid, beanid);

      recipes.forEach(recipe => {        
        for(const rangeName of rangeNames) {
          if (recipe[rangeName]?.length > 0) {
            const rangeListWithValues = recipe[rangeName].map(id => (
              ranges[`${rangeName}_range`][`id-${id}`]
            ))
            recipe[rangeName] = rangeListWithValues;
          }
        }
        if (Object.keys(recipe.palate_rates).length > 0) {
          const palateRatesWithValues = Object.keys(recipe.palate_rates).map(id => {
            const palate = ranges.palate_range[`id-${id}`];
            palate.rate = recipe.palate_rates[id];
            return palate;
          })
          recipe.palate_rates = palateRatesWithValues;
        }
      });


      return recipes;
    },
    {
      enabled: Boolean(userid, beanid),
    }
  );
}