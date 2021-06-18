import React, { useEffect, useState } from 'react';
import { useNotificationsContextContext } from '../contexts/NotificationContext';
import Notification from './Notification';

async function sendRetroRequest(retroDetails) {
  const res = await fetch('/api/retros', {
    method: 'POST',
    body: JSON.stringify(retroDetails),
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

function AddRetroForm() {
  const {
    requestStatus,
    setRequestError,
    requestError,
    notification,
    NofiticationMessage,
    removeNotification,
  } = useNotificationsContextContext();

  const [fieldValues, setFieldValues] = useState({
    title: '',
    overview: '',
    date: '',
    techContributions: '',
    teamContributions: '',
    widerContributions: '',
    improvementsAndReflections: '',
    tags: '',
    overallFeeling: '',
  });

  const onChangeHandler = (e) => {
    setFieldValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    NofiticationMessage({
      status: 'pending',
      title: 'Adding retro...',
      message: 'Two secs...',
    });

    // setRequestStatus('pending');

    try {
      await sendRetroRequest(fieldValues);
      // setRequestStatus('success');
      NofiticationMessage({
        status: 'success',
        title: 'Successfully added retro!',
        message: 'done!',
      });

      setFieldValues({
        title: '',
        overview: '',
        date: '',
        techContributions: '',
        teamContributions: '',
        widerContributions: '',
        improvementsAndReflections: '',
        tags: '',
        overallFeeling: '',
      });
    } catch (error) {
      // setRequestStatus('error');

      NofiticationMessage({
        status: 'error',
        title: 'Error!',
        message: requestError,
      });
    }
  };

  useEffect(() => {
    removeNotification();
  }, [requestStatus]);

  return (
    <div>
      <h2>Add retro</h2>
      <form onSubmit={onSubmitHandler}>
        <input
          type='text'
          name='title'
          placeholder='title'
          value={fieldValues.title}
          onChange={(e) => onChangeHandler(e)}
          required
        />
        <input
          type='text'
          name='overview'
          placeholder='overview'
          value={fieldValues.overview}
          onChange={(e) => onChangeHandler(e)}
          required
        />
        <input
          type='text'
          name='date'
          placeholder='date'
          value={fieldValues.date}
          onChange={(e) => onChangeHandler(e)}
          required
        />
        <input
          type='text'
          name='techContributions'
          placeholder='techContributions'
          value={fieldValues.techContributions}
          onChange={(e) => onChangeHandler(e)}
          required
        />
        <input
          type='text'
          name='teamContributions'
          placeholder='teamContributions'
          value={fieldValues.teamContributions}
          onChange={(e) => onChangeHandler(e)}
          required
        />
        <input
          type='text'
          name='widerContributions'
          placeholder='widerContributions'
          value={fieldValues.widerContributions}
          onChange={(e) => onChangeHandler(e)}
          required
        />
        <input
          type='text'
          name='improvementsAndReflections'
          placeholder='improvementsAndReflections'
          value={fieldValues.improvementsAndReflections}
          onChange={(e) => onChangeHandler(e)}
          required
        />
        <input
          type='text'
          name='tags'
          placeholder='tags'
          value={fieldValues.tags}
          onChange={(e) => onChangeHandler(e)}
          required
        />
        <input
          type='text'
          name='overallFeeling'
          placeholder='overallFeeling'
          value={fieldValues.overallFeeling}
          onChange={(e) => onChangeHandler(e)}
          required
        />
        <div>
          <button>Send test data</button>
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

export default AddRetroForm;
