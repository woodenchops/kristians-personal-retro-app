import React from 'react';
import styles from '../styles/Tag.module.css';

function FeelingStatus({ type }) {
  const renderFeelingTagColor = () => {
    switch (type) {
      case 'happy':
        return styles.Happy;
      case 'meh':
        return styles.Meh;
      case 'unhappy':
        return styles.Unhappy;
      default:
        return styles.NoneProvided;
    }
  };

  const typeCapitalized = type && type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <>
      {type && (
        <span className={styles.TagSpacing}>
          <span>Feeling: </span>
          <span className={[styles.Feeling, renderFeelingTagColor()].join(' ')}>
            {typeCapitalized || 'None provided'}
          </span>
        </span>
      )}
    </>
  );
}

export default FeelingStatus;
