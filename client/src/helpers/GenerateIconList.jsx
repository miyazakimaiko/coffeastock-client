import StarFullIcon from "../assets/svgs/StarFullIcon";
import StarHalfIcon from "../assets/svgs/StarHalfIcon";
import FireFullIcon from "../assets/svgs/FireFullIcon";
import FireHalfIcon from "../assets/svgs/FireHalfIcon";

export const generateStarIconList = (number) => {
  const result = []
  const rounded = Math.ceil(number/10)/2;
  for (let i = 1; i <= rounded; i ++) {
    result.push(<StarFullIcon/>)
  }
  if (rounded % 1 !== 0) {
    result.push(<StarHalfIcon />)
  }
  return result;
}

export const generateFireIconList = (number) => {
  const result = []
  const rounded = Math.ceil(number/10)/2;
  for (let i = 1; i <= rounded; i ++) {
    result.push(<FireFullIcon/>)
  }
  if (rounded % 1 !== 0) {
    result.push(<FireHalfIcon />)
  }
  return result;
}