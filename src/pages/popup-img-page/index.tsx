import React from 'react';

import Seo from '@/components/common/seo/seo';

import PopUpImage from './component/popup-img';

const imageList = [
  'https://biati-digital.github.io/glightbox/demo/img/large/gm1.jpg',
  'https://biati-digital.github.io/glightbox/demo/img/large/gm2.jpg',
  'https://biati-digital.github.io/glightbox/demo/img/large/gm3.jpg',
  'https://biati-digital.github.io/glightbox/demo/img/large/gm4.jpg'
];

export default function PagePopupImf() {
  return (
    <>
      <Seo title="Lobby" />
      <PopUpImage imageList={imageList} />
    </>
  );
}
