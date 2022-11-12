import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN, TO_SERVER_ERROR } from '../utils/Paths';
import toastOnBottomCenter from '../utils/customToast'
import { useSignout } from '../context/AccountContext'
import * as api from '../api/Users'

export default function useAddUser() {
  const signout = useSignout();
  const navigate = useNavigate();

  return useMutation(
    async (user) => await api.addUser(user.sub, body, user.accessToken.jwtToken),
    {
      onSuccess: () => toastOnBottomCenter('success', 'Welcome to Coffeeastock!'),
      onError: err => {
        if (err.message === 'Not authorized') {
          signout();
          navigate(TO_LOGIN, { replace: true } );
        }
        else if (err.message === 'Network Error') {
          navigate(TO_SERVER_ERROR, { replace: true } );
        }
        else toastOnBottomCenter('error', err.message ? err.message : 'An unknown error has ocurred.');
      }
    }
  )
}

const body = {
  "origin_range": {
    "nextId": 1,
    "items": {
    }
  },
  "farm_range": {
    "nextId": 1,
    "items": {
    }
  },
  "variety_range": {
    "nextId": 1,
    "items": {
    }
  },
  "process_range": {
    "nextId": 1,
    "items": {
    }
  },
  "roaster_range": {
    "nextId": 1,
    "items": {
    }
  },
  "method_range": {
    "nextId": 1,
      "items": {
    }
  },
  "water_range": {
    "nextId": 1,
    "items": {
    }
  },
  "grinder_range": {
    "nextId": 1,
    "items": {
    }
  },
  "palate_range": {
    "nextId": 1,
    "items": {
    }
  },
  "aroma_range": {
    "nextId": 1,
    "items": {
    }
  }
}