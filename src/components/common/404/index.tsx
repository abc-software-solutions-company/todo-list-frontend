import {useRouter} from 'next/router';
import * as React from 'react';

import Seo from '@/components/common/seo/seo';
import { NotFoundConfig } from '@/configs/not-found.config';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';

import styles from './404.module.scss';

const ErrorInformation: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Seo title={'404 Not Found'} />
      <div className={styles['page-not-found']}>
        <div className="container">
          <p className="heading">404</p>
          <h1 className="sub-heading">{NotFoundConfig.SUB_HEADING}</h1>
          <Button className="max-w-sm" variant="contained" color="info" text={NotFoundConfig.BACK_HOME} type="submit" onClick={() => router.push(ROUTES.HOME)} />
        </div>
      </div>
    </>
  );
};

export default ErrorInformation;
