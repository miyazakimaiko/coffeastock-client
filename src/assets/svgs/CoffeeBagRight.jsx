import React from 'react'
import { unescapeHtml } from '../../helpers/HtmlConverter'

const CoffeeBagRight = ({name}) => {
  const unescapedName = unescapeHtml(name)
  return (
    <div className="relative coffee-bag">
      <svg className="m-auto" width="100%" height="100%" viewBox="0 0 174 231" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M147 33.9706H26L20 74.7353L5 127.956V173.25V207.787L29 231L172 173.25V123.426L158 74.7353L147 33.9706Z" fill="#DCB38B"/>
        <path d="M143 33.9706H22L16 74.7353L0 127.956V177.213L4.5 207.221H19L29 228.735L168 173.25V123.426L154 74.7353L143 33.9706Z" fill="#CEA782"/>
        <path d="M143 33.9706H22V74.7353L25.5 123.426V163.059L18 187.404V207.787L29 228.735L168 173.25V123.426L154 74.7353L143 33.9706Z" fill="#C19B76"/>
        <path d="M151.5 28.3088L22 33.9706L29 74.7353L45 123.426V184.574L29 231L162.5 209.485L174 172.684V108.706L158.5 63.4118L151.5 28.3088Z" fill="#D2A67C"/>
        <path d="M145.796 0.962997L23 4.52941L20.2956 18.0815L22 33.9345L142.993 28.4392L145.796 13.0525V0.962997Z" fill="#977554"/>
        <path d="M145.796 0.962997L23 4.52941L20.2956 18.0815L22 33.9345L142.993 28.4392L145.796 13.0525V0.962997Z" fill="#977554"/>
        <path d="M152.5 0L23 4.52941L25.5 19.25L22 33.9706L151.5 28.3088L154 14.7206L152.5 0Z" fill="#C49970"/>
        <path d="M152.5 0L23 4.52941L25.5 19.25L22 33.9706L151.5 28.3088L154 14.7206L152.5 0Z" fill="#C49970"/>
        <path d="M152.5 79.5L52 90.5L56.9644 121V179.078L49 215L149.551 197.167L161 165.209V110L152.5 79.5Z" fill="#FBF8F0"/>
      </svg>
      <div className="absolute top-[37%] bottom-6 left-[34%] right-4 transform -skew-y-6 -skew-x-2 font-semibold">
        <div className="h-full w-full flex items-center justify-center text-center">
            <span>
            {unescapedName.length < 40
              ? `${unescapedName}`
              : `${unescapedName.substring(0, 32)}...`
            }
            </span>
        </div>
      </div>
    </div>
  )
}

export default CoffeeBagRight
