import React from 'react';

import styles from './style.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="copyright">
          <p>
            Created by{' '}
            <a className="text-abc-grey  " href="https://www.abcsoftwarecompany.com/" target="_blank" rel="noreferrer">
              ABC Software Solutions Company
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
