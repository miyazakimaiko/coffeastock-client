import { useMutation } from 'react-query'
import * as api from '../api/Users'
import toastOnBottomCenter from '../utils/customToast'

export default function useAddUser() {
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
  return useMutation(
    async (userid) => await api.addUser(userid, body),
    {
      onSuccess: () => toastOnBottomCenter('success', 'Your account is created successfully!'),
      onError: error => toastOnBottomCenter('error', error.message)
    }
  )
}