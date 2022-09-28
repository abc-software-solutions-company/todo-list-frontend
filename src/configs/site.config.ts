import {merge} from 'lodash-es';

const websiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const organizationDefault = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  founder: 'Khanh Mai',
  logo: 'https://abcsoftwarecompany.com/android-chrome-512x512.png',
  url: 'https://abcsoftwarecompany.com',
  image: 'https://abcsoftwarecompany.com/og-abc.png',
  description: 'Simple solutions for complex problems. Improve work performance every day for your company',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'Vietnam',
    addressRegion: 'Khanh Hoa',
    addressLocality: 'Nha Trang',
    postalCode: '650000'
  }
};

const websiteDefault = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  datePublished: 'September 2022',
  url: websiteUrl,
  sameAs: [
    'https://www.facebook.com/abcsoftwaresolutionscompany',
    'https://www.linkedin.com/company/abc-software-solutions-company'
  ]
};

export const siteSettings = {
  name: 'To-Do List',
  logo: 'https://sharetodolist.com/android-chrome-512x512.png',
  cover: 'https://sharetodolist.com/og-abc.png',
  url: 'https://sharetodolist.com',
  defaultLanguage: 'en',
  description:
    'ABC Todo List is an advanced Todo List Web Application that can help you to make helpful work list and share for other people with realtime list',
  author: {
    name: 'ABC Software Solutions',
    websiteUrl: 'https://www.abcsoftwarecompany.com'
  },
  facebookUrl: 'https://www.facebook.com/abcsoftwaresolutionscompany',
  linkedInUrl: 'https://www.linkedin.com/company/abc-software-solutions-company',
  contact: {
    email: 'hello@abcsoftwarecompany.com'
  },
  schemaJsonLd: {
    organization: merge(organizationDefault, {name: 'ABC Software Solution'}),
    website: merge(websiteDefault, {name: 'To-Do List'})
  }
};
