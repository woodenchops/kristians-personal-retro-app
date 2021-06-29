import React, { useState, useEffect, memo } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import Notification from './Notification';
import { useNotificationsContextContext } from '../contexts/NotificationContext';
import { StyledButton } from './styled-components/button-styles';

function LoginForm() {
  const router = useRouter();

  const {
    requestStatus,
    setRequestError,
    requestError,
    notification,
    NofiticationMessage,
    removeNotification,
  } = useNotificationsContextContext();

  const [fieldValues, setFieldValues] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    setFieldValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      NofiticationMessage({
        status: 'pending',
        title: 'Signing you in...',
        message: 'Two secs...',
      });
      const result = await signIn('credentials', {
        redirect: false,
        email: fieldValues.email,
        password: fieldValues.password,
      });

      if (result.error) {
        NofiticationMessage({
          status: 'error',
          title: 'Error!',
          message: result.error,
        });
      }

      if (!result.error) {
        NofiticationMessage({
          status: 'success',
          title: 'Success!',
          message: 'Successfully signed up!',
        });
        router.replace('/retros');
      }
    } catch (err) {
      console.log('ERR', err);
    }

    setFieldValues({
      email: '',
      password: '',
    });
  };

  useEffect(() => {
    removeNotification();
  }, [requestStatus]);

  const content = (
    <>
      <div className='flex-1 mx-3'>
        <h2>Already a member? Sign in.</h2>
        <form className='flex flex-col' onSubmit={onSubmitHandler}>
          <input
            className='p-2 my-2 shadow-md'
            type='email'
            name='email'
            placeholder='Email address'
            value={fieldValues.email}
            onChange={(e) => onChangeHandler(e)}
            required
          />
          <input
            className='p-2 my-2 shadow-md'
            type='password'
            name='password'
            placeholder='Enter password'
            value={fieldValues.password}
            onChange={(e) => onChangeHandler(e)}
            required
          />
          <div style={{ marginTop: '1rem' }}>
            <StyledButton>Sign in</StyledButton>
          </div>
        </form>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
      </div>
    </>
  );

  return <>{content}</>;
}

export default memo(LoginForm);
