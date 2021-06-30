import React from 'react';
import { FaRegCalendarAlt, FaTags } from 'react-icons/fa';
import Link from 'next/link';
import { RetroArticle } from './styled-components/retroitem-styles';
import styles from '../styles/RetroItem.module.css';
import { ViewRetroLink } from './styled-components/button-styles';
import FeelingStatus from './FeelingStatus';
import TopicTag from './TopicTag';

function RetroItem({ retro }) {
  const { title, slug, overview, date, tags, overallFeeling, username } = retro;

  return (
    <RetroArticle>
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
        {username && <p>Author: {username}</p>}

        {!overallFeeling && !tags ? null : (
          <span className={styles.TagSection}>
            <span className={styles.TagLabel}>
              <FaTags />
              Tags:
            </span>
            <FeelingStatus type={overallFeeling} />
            <TopicTag topics={tags} />
          </span>
        )}
      </div>

      <ViewRetroLink href={`/retros/${slug}`} buttonText='View Retro' />
    </RetroArticle>
  );
}

export default RetroItem;
