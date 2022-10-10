import {DefaultSeo as NextDefaultSeo} from 'next-seo';

import {siteSettings} from '@/configs/site.config';

const DefaultSeo: React.FC = () => {
  return (
    <NextDefaultSeo
      titleTemplate={`${siteSettings.name} | %s`}
      defaultTitle={siteSettings.name}
      description={siteSettings.description}
      openGraph={{
        type: 'website',
        locale: 'en_IE',
        title: siteSettings.name,
        site_name: siteSettings.name,
        description: siteSettings.description,
        images: [siteSettings.cover]
      }}
      twitter={{handle: '@handle', site: '@site', cardType: 'summary_large_image'}}
      additionalMetaTags={[
        {name: 'viewport', content: 'width=device-width, initial-scale=1 maximum-scale=1'},
        {name: 'HandheldFriendly', content: 'true'},
        {name: 'MobileOptimized', content: '320'},
        {name: 'keywords', content: siteSettings.keyword},
        {name: 'application-name', content: siteSettings.name},
        {name: 'theme-color', content: '#334155'},
        {name: 'msapplication-TileColor', content: '#da532c'},
        {name: 'msapplication-tap-highlight', content: 'no'},
        {name: 'apple-mobile-web-app-capable', content: 'yes'},
        {name: 'apple-mobile-web-app-status-bar-style', content: 'black'},
        {name: 'apple-mobile-web-app-title', content: siteSettings.name},
        {name: 'google', content: 'notranslate'},
        {name: 'author', content: siteSettings.author.name}
      ]}
      additionalLinkTags={[
        {rel: 'manifest', href: '/manifest.json'},
        {rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico'},
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        {rel: 'icon', sizes: '16x16', type: 'image/png', href: '/favicon-16x16.png'},
        {rel: 'icon', sizes: '32x32', type: 'image/png', href: '/favicon-32x32.png'},
        {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
        {rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg'}
      ]}
    />
  );
};

export default DefaultSeo;
