import { HiOutlineChevronDown } from 'react-icons/hi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import React, { createRef, useState, useEffect } from 'react'

const Dropdown = ({ children, type = 'chevron', dropdownText }) => {
  const wrapperRef = createRef(null);
  const tipRef = createRef(null);
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    if (open) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  const handleClickOutside = e => {
    if (wrapperRef.current?.contains(e.target)) {
      return;
    }
    closeDropdown();
  }

  const closeDropdown = async () => {
    if (tipRef.current) {
      tipRef.current.style.visibility = "hidden";
      tipRef.current.style.opacity = 0;
      tipRef.current.style.marginTop = "10px";
      setOpen(false);
    }
  }

  const openDropdown = () => {
    if (tipRef.current) {
      tipRef.current.style.visibility = "visible";
      tipRef.current.style.opacity = 1;
      tipRef.current.style.marginTop = "20px";
      setOpen(true);
    }
  }

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative flex items-center justify-end"
      onClick={toggleOpen}>
      <div
        className="absolute shadow-md bg-white border border-gray-100
        py-2 rounded flex items-center 
        ease-linear transition-all duration-200 z-50"
        style={{ top: "15px", right: -10, opacity: 0, minWidth: "150px", visibility: "hidden" }}
        ref={tipRef}>
        <div
          className="bg-white h-3 w-3 absolute border-t border-l border-gray-100"
          style={{ top: "-6px", right: 16, transform: "rotate(45deg)" }}
        />
        {children}
      </div>
      <div className="flex items-center cursor-pointer py-2">
        {dropdownText}
        {type === 'chevron' ? <HiOutlineChevronDown className="h-4 w-4 ml-2"/> :
        type === 'dot' ? <BsThreeDotsVertical className="h-5 w-5 ml-2"/> : null}
      </div>
    </div>
  );
}

export default Dropdown