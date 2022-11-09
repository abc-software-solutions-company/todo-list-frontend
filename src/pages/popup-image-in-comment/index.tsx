import React from 'react';

import PopUpImageDangerous from '@/components/common/popup-img-dangerous';

import {extractUrl} from './utils/extract-url';
import {rawDataTest} from './utils/rawData';

export default function PopUpImageInComment() {
  return (
    <div>
      <PopUpImageDangerous rawHTML={extractUrl(rawDataTest)} />
    </div>
  );
}
