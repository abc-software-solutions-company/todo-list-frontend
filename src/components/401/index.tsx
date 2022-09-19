import {useTranslation} from 'next-i18next';
import Link from 'next/link';
import * as React from 'react';

import {ROUTES} from '@/configs/routes.config';

import styles from './401.module.scss';

const ErrorUnAuthorized: React.FC = () => {
  const {t} = useTranslation('common');

  return (
    <div className={styles['page-unauthorized']}>
      <div className="container">
        <p className="heading">You are not login</p>
        <h1 className="sub-heading">Press link below to go back homepage and register a name. Thanks</h1>
        <Link href={ROUTES.LOGIN}>{t('404-back-home')}</Link>
      </div>
    </div>
  );
};

export default ErrorUnAuthorized;
