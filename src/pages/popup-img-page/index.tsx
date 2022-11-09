import React from 'react';

import Seo from '@/components/common/seo/seo';
import Button from '@/core-ui/button';

import PopUpImage from '../../components/common/popup-img';

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
      <PopUpImage imageList={imageList}>
        <Button className="max-w-sm" variant="contained" color="info" text={'Show slideshow'} type="submit" />
      </PopUpImage>
    </>
  );
}
