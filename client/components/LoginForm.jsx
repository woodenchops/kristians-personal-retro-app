import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';

function LoginForm() {
  const router = useRouter();
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
    const result = await signIn('credentials', {
      redirect: false,
      email: fieldValues.email,
      password: fieldValues.password,
    });

    if (!result.error) {
      router.replace('/profile');
    }

    setFieldValues({
      email: '',
      password: '',
    });
  };

  return (
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
        <div>
          <button>Sign in</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
