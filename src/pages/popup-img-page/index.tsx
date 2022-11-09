import React from 'react';

import Seo from '@/components/common/seo/seo';

import PopUpImage from './component/popup-img';

const imageList = [
  'https://images.unsplash.com/photo-1667860920561-d04bdc84c40f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1667827002305-db653e752375?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1661956601349-f61c959a8fd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  'https://plus.unsplash.com/premium_photo-1661812995850-4af1d752082e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
];

export default function PagePopupImf() {
  return (
    <>
      <Seo title="Lobby" />
      <PopUpImage imageList={imageList} />
    </>
  );
}
