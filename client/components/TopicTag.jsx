import React from 'react';
import { FaHashtag } from 'react-icons/fa';
import styles from '../styles/Tag.module.css';

function TopicTag({ topics }) {
  const formattedTopicTags = topics && topics.split(', ');

  return (
    <>
      {formattedTopicTags && (
        <span className={styles.TagSpacing}>
          <span>Topics: </span>
          {formattedTopicTags.map((tag, idx) => (
            <span key={idx} className={[styles.Tag].join(' ')}>
              <FaHashtag />
              {tag}
            </span>
          ))}
        </span>
      )}
    </>
  );
}

export default TopicTag;
