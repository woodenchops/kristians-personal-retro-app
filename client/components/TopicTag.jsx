import React from 'react';
import { FaHashtag } from 'react-icons/fa';
import styles from '../styles/Tag.module.css';

function TopicTag({ topics }) {
  const formattedTopicTags =
    topics &&
    topics.split(',').filter((tag) => {
      if (tag.length != '' && tag != ',' && /[a-zA-Z]/g.test(tag)) {
        return tag.replace(/,/g, ' ').trim();
      }
    });

  return (
    <>
      {formattedTopicTags && formattedTopicTags.length > 0 && (
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
