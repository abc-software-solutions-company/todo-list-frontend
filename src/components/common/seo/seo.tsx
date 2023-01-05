import {NextSeo, NextSeoProps} from 'next-seo';
import {OpenGraphMedia} from 'next-seo/lib/types';

import useNotifications from '@/states/notifications/use-notifications';

interface SeoProps extends NextSeoProps {
  url?: string;
  images?: ReadonlyArray<OpenGraphMedia>;
}

const Seo: React.FC<SeoProps> = ({title, description, images, url, ...rest}: SeoProps) => {
  const {numberOfUnreadNotifications} = useNotifications();

  return (
    <NextSeo
      title={`${title} ${numberOfUnreadNotifications ? `(${numberOfUnreadNotifications})` : ''}`}
      description={description}
      openGraph={{
        title,
        description,
        images,
        url: url ? `${process.env.NEXT_PUBLIC_SITE_URL}${url}` : process.env.NEXT_PUBLIC_SITE_URL
      }}
      {...rest}
    />
  );
};

export default Seo;
