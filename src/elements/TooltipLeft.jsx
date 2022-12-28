import React from 'react'

const TooltipLeft = ({ children, tooltipText }) => {
  const tipRef = React.createRef(null);

  const handleMouseEnter = () => {
    tipRef.current.style.opacity = "0.8";
    tipRef.current.style.visibility = "visible";
  }
  const handleMouseLeave = () => {
      tipRef.current.style.opacity = 0;
      tipRef.current.style.visibility = "hidden";
  }

  return (
      <div
        className="flex items-center cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div className="relative">
          {children}
          <div
            className="absolute bg-black text-white flex opacity-0 p-4 w-max max-w-xs md:max-w-sm rounded-md items-center transition-all duration-300 z-50"
            style={{ right: '-20px', bottom: "30px", visibility: "hidden" }}
            ref={tipRef}>
            <div
              className="bg-black h-3 w-3 absolute"
              style={{ right: "23px", bottom: "-5px", transform: "rotate(45deg)" }}
            />
            <div>
              {tooltipText}
            </div>
          </div>
        </div>
      </div>
  );
}

export default TooltipLeft