import React, { createContext, useContext, useState } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import Pool from '../utils/UserPool'

const AccountContext = createContext()

const AccountProvider = (props) => {
  const [userData, innerSetUserData] = useState({})

  const setUserData = (data) => {
    innerSetUserData(data);
  }

  const [authenticated, innerSetAuthenticated] = useState(false);

  const setAuthenticated = boolean => {
    innerSetAuthenticated(boolean);
  }

  const getSession = async () => {
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

  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });
    
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

  const signout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      innerSetUserData({})
    };
  };

  return (
    <AccountContext.Provider value={{ authenticate, getSession, userData, setUserData, authenticated, setAuthenticated, signout }}>
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
  const context = useContext(AccountContext)
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

function useSignout() {
  const context = useContext(AccountContext)
  if (!context) {
    throw new Error('useSignout must be used within an AccountProvider')
  }
  return context.signout
}

export {AccountProvider, useAuthenticate, useGetSession, useUserData, useSetUserData, useAuthenticated, useSetAuthenticated, useSignout }
