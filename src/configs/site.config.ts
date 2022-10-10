import {merge} from 'lodash-es';

const WEBSITE_NAME = 'To-Do List';
const WEBSITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const COMPANY_NAME = 'ABC Software Solutions';
const COMPANY_URL = 'https://abcsoftwarecompany.com';
const COMPANY_SOCIAL = {
  facebook: 'https://www.facebook.com/abcsoftwaresolutionscompany',
  twitter: 'https://www.linkedin.com/company/abc-software-solutions-company'
};

const companyApps = [
  ...Object.values(COMPANY_SOCIAL),
  'https://voteuserstory.com',
  'https://sharetodolist.com',
  'https://pickonename.com'
];

const organizationDefault = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  founder: 'Khanh Mai',
  url: COMPANY_URL,
  logo: `${COMPANY_URL}/android-chrome-512x512.png`,
  image: `${COMPANY_URL}/og-abc.png`,
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
  url: WEBSITE_URL,
  sameAs: companyApps.filter(x => x !== WEBSITE_URL)
};

export const siteSettings = {
  name: WEBSITE_NAME,
  logo: `${WEBSITE_URL}/android-chrome-512x512.png`,
  cover: {url: `${WEBSITE_URL}/og-img.png`, width: 1200, height: 630, alt: WEBSITE_NAME},
  url: WEBSITE_URL,
  defaultLanguage: 'en',
  author: {
    name: `${COMPANY_NAME} Company`,
    websiteUrl: COMPANY_URL,
    email: 'hello@abcsoftwarecompany.com',
    socials: COMPANY_SOCIAL
  },
  description:
    'ABC Todo List is an advanced Todo List Web Application that can help you to make helpful work list and share for other people with realtime list',
  keyword: 'share to-do list online, check notes, to-do list, checklist, kanban',
  schemaJsonLd: {
    organization: merge(organizationDefault, {name: COMPANY_NAME}),
    website: merge(websiteDefault, {name: WEBSITE_NAME})
  }
};
