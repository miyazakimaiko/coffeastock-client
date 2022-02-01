import React from 'react'

const CoffeeBagLeft = ({name}) => {

  return (
    <div className="relative">
    <div 
      className="
        absolute top-20 bottom-6 left-4 right-14
        transform skew-y-6 skew-x-3
        font-bold
      "
    >
      <div className="h-full w-full text-xs flex items-center justify-center text-center uppercase">{name}</div>
    </div>
    <svg className="m-auto" width="100%" height="100%" viewBox="0 0 174 231" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27 33.9706H148L154 74.7353L169 127.956V173.25V207.787L145 231L2 173.25V123.426L16 74.7353L27 33.9706Z" fill="#DCB38B"/>
      <path d="M31 33.9706H152L158 74.7353L174 127.956V177.213L169.5 207.221H155L145 228.735L6 173.25V123.426L20 74.7353L31 33.9706Z" fill="#CEA782"/>
      <path d="M31 33.9706H152V74.7353L148.5 123.426V163.059L156 187.404V207.787L145 228.735L6 173.25V123.426L20 74.7353L31 33.9706Z" fill="#C19B76"/>
      <path d="M22.5 28.3088L152 33.9706L145 74.7353L129 123.426V184.574L145 231L11.5 209.485L0 172.684V108.706L15.5 63.4118L22.5 28.3088Z" fill="#D2A67C"/>
      <path d="M28.2044 0.962989L151 4.5294L153.704 18.0815L152 33.9344L31.0073 28.4392L28.2044 13.0525V0.962989Z" fill="#977554"/>
      <path d="M28.2044 0.962989L151 4.5294L153.704 18.0815L152 33.9344L31.0073 28.4392L28.2044 13.0525V0.962989Z" fill="#977554"/>
      <path d="M21.5 0L151 4.52941L148.5 19.25L152 33.9706L22.5 28.3088L20 14.7206L21.5 0Z" fill="#C49970"/>
      <path d="M21.5 0L151 4.52941L148.5 19.25L152 33.9706L22.5 28.3088L20 14.7206L21.5 0Z" fill="#C49970"/>
      <path d="M21.5 79.5L122 90.5L117.036 121V179.078L125 215L24.4489 197.167L13 165.209V110L21.5 79.5Z" fill="#FBF8F0"/>
    </svg>
    </div>
  )
}

export default CoffeeBagLeft
