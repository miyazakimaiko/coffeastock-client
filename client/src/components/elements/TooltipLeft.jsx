import React, { useState, useEffect } from 'react'

const TooltipLeft = ({ children, category, itemId, tooltipText }) => {
  const childrenDivId = `tooltip-${category}-${itemId}`;
  const tipRef = React.createRef(null);
  const [boxPositionLeft, setBoxPositionLeft] = useState("-215px");

  const handleMouseEnter = () => {
    tipRef.current.style.opacity = "0.8";
    tipRef.current.style.visibility = "visible";
  }
  const handleMouseLeave = () => {
      tipRef.current.style.opacity = 0;
      tipRef.current.style.visibility = "hidden";
  }

  useEffect(() => {
    const childrenWidth = document.getElementById(childrenDivId).offsetWidth;
    if (childrenWidth > 225) {
      setBoxPositionLeft("-60px")
    }
  }, []);

  return (
      <div
        className="flex items-center cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div className="relative">
          {children}
          <div
            className="absolute bg-black text-white flex w-auto opacity-0 p-4 rounded-md items-center transition-all duration-300 z-50"
            style={{ left: boxPositionLeft, top: "-19px", width: "200px", visibility: "hidden" }}
            ref={tipRef}>
            <div
              className="bg-black h-3 w-3 absolute"
              style={{ right: "-6px", top: "22px", transform: "rotate(45deg)" }}
            />
            <div className="text-sm">
              {tooltipText}
            </div>
          </div>
        </div>
      </div>
  );
}

export default TooltipLeft