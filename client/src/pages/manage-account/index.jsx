import { BsCheckCircleFill, BsPlus } from 'react-icons/bs';
import React from 'react';
import imgFace from '../../assets/images/face.jpg'


const ManageAccount = () => {
  return (
    <div className="flex justify-center my-2">
      <div className="py-5 px-3">
        <div className="bg-white shadow-sm rounded w-full max-w-lg mx-auto py-6 p-10 mb-6">
          <h3 className="text-xl font-medium pb-6">Account Details</h3>
          <div className="relative h-40 w-40 mx-auto mb-8">
            <div className="flex-shrink-0">
              <img src={imgFace} className="h-full w-full rounded-full"/>
            </div>
            <button className="absolute right-3 bottom-1">
              <BsPlus className="w-8 h-8 bg-orange rounded-full p-1 text-white"/>
            </button>
          </div>
          <ul className="pt-4">
            <li key="name" className="flex pb-4">
              <div className="w-48">Nickname: </div>
              <div>Maiko</div>
              <div className="ml-6">
                <button>Edit</button>
              </div>
            </li>
            <li key="email" className="flex pb-4">
              <div className="w-48">Email Address: </div>
              <div>myzkmik19922@gmail.com</div>
              <div className="ml-6">
                <button>Edit</button>
              </div>
            </li>
            <li key="password" className="flex pb-4">
              <div className="w-48">Password: </div>
              <div>***********</div>
              <div className="ml-6">
                <button>Edit</button>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white shadow-sm rounded w-full max-w-lg mx-auto py-6 p-10 mb-6">
          <h3 className="text-xl font-medium pb-6">Cofee / Recipe Units</h3>
          <div className="flex justify-between">
            <ul>
              <li key="name" className="flex pb-4">
                <div className="w-48">Unit of solid: </div>
                <div>gram</div>
                <div className="ml-6">
                  <button>Edit</button>
                </div>
              </li>
              <li key="email" className="flex pb-4">
                <div className="w-48">Unit of liquid: </div>
                <div>litle</div>
                <div className="ml-6">
                  <button>Edit</button>
                </div>
              </li>
              <li key="password" className="flex pb-4">
                <div className="w-48">Water Temperature: </div>
                <div>celcius</div>
                <div className="ml-6">
                  <button>Edit</button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded w-full max-w-lg mx-auto py-6 p-10 mb-6">
          <h3 className="text-xl font-medium pb-6">Plan</h3>
          <div className="flex justify-between">
            <ul>
              <li key="name" className="flex pb-4">
                <div className="w-48">Premium Plan</div>
                <div className="ml-6">
                  <button>Change</button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded w-full max-w-lg mx-auto py-6 p-10 mb-6">
          <div className="flex justify-between">
            <div>
              <button>Delete Account</button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5 px-3">
        <div className="bg-white shadow-sm rounded w-full max-w-lg mx-auto py-6 p-10 mb-6">

            <h3 className="text-xl text-center font-medium pb-6">Upgrade to Premium</h3>
            <div className="flex justify-between">
              <ul>
                <li key="pro-1" className="flex pb-4">
                  <div className="flex">
                    <BsCheckCircleFill className="w-5 h-5 mr-3 text-green"/>
                    Store up to <span className="font-medium px-2">400</span> coffee beans data
                  </div>
                </li>
                <li key="pro-2" className="flex pb-4">
                  <div className="flex">
                    <BsCheckCircleFill className="w-5 h-5 mr-3 text-green"/>
                    Store up to <span className="font-medium px-2">100</span> recipes per bean
                  </div>
                </li>
                <li key="pro-3" className="flex pb-4">
                  <div className="flex">
                    <BsCheckCircleFill className="w-5 h-5 mr-3 text-green"/>
                    Compare Recipes functionality
                  </div>
                </li>
                <li key="pro-3" className="flex pb-4">
                  <div className="flex">
                    <BsCheckCircleFill className="w-5 h-5 mr-3 text-green"/>
                    Export data as PDF
                  </div>
                </li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ManageAccount