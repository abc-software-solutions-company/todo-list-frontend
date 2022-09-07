import {NextSeo, NextSeoProps} from 'next-seo';
import {OpenGraphMedia} from 'next-seo/lib/types';

import {IImageAttributes} from '@/types';
import {getImageURL} from '@/utils/misc';

interface SeoProps extends NextSeoProps {
  url?: string;
  cover?: IImageAttributes;
}

const Seo: React.FC<SeoProps> = ({title, description, cover, url, ...rest}: SeoProps) => {
  const image = cover?.formats.large;
  let images: ReadonlyArray<OpenGraphMedia> = [{url: '/todolist.png', width: 1200, height: 630, alt: 'ToDo List'}];
  if (image)
    images = [{url: getImageURL(image.url), width: image.width, height: image.height, alt: cover?.alternativeText}];
  return (
    <NextSeo
      title={title}
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
