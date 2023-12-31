import * as React from 'react';
import './AccountPage.css'
import { IUserDTO } from '../../../../types/user/user';
import { createSearchParams, useNavigate } from 'react-router-dom';
import UpdateAccountForm from '../updateAccountForm/UpdateAccountForm';
import api from '../../../../api';
import { IApiResponse } from '../../../../types/api/apiResponse';
import { IUpdateDisplayNameRequest } from '../../../../types/api/requests/updateUser/updateDisplayNameRequest';
import helpers from '../../../../helpers';
import UpdateAccountChangePasswordSection from '../updateAccountForm/changePasswordSection/UpdateAccountChangePasswordSection';

interface IAccountPageProps {
  token: string | null,
  setWorking: (isWorking: boolean, message: string | null) => void,
  user: IUserDTO | null,
}

/**
*
* @returns {JSX.Element | null}
*/
export default function AccountPage(props: IAccountPageProps): JSX.Element | null {

  const nav = useNavigate();

  React.useEffect(function navigateAwayIfUserIsNullOrNotEmailVerified() {
    if (props.user == null) nav('/');
    if (props.user?.isEmailVerified === false) {
      nav({ pathname: '/email-verification/generate', search: `?${createSearchParams({ address: props.user.emailAddress })}` });
    }
  }, [ props.user ]);

  const submitUpdateUserRequest = async (request: IUpdateDisplayNameRequest): Promise<IApiResponse> => {
    props.setWorking(true, "Updating");
    const response = await api.user.changeDisplayName(props.token, request);
    props.setWorking(false, null);
    return response;
  }

  return (
    <div className='account-page-wrapper'>
      <h1>Account Page</h1>
      <p>This is the account page. Only a verified user should be able to see this!
      If you are not logged in, this page should be completely off limits.
      If you are logged in, but your email is not verified, you should be redirected to a different page.</p>
      <br></br>
      { props.user && <UpdateAccountForm user={props.user} updateDisplayName={submitUpdateUserRequest} />}
    </div>
  );
}