import {merge} from 'lodash-es';

const schemaJsonLdOrganizationDefault = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  founder: 'Khanh Mai',
  logo: 'https://stage.abcsoftwarecompany.com/og-abc.jpg',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'Viet Nam',
    addressRegion: 'Nha Trang',
    postalCode: '650000'
  }
};

const schemaJsonLdWebSiteDefault = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  datePublished: 'February 2022',
  inLanguage: [
    {
      '@type': 'Language',
      name: 'Vietnamese',
      alternateName: 'vn',
      additionalType: 'https://www.loc.gov/standards/iso639-2/php/code_list.php',
      sameAs: 'https://en.wikipedia.org/wiki/Vietnamese_language'
    },
    {
      '@type': 'Language',
      name: 'English',
      alternateName: 'en',
      additionalType: 'https://www.loc.gov/standards/iso639-2/php/code_list.php',
      sameAs: 'https://en.wikipedia.org/wiki/English_language'
    }
  ],
  url: 'https://stage.abcsoftwarecompany.com/',
  sameAs: [
    'https://www.facebook.com/abcsoftwaresolutionscompany?utm_source=abcsoftwarecompany.com&utm_medium=banner&utm_campaign=n%2Fa',
    'https://www.linkedin.com/company/abc-software-solutions-company/about/'
  ],
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://stage.abcsoftwarecompany.com/pages/search_results?q={search_term}',
    'query-input': 'required name=search_term'
  }
};

export const siteSettings = {
  name: 'ToDo List',
  description: 'Simple solutions for complex problems',
  defaultLanguage: 'vi',
  phoneNumber: '0987654321',
  facebookUrl: '#',
  twitterUrl: '#',
  linkedInUrl: '#',
  email: 'hello@abcsoftwarecompany.com',
  author: {
    name: 'ToDo List',
    websiteUrl: 'https://www.abcsoftwarecompany.com',
    address: ''
  },
  logo: {
    url: 'https://www.abcsoftwarecompany.com',
    alt: 'ToDo List',
    href: '/',
    width: 128,
    height: 30
  },
  schemaJsonLd: {
    index: [
      merge(schemaJsonLdOrganizationDefault, {
        name: 'ABC Software Solution'
      }),
      merge(schemaJsonLdWebSiteDefault, {})
    ],
    blog: {
      ...schemaJsonLdWebSiteDefault,
      name: 'ABC Software Solution | Blog',
      description:
        'ABC blog. Here Are the places our company members sharing their learning experiences about different catagories. Read the experiences and learning it, get updates and more.'
    },
    showcases: [
      merge(schemaJsonLdOrganizationDefault, {
        name: 'ABC Software Solution | Showcases',
        description: 'ABC showcases, where we show you about all the project we had worked on.'
      }),
      merge(schemaJsonLdWebSiteDefault, {})
    ],
    contact: [
      merge(schemaJsonLdOrganizationDefault, {
        name: 'ABC Software Solution | Contact Us',
        description: 'Get in touch with us, contact us via email and we will response promptly',
        email: 'hello@abcsoftwarecompany.com',
        telephone: '+84372909818'
      }),
      merge(schemaJsonLdWebSiteDefault, {})
    ]
  }
};
