import React from 'react';
import { FaHashtag } from 'react-icons/fa';
import styles from '../styles/Tag.module.css';

function TopicTag({ topics }) {
  const formattedTopicTags =
    topics &&
    topics.split(',').filter((x) => {
      return x.length != '' && x != ',' && /[a-zA-Z]/g.test(x);
    });

  return (
    <>
      {formattedTopicTags && formattedTopicTags.length > 0 && (
        <span className={styles.TagSpacing}>
          <span>Topics: </span>
          {formattedTopicTags.map((tag, idx) => (
            <span key={idx} className={[styles.Tag].join(' ')}>
              <FaHashtag />
              {tag.replace(/,/g, ' ').trim()}
            </span>
          ))}
        </span>
      )}
    </>
  );
}

export default TopicTag;
