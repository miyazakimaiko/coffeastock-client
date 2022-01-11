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
      } else {
        try {
          const userId = data.userSub;
          setDefaultCustomRange(userId);
          toast.success("Registered successfully!");
        } catch (error) {
          toast.error(error.message, {
            position: toast.POSITION.TOP_CENTER
          });
        }
      }
    });
  };

  const setDefaultCustomRange = async (userid) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/user/${userid}`,
        {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({
            "origin_range": {
              "next_id": 6,
              "range": {
                "Yirgacheffe, Ethiopia" : {
                  "id": 3,
                  "def": "Location details here..."
                },
                "Sidamo, Ethiopia": {
                  "id": 2,
                  "def": "Location details here..."
                },
                "Kaffa, Ethiopia": {
                  "id": 5,
                  "def": "Location details here..."
                },
                "Ruiri, Kenya": {
                  "id": 4,
                  "def": "Location details here..."
                },
                "Thika, Kenya": {
                  "id": 1,
                  "def": "Location details here..."
                }
              }
            },
            "farm_range": {
              "next_id": 4,
              "range": {
                "Farm 1" : {
                  "id": 3,
                  "def": "details..."
                },
                "Farm 2": {
                  "id": 2,
                  "def": "details..."
                },
                "Farm 3": {
                  "id": 1,
                  "def": "details..."
                }
              }
            },
            "variety_range": {
              "next_id": 4,
              "range": {
                "Typica" : {
                  "id": 1,
                  "def": "Details what typica is..."
                },
                "Caturra": {
                  "id": 3,
                  "def": "Details what caturra is..."
                },
                "Burbon": {
                  "id": 2,
                  "def": "Details what Burbon is..."
                }
              }
            },
            "process_range": {
              "next_id": 4,
              "range": {
                "Washed" : {
                  "id": 1,
                  "def": "Details what washed is..."
                },
                "Semi-Washed": {
                  "id": 2,
                  "def": "Details what semi-washed is..."
                },
                "Natural": {
                  "id": 3,
                  "def": "Details what natural is..."
                }
              }
            },
            "roaster_range": {
              "next_id": 4,
              "range": {
                "Coffeeangel" : {
                  "id": 3,
                  "def": "Definition of Coffeeangel..."
                },
                "Coffee Collective": {
                  "id": 1,
                  "def": "Coffee Collective definition..."
                },
                "Koppi": {
                  "id": 2,
                  "def": "Koppi details..."
                }
              }
            },
            "method_range": {
              "next_id": 4,
                "range": {
                "French Press" : {
                  "id": 1,
                  "def": "details..."
                },
                "Espresso": {
                  "id": 3,
                  "def": "details..."
                },
                "Mocha Pot": {
                  "id": 2,
                  "def": "details..."
                }
              }
            },
            "water_range": {
              "next_id": 3,
              "range": {
                "Water 1" : {
                  "id": 2,
                  "def": "details..."
                },
                "Water 2": {
                  "id": 1,
                  "def": "details..."
                }
              }
            },
            "grinder_range": {
              "next_id": 4,
              "range": {
                "Hario Mini Handmill" : {
                  "id": 2,
                  "def": "details..."
                },
                "EKS": {
                  "id": 3,
                  "def": "details..."
                },
                "Sage espresso grinder": {
                  "id": 1,
                  "def": "details..."
                }
              }
            },
            "palate_range": {
              "next_id": 7,
              "range": {
                "sweet" : {
                  "id": 5,
                  "def": "details..."
                },
                "acidic": {
                  "id": 2,
                  "def": "details..."
                },
                "cherries": {
                  "id": 4,
                  "def": "details..."
                },
                "stonefruit" : {
                  "id": 1,
                  "def": "details..."
                },
                "citrus fruit": {
                  "id": 6,
                  "def": "details..."
                },
                "chocolate": {
                  "id": 3,
                  "def": "details..."
                }
              }
            },
            "aroma_range": {
              "next_id": 5,
              "range": {
                "Walnut" : {
                  "id": 4,
                  "def": "details..."
                },
                "Peach": {
                  "id": 2,
                  "def": "details..."
                },
                "Pineapple": {
                  "id": 1,
                  "def": "details..."
                },
                "Green apple" : {
                  "id": 3,
                  "def": "details..."
                }
              }
            }
          })
        }
      );

    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

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
