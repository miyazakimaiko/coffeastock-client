import React from 'react'

const TooltipBottomLeft = ({ children, tooltipText }) => {
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
            className="absolute bg-black text-white flex w-auto opacity-0 p-4 rounded-md items-center transition-all duration-300 z-50"
            style={{ right: "-10px", top: "33px", width: "200px", visibility: "hidden" }}
            ref={tipRef}>
            <div
              className="bg-black h-3 w-3 absolute"
              style={{ right: "15px", top: "-6px", transform: "rotate(45deg)" }}
            />
            <div>
              {tooltipText}
            </div>
          </div>
        </div>
      </div>
  );
}

export default TooltipBottomLeft