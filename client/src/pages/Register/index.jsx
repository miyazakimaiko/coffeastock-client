import { BookOpenIcon, GlobeIcon, LightBulbIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import CoffeeBag from '../../svgs/CoffeeBag'
import UserPool from '../../utils/UserPool'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

const Register = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    const attributes = [];
    const nicknameData = {
      Name: 'nickname',
      Value: nickname
    }

    attributes.push(new CognitoUserAttribute(nicknameData));

    UserPool.signUp(email, password, attributes, null, (err, data) => {
      if (err) {
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
      toast.success("Registered successfully!")
      console.log(data);
    });
  };

  // const onSubmitForm = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(
  //       "http://localhost:4000/api/v1/registration",
  //       {
  //         method: "POST",
  //         headers: {
  //           'Content-Type': "application/json"
  //         },
  //         body: JSON.stringify({
  //           "username": username,
  //           "email": email,
  //           "password": password,
  //           "origin_range": {
  //             3 : {
  //               "name": "Yirgacheffe, Ethiopia",
  //               "def": "Location details here..."
  //             },
  //             2: {
  //               "name": "Sidamo, Ethiopia",
  //               "def": "Location details here..."
  //             },
  //             5: {
  //               "name": "Kaffa, Ethiopia",
  //               "def": "Location details here..."
  //             },
  //             4: {
  //               "name": "Ruiri, Kenya",
  //               "def": "Location details here..."
  //             },
  //             1: {
  //               "name": "Thika, Kenya",
  //               "def": "Location details here..."
  //             }
  //           },
  //           "farm_range": {
  //             3 : {
  //               "name": "Farm 1",
  //               "def": "details..."
  //             },
  //             2: {
  //               "name": "Farm 2",
  //               "def": "details..."
  //             },
  //             1: {
  //               "name": "Farm 3",
  //               "def": "details..."
  //             } 
  //           },
  //           "variety_range": {
  //             1 : {
  //               "name": "Typica",
  //               "def": "Details what typica is..."
  //             },
  //             3: {
  //               "name": "Caturra",
  //               "def": "Details what caturra is..."
  //             },
  //             2: {
  //               "name": "Burbon",
  //               "def": "Details what Burbon is..."
  //             } 
  //           },
  //           "process_range": {
  //             1 : {
  //               "name": "Washed",
  //               "def": "Details what washed is..."
  //             },
  //             2: {
  //               "name": "Semi-Washed",
  //               "def": "Details what semi-washed is..."
  //             },
  //             3: {
  //               "name": "Natural",
  //               "def": "Details what natural is..."
  //             }
  //           },
  //           "roaster_range": {
  //             3 : {
  //               "name": "Coffeeangel",
  //               "def": "Definition of Coffeeangel..."
  //             },
  //             1: {
  //               "name": "Coffee Collective",
  //               "def": "Coffee Collective definition..."
  //             },
  //             2: {
  //               "name": "Koppi",
  //               "def": "Koppi details..."
  //             }
  //           },
  //           "method_range": {
  //             1 : {
  //               "name": "French Press",
  //               "def": "details..."
  //             },
  //             3: {
  //               "name": "Espresso",
  //               "def": "details..."
  //             },
  //             2: {
  //               "name": "Mocha Pot",
  //               "def": "details..."
  //             }
  //           },
  //           "water_range": {
  //             2 : {
  //               "name": "Water 1",
  //               "def": "details..."
  //             },
  //             1: {
  //               "name": "Water 2",
  //               "def": "details..."
  //             }
  //           },
  //           "grinder_range": {
  //             2 : {
  //               "name": "Hario Mini Handmill",
  //               "def": "details..."
  //             },
  //             3: {
  //               "name": "EKS",
  //               "def": "details..."
  //             },
  //             1: {
  //               "name": "Sage espresso grinder",
  //               "def": "details..."
  //             }
  //           },
  //           "palate_range": {
  //             5 : {
  //               "name": "sweet",
  //               "def": "details..."
  //             },
  //             2: {
  //               "name": "acidic",
  //               "def": "details..."
  //             },
  //             4: {
  //               "name": "cherries",
  //               "def": "details..."
  //             },
  //             1 : {
  //               "name": "stonefruit",
  //               "def": "details..."
  //             },
  //             6: {
  //               "name": "citrus fruit",
  //               "def": "details..."
  //             },
  //             3: {
  //               "name": "chocolate",
  //               "def": "details..."
  //             }
  //           },
  //           "aroma_range": {
  //             4 : {
  //               "name": "Walnut",
  //               "def": "details..."
  //             },
  //             2: {
  //               "name": "Peach",
  //               "def": "details..."
  //             },
  //             1: {
  //               "name": "Pineapple",
  //               "def": "details..."
  //             },
  //             3 : {
  //               "name": "Green apple",
  //               "def": "details..."
  //             }
  //           }
  //         })
  //       }
  //     );
  //     const parseRes = await response.json()

  //     if (parseRes.token) {
  //       localStorage.setItem("token", parseRes.token);
  //       setAuth(true);
  //       toast.success("Registered successfully!")
  //     }
  //     else toast.error(parseRes, {
  //       position: toast.POSITION.TOP_CENTER
  //     });

  //   } catch (error) {
  //     toast.error(error.message, {
  //       position: toast.POSITION.TOP_CENTER
  //     });
  //   }
  // }

  return (
    <div className="h-full bg-white">
      <header className="
        h-24 w-full max-w-screen-xl mx-auto px-3
        flex items-center justify-between"
      >
        <Link to="/register" className="text-2xl w-8 h-8">
          <CoffeeBag />
        </Link>
        <Link to="/login">
          <div className="px-8 py-2 rounded-3xl sinenna-button-transition">Login</div>
        </Link>
      </header>

      <div className="">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-3">Coffee Journal</h1>
          <h2 className="text-xl">Collect, Analyse and Improve Your Coffee Records In One Place.</h2>
        </div>

        <div className="flex flex-wrap items-center m-auto pt-14 max-w-screen-lg">
          <div className="p-6 w-1/2">
            <div className="pb-4">
              <div className="flex items-center mb-2">
                <BookOpenIcon className="w-10 h-10 mr-3 text-blue" />
                <h3 className="text-lg font-semibold">Free Account</h3>
              </div>
              <p>Here you can write a feature description for your dashboard, let the users know what is the value that you give them.</p>
            </div>
            <div className="pb-4">
              <div className="flex items-center mb-2">
                <GlobeIcon className="w-10 h-10 mr-3 text-green" />
                <h3 className="text-lg font-semibold">Access From Anywhere</h3>
              </div>
              <p>Here you can write a feature description for your dashboard, let the users know what is the value that you give them.</p>
            </div>
            <div className="pb-4">
              <div className="flex items-center mb-2">
                <LightBulbIcon className="w-10 h-10 mr-3 text-yellow" />
                <h3 className="text-lg font-semibold">Other Features</h3>
              </div>
              <p>Here you can write a feature description for your dashboard, let the users know what is the value that you give them.</p>
            </div>
          </div>
          <div className="w-1/2">
            <form
              method="#"
              action="#"
              onSubmit={onSubmit}
            >
              <div className="bg-white p-6">
                <div className="card-content">
                  <div className="pb-4">
                    <input type="text" placeholder="Nickname" name="nickname" className="orange-outline-transition bg-creme block w-full text-base py-2 px-3 rounded-md"
                      value={nickname}
                      onChange={e => setNickname(e.target.value)}
                    />
                  </div>
                  <div className="pb-4">
                    <input type="email" placeholder="Email" name="email" className="orange-outline-transition transition-all bg-creme block w-full text-base py-2 px-3 rounded-md"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="pb-4">
                    <input type="password" placeholder="Password" name="password" className="orange-outline-transition transition-all bg-creme block w-full text-base py-2 px-3 rounded-md"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="pb-4">
                    <input type="password" placeholder="Password Confirmation" className="orange-outline-transition transition-all bg-creme block w-full text-base py-2 px-3 rounded-md" />
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="bg-orange button-transition shadow-sm rounded-3xl pl-6 pr-8 py-2 my-2 mx-auto text-white text-base flex">
                    <span className="ml-1">Create Free Account</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
