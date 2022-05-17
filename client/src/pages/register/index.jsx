import { BookOpenIcon, GlobeIcon, LightBulbIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CoffeeBagLeft from '../../assets/svgs/CoffeeBagLeft'
import UserPool from '../../utils/UserPool'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import toastOnBottomCenter from '../../utils/customToast'

const Register = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

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
        toastOnBottomCenter('error', err.message)
      } else {
        try {
          const userId = data.userSub;
          setDefaultAttributeRange(userId);
          navigate('/login', {replace: true})
          toastOnBottomCenter('success', 'Registered successfully!')
        } catch (error) {
          toastOnBottomCenter('error', error.message)
        }
      }
    });
  };

  const setDefaultAttributeRange = async (userid) => {
    try {
      await fetch(
        `http://localhost:4000/api/v1/user/${userid}`,
        {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({
            "origin_range": {
              "nextId": 6,
              "items": {
                "3" : {
                  "label": "Yirgacheffe, Ethiopia",
                  "def": "Location details here...",
                  "inUse": 0
                },
                "2": {
                  "label": "Sidamo, Ethiopia",
                  "def": "Location details here...",
                  "inUse": 0
                },
                "5": {
                  "label": "Kaffa, Ethiopia",
                  "def": "Location details here...",
                  "inUse": 0
                },
                "4": {
                  "label": "Ruiri, Kenya",
                  "def": "Location details here...",
                  "inUse": 0
                },
                "1": {
                  "label": "Thika, Kenya",
                  "def": "Location details here...",
                  "inUse": 0
                }
              }
            },
            "farm_range": {
              "nextId": 4,
              "items": {
                "3" : {
                  "label": "Farm 1",
                  "def": "details...",
                  "inUse": 0
                },
                "2": {
                  "label": "Farm 2",
                  "def": "details...",
                  "inUse": 0
                },
                "1": {
                  "label": "Farm 3",
                  "def": "details...",
                  "inUse": 0
                }
              }
            },
            "variety_range": {
              "nextId": 4,
              "items": {
                "1" : {
                  "label": "Typica",
                  "def": "Details what typica is...",
                  "inUse": 0
                },
                "3": {
                  "label": "Caturra",
                  "def": "Details what caturra is...",
                  "inUse": 0
                },
                "2": {
                  "label": "Burbon",
                  "def": "Details what Burbon is...",
                  "inUse": 0
                }
              }
            },
            "process_range": {
              "nextId": 4,
              "items": {
                "1" : {
                  "label": "Washed",
                  "def": "Details what washed is...",
                  "inUse": 0
                },
                "2": {
                  "label": "Semi-Washed",
                  "def": "Details what semi-washed is...",
                  "inUse": 0
                },
                "3": {
                  "label": "Natural",
                  "def": "Details what natural is...",
                  "inUse": 0
                }
              }
            },
            "roaster_range": {
              "nextId": 4,
              "items": {
                "3" : {
                  "label": "Coffeeangel",
                  "def": "Definition of Coffeeangel...",
                  "inUse": 0
                },
                "1": {
                  "label": "Coffee Collective",
                  "def": "Coffee Collective definition...",
                  "inUse": 0
                },
                "2": {
                  "label": "Koppi",
                  "def": "Koppi details...",
                  "inUse": 0
                }
              }
            },
            "method_range": {
              "nextId": 4,
                "items": {
                "1" : {
                  "label": "French Press",
                  "def": "details...",
                  "inUse": 0
                },
                "3": {
                  "label": "Espresso",
                  "def": "details...",
                  "inUse": 0
                },
                "2": {
                  "label": "Mocha Pot",
                  "def": "details...",
                  "inUse": 0
                }
              }
            },
            "water_range": {
              "nextId": 3,
              "items": {
                "2" : {
                  "label": "Water 1",
                  "def": "details...",
                  "inUse": 0
                },
                "1": {
                  "label": "Water 2",
                  "def": "details...",
                  "inUse": 0
                }
              }
            },
            "grinder_range": {
              "nextId": 4,
              "items": {
                "2" : {
                  "label": "Hario Mini Handmill",
                  "def": "details...",
                  "inUse": 0
                },
                "3": {
                  "label": "EKS",
                  "def": "details...",
                  "inUse": 0
                },
                "1": {
                  "label": "Sage espresso grinder",
                  "def": "details...",
                  "inUse": 0
                }
              }
            },
            "palate_range": {
              "nextId": 7,
              "items": {
                "5" : {
                  "label": "sweet",
                  "def": "details...",
                  "inUse": 0
                },
                "2": {
                  "label": "aclabelic",
                  "def": "details...",
                  "inUse": 0
                },
                "4": {
                  "label": "cherries",
                  "def": "details...",
                  "inUse": 0
                },
                "1" : {
                  "label": "stonefruit",
                  "def": "details...",
                  "inUse": 0
                },
                "6": {
                  "label": "citrus fruit",
                  "def": "details...",
                  "inUse": 0
                },
                "3": {
                  "label": "chocolate",
                  "def": "details...",
                  "inUse": 0
                }
              }
            },
            "aroma_range": {
              "nextId": 5,
              "items": {
                "4" : {
                  "label": "Walnut",
                  "def": "details...",
                  "inUse": 0
                },
                "2": {
                  "label": "Peach",
                  "def": "details...",
                  "inUse": 0
                },
                "1": {
                  "label": "Pineapple",
                  "def": "details...",
                  "inUse": 0
                },
                "3" : {
                  "label": "Green apple",
                  "def": "details..."
                }
              }
            }
          })
        }
      );

    } catch (error) {
      toastOnBottomCenter('error', error.message)
    }
  }

  return (
    <div className="h-full bg-white">
      <header className="
        h-24 w-full max-w-screen-xl mx-auto px-3
        flex items-center justify-between"
      >
        <Link to="/register" className="text-2xl w-8 h-8">
          <CoffeeBagLeft />
        </Link>
        <Link to="/login">
          <div className="px-8 py-2 rounded-3xl sinenna-button-transition">Login</div>
        </Link>
      </header>

      <div className="">
        <div className="text-center">
          <h1 className="text-4xl  mb-3">Coffee Journal</h1>
          <h2 className="text-xl">Collect, Analyse and Improve Your Coffee Records In One Place.</h2>
        </div>

        <div className="flex flex-wrap items-center m-auto pt-14 max-w-screen-lg">
          <div className="p-6 w-1/2">
            <div className="pb-4">
              <div className="flex items-center mb-2">
                <BookOpenIcon className="w-10 h-10 mr-3 text-blue" />
                <h3 className="text-lg font-medium">Free Account</h3>
              </div>
              <p>Here you can write a feature description for your dashboard, let the users know what is the value that you give them.</p>
            </div>
            <div className="pb-4">
              <div className="flex items-center mb-2">
                <GlobeIcon className="w-10 h-10 mr-3 text-green" />
                <h3 className="text-lg font-medium">Access From Anywhere</h3>
              </div>
              <p>Here you can write a feature description for your dashboard, let the users know what is the value that you give them.</p>
            </div>
            <div className="pb-4">
              <div className="flex items-center mb-2">
                <LightBulbIcon className="w-10 h-10 mr-3 text-yellow" />
                <h3 className="text-lg font-medium">Other Features</h3>
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
                    <input type="text" placeholder="Nickname" name="nickname" className="orange-outline-transition bg-creme block w-full py-2 px-3 rounded-md"
                      value={nickname}
                      onChange={e => setNickname(e.target.value)}
                    />
                  </div>
                  <div className="pb-4">
                    <input type="email" placeholder="Email" name="email" className="orange-outline-transition transition-all bg-creme block w-full py-2 px-3 rounded-md"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="pb-4">
                    <input type="password" placeholder="Password" name="password" className="orange-outline-transition transition-all bg-creme block w-full py-2 px-3 rounded-md"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="pb-4">
                    <input type="password" placeholder="Password Confirmation" className="orange-outline-transition transition-all bg-creme block w-full py-2 px-3 rounded-md" />
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="bg-orange button-transition shadow-sm rounded-3xl pl-6 pr-8 py-2 my-2 mx-auto text-white flex">
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
