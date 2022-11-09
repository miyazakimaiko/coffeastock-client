import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import toastOnBottomCenter from '../utils/customToast';
import { useSignout, useUserData } from '../context/AccountContext';
import * as api from '../api/RssFeed'

export default function useRssFeed() {
  const user = useUserData();
  const queryClient = useQueryClient();
  const signout = useSignout();
  const navigate = useNavigate();

  return useQuery(
    ['rss-feed'],
    async () => await api.getRssFeed(user.accessToken.jwtToken), 
    {
      enabled: !!user,
      initialData: () => { 
        return queryClient.getQueryData('rss-feed');
      },
      onError: err => {
        if (err.message === 'Not authorized') {
          signout();
          navigate('/login', { replace: true } );
        }
        else toastOnBottomCenter('error', err.message ? err.message : 'An unknown error has ocurred.');
      },
      initialStale: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  )
}