import { toast } from 'react-toastify';

const MODE = {
  SUCCESS: 'success',
  ERROR: 'error'
}

export default function toastOnBottomCenter(mode, message) {
  switch(mode) {
    case MODE.SUCCESS:
      return toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
      })
    case MODE.ERROR:
      return toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
      })
    default:
      return toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
      })
  }
}