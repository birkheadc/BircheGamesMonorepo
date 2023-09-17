import * as React from 'react';
import { Navigate, Route, Routes, createSearchParams, useNavigate } from 'react-router-dom';
import Nav from './components/nav/Nav';
import LandingPage from './components/pages/landing/LandingPage';
import RegisterPage from './components/pages/register/RegisterPage';

import './styles/reset.css';
import './styles/shared.css';
import './styles/vars.css';
import AccountPage from './components/pages/account/AccountPage';
import AccountCreatedPage from './components/pages/accountCreated/AccountCreatedPage';
import { IUserDTO } from './types/user/user';
import LoginPage from './components/pages/login/LoginPage';

import jwt_decode from 'jwt-decode';
import { ISessionTokenPayload } from './types/sessionToken/sessionTokenPayload';
import helpers from './helpers';

interface IRootProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function Root(props: IRootProps): JSX.Element | null {

  const [loggedInUser, setLoggedInUser] = React.useState<IUserDTO | null>(null);

  const nav = useNavigate();

  React.useEffect(function checkStorageForTokenOnMount() {
    const token: string | null = localStorage.getItem(SESSION_TOKEN_KEY);
    if (token != null) {
      const payload = jwt_decode(token);
      const user = helpers.getUserFromPayload(payload);
      setLoggedInUser(user);
    }
  }, []);

  const sendVerificationEmail = (address: string | null) => {
    if (address != null) {
      console.log(`Request email to: ${address}`);
    }
  }

  const login = (sessionToken: string) => {
    const payload = jwt_decode(sessionToken);
    const user = helpers.getUserFromPayload(payload);
    if (user == null) {
      // Todo: Reroute to error page or something
      return;
    }
    localStorage.setItem(SESSION_TOKEN_KEY, sessionToken);
    setLoggedInUser(user);
    nav('account');
  }

  const logout = () => {
    localStorage.removeItem(SESSION_TOKEN_KEY);
    setLoggedInUser(null);
    nav('/');
  }

  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path={'/login'} element={<LoginPage login={login}/>} />
          <Route path={'/account-created'} element={<AccountCreatedPage resend={sendVerificationEmail}/>} />
          <Route path={'/account'} element={loggedInUser ? <AccountPage user={loggedInUser} /> : <Navigate replace={true} to={{ pathname: '/' }} /> } />
          <Route path={'/register'} element={<RegisterPage sendVerificationEmail={sendVerificationEmail} />} />
          <Route path={'/'} element={<LandingPage />}/>
          <Route path={ '*' } element={ <Navigate replace={true} to={{ pathname: '/' }} /> } ></Route>
        </Routes>
      </main>
    </>
  );
}

const SESSION_TOKEN_KEY = "SESSION_TOKEN";