import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { API_URL } from '../config';
import { useNotificationsContextContext } from '../contexts/NotificationContext';
import Notification from './Notification';

async function sendRetroRequest(retroDetails, id) {
  const res = await fetch(`/api/retros/edit/${id}`, {
    method: 'PUT',
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

function EditRetroForm({ singleRetro }) {
  const router = useRouter();

  const {
    requestStatus,
    requestError,
    notification,
    NofiticationMessage,
    removeNotification,
  } = useNotificationsContextContext();

  const {
    title,
    slug,
    overview,
    date,
    user,
    _id,
    techContributions,
    teamContributions,
    widerContributions,
    improvementsAndReflections,
    tags,
    overallFeeling,
  } = singleRetro[0];

  const [fieldValues, setFieldValues] = useState({
    title,
    overview,
    date,
    techContributions,
    teamContributions,
    widerContributions,
    improvementsAndReflections,
    tags,
    overallFeeling,
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
      title: 'Updating retro...',
      message: 'Two secs...',
    });

    // setRequestStatus('pending');

    try {
      await sendRetroRequest(fieldValues, _id);
      // setRequestStatus('success');
      NofiticationMessage({
        status: 'success',
        title: 'Successfully updated retro!',
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

      router.push(`/retros/${router.query.retroId}`);
    } catch (err) {
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
      <h2>Edit retro</h2>
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
          type='date'
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

export default EditRetroForm;
