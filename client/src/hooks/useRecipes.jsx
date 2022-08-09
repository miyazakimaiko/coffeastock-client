import { useQuery } from 'react-query'
import * as apiRecipes from '../api/Recipes'

export default function useRecipes(userid, beanid) {

  return useQuery(
    ['bean', beanid, 'recipes'], 
    () => apiRecipes.getRecipes(userid, beanid),
    {
      enabled: Boolean(userid, beanid),
    }
  );
}