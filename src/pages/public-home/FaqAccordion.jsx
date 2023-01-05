import React, { useState, useEffect } from 'react';
import { AiOutlineRight } from 'react-icons/ai';

const FaqAccordion = ({title, textContent}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState("0px");
  
  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if(isOpen) {
      setContentHeight("400px");
    }
    else setContentHeight("0px");
  }, [isOpen])
  

  return (
    <section className="py-6">
      <div 
        className="flex items-center px-4 md:px-8 cursor-pointer"
        onClick={toggleOpen}
      >
        <AiOutlineRight
          className="h-5 w-5 transition-all duration-400"
          style={isOpen ? {transform: "rotate(90deg)"} : {transform: "rotate(0deg)"}}
        />
        <h3 className="ml-4 text-base md:text-xl">{title}</h3>
      </div>
      <div 
        className="px-8 text-base overflow-hidden transition-all duration-400"
        style={{maxHeight: contentHeight}}
      >
        <div className="pt-6">
          <p>{textContent}</p>
        </div>
      </div>
    </section>
  )
}

export default FaqAccordion