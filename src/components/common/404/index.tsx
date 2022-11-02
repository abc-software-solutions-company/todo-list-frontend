import {useRouter} from 'next/router';
import {useTranslation} from 'next-i18next';
import * as React from 'react';

import Seo from '@/components/common/seo/seo';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';

import styles from './404.module.scss';

const ErrorInformation: React.FC = () => {
  const {t} = useTranslation('common');
  const router = useRouter();

  return (
    <>
      <Seo title={'404 Not Found'} />
      <div className={styles['page-not-found']}>
        <div className="container">
          <p className="heading">404</p>
          <h1 className="sub-heading">{t('404-sub-heading')}</h1>
          <Button className="w-1/2" variant="contained" color="primary" text={t('404-back-home')} type="submit" onClick={() => router.push(ROUTES.HOME)} />
        </div>
      </div>
    </>
  );
};

export default ErrorInformation;
