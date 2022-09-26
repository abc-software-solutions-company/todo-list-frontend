import {useTranslation} from 'next-i18next';
import Link from 'next/link';
import * as React from 'react';

import Seo from '@/components/seo/seo';
import {ROUTES} from '@/configs/routes.config';
import {siteSettings} from '@/configs/site.config';

import styles from './404.module.scss';

const ErrorInformation: React.FC = () => {
  const {t} = useTranslation('common');

  return (
    <>
      <Seo
        title={'404 Not Found'}
        description={siteSettings.description}
        images={[
          {
            url: '/todolist.png',
            width: 1200,
            height: 630,
            alt: 'To-Do List | Lobby'
          }
        ]}
      />
      <div className={styles['page-not-found']}>
        <div className="container">
          <p className="heading">{t('404-heading')}</p>
          <h1 className="sub-heading">{t('404-sub-heading')}</h1>
          <div className="image">404 NOT FOUND</div>
          <Link href={ROUTES.LOGIN}>{t('404-back-home')}</Link>
        </div>
      </div>
    </>
  );
};

export default ErrorInformation;
