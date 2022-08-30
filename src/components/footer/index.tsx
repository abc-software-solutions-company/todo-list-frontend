import React from 'react';

import styles from './style.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="copyright">Copyright © 2022 By ABC Software Solutions Company.</div>
      </div>
    </footer>
  );
};

export default Footer;
