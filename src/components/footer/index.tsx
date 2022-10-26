import React from 'react';

import {siteSettings} from '@/configs/site.config';

import styles from './style.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="copyright">
          <p>
            Created by{' '}
            <a href={siteSettings.author.websiteUrl} target="_blank" rel="noreferrer">
              {siteSettings.author.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
