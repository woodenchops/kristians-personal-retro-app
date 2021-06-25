import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import Notification from './Notification';
import { useNotificationsContextContext } from '../contexts/NotificationContext';
import { StyledButton } from './styled-components/button-styles';

async function sendAddUserRequest(userDetails) {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

function SignUpForm() {
  const router = useRouter();

  const {
    requestStatus,
    setRequestError,
    requestError,
    notification,
    NofiticationMessage,
    removeNotification,
  } = useNotificationsContextContext();

  // const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  // const [requestError, setRequestError] = useState();

  const [fieldValues, setFieldValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChangeHandler = (e) => {
    setFieldValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (fieldValues.password !== fieldValues.confirmPassword) {
      alert('passwords dont match!');
    } else {
      const newUser = {
        name: fieldValues.name.trim(),
        email: fieldValues.email.trim(),
        password: fieldValues.password.trim(),
        confirmPassword: fieldValues.confirmPassword.trim(),
      };

      try {
        // setRequestStatus('pending');
        NofiticationMessage({
          status: 'pending',
          title: 'Signing you up...',
          message: 'Two secs...',
        });
        const result = await sendAddUserRequest(newUser);
        await signIn('credentials', {
          ...newUser,
          redirect: false,
        });
        // setRequestStatus('success');
        NofiticationMessage({
          status: 'success',
          title: 'Signed up!',
          message: 'done!',
        });
        router.replace('/retros');
      } catch (err) {
        setRequestError(err.message);

        NofiticationMessage({
          status: 'error',
          title: 'Error!',
          message: requestError,
        });
      }
    }
  };

  useEffect(() => {
    removeNotification();
  }, [requestStatus]);

  return (
    <div className='flex-1 mx-3'>
      <h2>Sign up!</h2>
      <form className='flex flex-col' onSubmit={onSubmitHandler}>
        <input
          className='p-2 my-2 shadow-md'
          type='text'
          name='name'
          placeholder='Full name'
          value={fieldValues.name}
          onChange={(e) => onChangeHandler(e)}
          required
        />
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
          placeholder='Create password'
          value={fieldValues.password}
          onChange={(e) => onChangeHandler(e)}
          required
        />
        <input
          className='p-2 my-2 shadow-md'
          type='password'
          name='confirmPassword'
          placeholder='Confirm password'
          value={fieldValues.confirmPassword}
          onChange={(e) => onChangeHandler(e)}
          required
        />
        <div style={{ marginTop: '1rem' }}>
          <StyledButton>Sign up</StyledButton>
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
  );
}

export default SignUpForm;
