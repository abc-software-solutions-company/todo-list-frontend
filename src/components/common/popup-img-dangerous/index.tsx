/* eslint-disable react/no-unknown-property */
import React, {useEffect} from 'react';

import {wrapperRawHTML} from './wrapper-raw-html';

interface IPopUpImgProp {
  rawHTML: string;
}

const customLightboxHTML = `<div id="glightbox-body" class="glightbox-container">
    <div class="gloader visible"></div>
    <div class="goverlay"></div>
    <div class="gcontainer">
    <div id="glightbox-slider" class="gslider"></div>
    <button class="gnext gbtn" tabindex="0" aria-label="Next" style="display: none;" data-customattribute="example">{nextSVG}</button>
    <button class="gprev gbtn" tabindex="1" aria-label="Previous" style="display: none;">{prevSVG}</button>
    <button class="gclose gbtn" tabindex="2" aria-label="Close">{closeSVG}</button>
</div>
</div>`;

const PopUpImageDangerous = ({rawHTML}: IPopUpImgProp) => {
  useEffect(() => {
    const glightbox = import(/* webpackChunkName: "vendor.glightbox" */ 'glightbox');
    // import(/* webpackChunkName: "vendor.glightbox.style" */ 'glightbox/dist/css/glightbox.min.css');
    glightbox.then(resp => {
      const gLightbox = resp.default;
      setTimeout(() => {
        gLightbox({
          selector: '.glightbox-danger',
          lightboxHTML: customLightboxHTML,
          loop: false,
          keyboardNavigation: false,
          draggable: false,
          closeOnOutsideClick: true,
          touchNavigation: false
        });
      }, 500);
    });
  }, []);
  return (
    <>
      <div dangerouslySetInnerHTML={{__html: wrapperRawHTML(rawHTML)}}></div>
    </>
  );
};

export default PopUpImageDangerous;
