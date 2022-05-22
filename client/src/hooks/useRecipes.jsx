import { useQuery } from 'react-query'
import * as api from '../api/Recipes'

export default function useRecipes(userid, beanid) {

  return useQuery(
    ['bean', beanid, 'recipes'], 
    async () => await api.getRecipes(userid, beanid),
    {
      enabled: Boolean(userid, beanid),
    }
  )
}