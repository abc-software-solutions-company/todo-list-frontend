/* eslint-disable react/no-unknown-property */
import React, {useEffect} from 'react';

import {wrapperRawHTML} from './wrapper-raw-html';

interface IPopUpImgProp {
  rawHTML: string;
}

const PopUpImageDangerous = ({rawHTML}: IPopUpImgProp) => {
  useEffect(() => {
    const glightbox = import(/* webpackChunkName: "vendor.glightbox" */ 'glightbox');
    import(/* webpackChunkName: "vendor.glightbox.style" */ 'glightbox/dist/css/glightbox.min.css');
    glightbox.then(resp => {
      const gLightbox = resp.default;
      setTimeout(
        () =>
          gLightbox({
            selector: '.glightbox',
            loop: true
          }),
        500
      );
    });
  }, []);
  return (
    <>
      <div dangerouslySetInnerHTML={{__html: wrapperRawHTML(rawHTML)}}></div>
    </>
  );
};

export default PopUpImageDangerous;
