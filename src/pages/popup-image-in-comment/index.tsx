import Image from 'next/image';
import React from 'react';

import PopUpImage from '@/components/common/popup-img';

import {extractUrl} from './utils/extract-url';
import {rawDataTest} from './utils/rawData';

const listImageFromComment = extractUrl(rawDataTest);
console.log(listImageFromComment);

export default function PopUpImageInComment() {
  return (
    <div>
      {listImageFromComment.map((e, idx) => (
        <>
          <PopUpImage imageList={[e]}>
            <Image src={e} key={idx} width={400} height={400} alt={idx.toString()} />
          </PopUpImage>
        </>
      ))}
      <div className="description-text prose" dangerouslySetInnerHTML={{__html: rawDataTest}}></div>
    </div>
  );
}
