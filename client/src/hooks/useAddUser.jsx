import { useMutation } from 'react-query'
import * as api from '../api/Users'

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
      "nextId": 7,
      "items": {
        "5" : {
          "label": "sweetness",
          "def": "",
          "inUse": 0
        },
        "2": {
          "label": "aclabelic",
          "def": "details...",
          "inUse": 0
        },
        "4": {
          "label": "cherries",
          "def": "details...",
          "inUse": 0
        },
        "1" : {
          "label": "stonefruit",
          "def": "details...",
          "inUse": 0
        },
        "6": {
          "label": "citrus fruit",
          "def": "details...",
          "inUse": 0
        },
        "3": {
          "label": "chocolate",
          "def": "details...",
          "inUse": 0
        }
      }
    },
    "aroma_range": {
      "nextId": 1,
      "items": {
      }
    }
  }
  return useMutation(
    async (userid) => await api.addUser(userid, body)
  )
}