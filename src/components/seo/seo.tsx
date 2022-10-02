import {NextSeo, NextSeoProps} from 'next-seo';
import {OpenGraphMedia} from 'next-seo/lib/types';

import {siteSettings} from '@/configs/site.config';

interface SeoProps extends NextSeoProps {
  url?: string;
  cover?: any;
}

const Seo: React.FC<SeoProps> = ({title, description, cover, url, ...rest}: SeoProps) => {
  const image = cover;
  let images: ReadonlyArray<OpenGraphMedia> = [{url: '/og-img.png', width: 1200, height: 630, alt: siteSettings.name}];
  if (image) images = [{url: image.url, width: image.width, height: image.height, alt: cover.alternativeText}];

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        description,
        images,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}${url}`
      }}
      {...rest}
    />
  );
};

export default Seo;
