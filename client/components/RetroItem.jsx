import React from 'react';
import { FaRegCalendarAlt, FaTags } from 'react-icons/fa';
import Link from 'next/link';
import styles from '../styles/RetroItem.module.css';
// import FeelingStatus from './Feeling';
// import TopicTag from './TopicTag';

function RetroItem({ retro }) {
  const { title, slug, overview, date, user, tags, overallFeeling } = retro;

  return (
    <article className={styles.RetroItem}>
      <div className={styles.BorderHover} />
      <span className={styles.Date}>
        <FaRegCalendarAlt size='56' />
        <p>
          Date :{` ${new Date(date).toLocaleDateString('en-GB') || 'No date'}`}
        </p>
      </span>

      <div className={styles.RetroInfo}>
        <p>Title: {title}</p>
        {overview && <p>Overview: {overview}</p>}
        {user?.username && <p>Author: {user?.username}</p>}

        {!overallFeeling && !tags ? null : (
          <span className={styles.TagSection}>
            <span className={styles.TagLabel}>
              <FaTags />
              Tags:
            </span>
            {/* <FeelingStatus type={overallFeeling} />
            <TopicTag topics={tags} /> */}
          </span>
        )}
      </div>
      <Link href={`/retros/${slug}`}>
        <a className={[styles.ViewRetro, 'PrimaryBtn'].join(' ')}>View Retro</a>
      </Link>
    </article>
  );
}

export default RetroItem;
