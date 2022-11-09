/* eslint-disable react/no-unknown-property */
import React, {useEffect} from 'react';

interface IPopUpImgProp {
  rawHTML: string;
}

const PopUpImageDangerous = ({rawHTML}: IPopUpImgProp) => {
  useEffect(() => {
    const glightbox = import(/* webpackChunkName: "vendor.glightbox" */ 'glightbox');
    import(/* webpackChunkName: "vendor.glightbox.style" */ 'glightbox/dist/css/glightbox.min.css');
    glightbox.then(resp => {
      const gLightbox = resp.default;
      gLightbox({
        selector: '.glightbox',
        loop: true
      });
    });
  }, []);
  return <>{rawHTML}</>;
};

export default PopUpImageDangerous;
