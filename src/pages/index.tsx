import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

import Seo from '@/components/seo/seo';
import {ROUTES} from '@/configs/routes.config';
import {siteSettings} from '@/configs/site.config';
import Button from '@/core-ui/button';
import LayoutDefault from '@/layouts/default';

export default function PageHome() {
  return (
    <>
      <Seo title={`${siteSettings.name} | Home Page`} description={siteSettings.description} />
      <Button>
        <Link href={ROUTES.QUICKPLAY}>
          <a>Quick play</a>
        </Link>
      </Button>
    </>
  );
}

PageHome.Layout = LayoutDefault;

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common']))
    }
  };
};
