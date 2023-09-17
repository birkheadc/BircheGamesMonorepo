import * as React from 'react';
import './AccountPage.css'
import { IUserDTO } from '../../../types/user/user';
import { userInfo } from 'os';
import { useNavigate } from 'react-router-dom';

interface IAccountPageProps {
  user: IUserDTO | null
}

/**
*
* @returns {JSX.Element | null}
*/
export default function AccountPage(props: IAccountPageProps): JSX.Element | null {

  const nav = useNavigate();

  React.useEffect(function navigateAwayIfUserIsNullOrNotEmailVerified() {
    console.log("Is Email Verified?: ", props.user);
    if (props.user == null) nav('/');
    if (props.user?.isEmailVerified == false) {
      console.log("Not email verified, navigating...");
      nav('/account-created');
    } else {
      console.log("Email is verified");
    }
  }, [ props.user ]);

  return (
    <div className='account-page-wrapper'>
      <h1>Account Page</h1>
      <p>This is the account page. Only a verified user should be able to see this!</p>
      <p>If you are not logged in, this page should be completely off limits.</p>
      <p>If you are logged in, but your email is not verified, you should be redirected to a different page.</p>
      <br></br>
      {props.user && Object.entries(props.user).map(
        ([key, value]) =>
        <p className='account-page-user-line-wrapper' key={key}><span>{key}</span><span>{value.toString()}</span></p>
      )}
    </div>
  );
}