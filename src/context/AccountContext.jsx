import React, { createContext, useContext, useState } from 'react'
import { CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import Pool from '../utils/UserPool'
import toastOnBottomCenter from '../utils/customToast'
import { NavStateContext } from './NavStateContext'

const AccountContext = createContext()

const AccountProvider = (props) => {
  const { forceUnpin } = useContext(NavStateContext);
  const [userData, innerSetUserData] = useState({});

  const setUserData = (data) => {
    innerSetUserData(data);
  }

  const [authenticated, innerSetAuthenticated] = useState(false);

  function setAuthenticated(boolean) {
    innerSetAuthenticated(boolean);
  }

  async function getSession() {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            reject();
          } else {
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err);
                } else {
                  const results = {};

                  for (let attribute of attributes) {
                    const { Name, Value } = attribute;
                    results[Name] = Value;
                  }

                  resolve(results);
                }
              });
            });
            resolve({
              user,
              ...session,
              ...attributes
            });
          }
        });
      } else {
        reject();
      }
    });
  }

  async function authenticate(Username, Password) {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });

      console.log("user: ", user)
      const authDetails = new AuthenticationDetails({ Username, Password });

      console.log("authDetails: ", authDetails)


    
      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (data) => {
          resolve(data);
        },
      });
    })
  }

  function changeAttribute(name, value, callBack) {
      if (value.length <= 0) {
        toastOnBottomCenter('error', `Please enter ${name}.`);
      }

      const attributeList = [];
      const attribute = new CognitoUserAttribute({Name: name, Value: value});
      attributeList.push(attribute);

      userData.user.updateAttributes(attributeList, function(err, res) {
        if (err) {
          toastOnBottomCenter('error', err.message);
        }
        else if (res === 'SUCCESS') {
          getSession().then((session) => {
            setUserData(session);
          });
          callBack();
        }
      })
  }

  async function verifyAttribute(attrName, verificationCode, callback) {
    userData.user.verifyAttribute(attrName, verificationCode, {
      onSuccess: function(result) {
         getSession().then((session) => {
          setUserData(session);
          callback();
        });
        toastOnBottomCenter('success', `Your ${attrName} is updated successfully.`);
      },
      onFailure: function(err) {
        alert(err.message || JSON.stringify(err));
      },
    });
  }

  function Signout() {
    // order matters...
    setAuthenticated(false);
    innerSetUserData({});
    Pool.getCurrentUser()?.signOut();
    forceUnpin();
  };

  return (
    <AccountContext.Provider 
      value={ 
        { authenticate, 
          getSession, 
          userData, 
          setUserData, 
          authenticated, 
          setAuthenticated, 
          changeAttribute, 
          verifyAttribute, 
          Signout
        }
      }
    >
      { props.children }
    </AccountContext.Provider>
  )
}

function useAuthenticate() {
  const context = useContext(AccountContext)
  if (!context) {
    throw new Error('useAuthenticate must be used within an AccountProvider')
  }
  return context.authenticate
}

function useGetSession() {
  const context = useContext(AccountContext)
  if (!context) {
    throw new Error('useGetSession must be used within an AccountProvider')
  }
  return context.getSession
}

function useUserData() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useUserData must be used within an AccountProvider')
  }
  return context.userData
}

function useSetUserData() {
  const context = useContext(AccountContext)
  if (!context) {
    throw new Error('useSetUserData must be used within an AccountProvider')
  }
  return context.setUserData
}

function useAuthenticated() {
  const context = useContext(AccountContext)
  if (!context) {
    throw new Error('useAuthenticated must be used within an AccountProvider')
  }
  return context.authenticated
}

function useSetAuthenticated() {
  const context = useContext(AccountContext)
  if (!context) {
    throw new Error('useSetAuthenticated must be used within an AccountProvider')
  }
  return context.setAuthenticated
}

function useChangeAttribute() {
  const context = useContext(AccountContext)
  if (!context) {
    throw new Error('useChangeAttribute must be used within an AccountProvider')
  }
  return context.changeAttribute
}

function useVerifyAttribute() {
  const context = useContext(AccountContext)
  if (!context) {
    throw new Error('useVerifyAttribute must be used within an AccountProvider')
  }
  return context.verifyAttribute
}

function useSignout() {
  const context = useContext(AccountContext)
  if (!context) {
    throw new Error('useSignout must be used within an AccountProvider')
  }
  return context.Signout
}

export { AccountProvider, 
        useAuthenticate, 
        useGetSession, 
        useUserData, 
        useSetUserData, 
        useAuthenticated, 
        useSetAuthenticated, 
        useChangeAttribute,
        useVerifyAttribute,
        useSignout,
      }
