/* eslint-disable react/no-unknown-property */
import React, {ReactNode, useEffect} from 'react';

interface IPopUpImgProp {
  imageList: string[];
  children: ReactNode;
}

const PopUpImage = ({imageList, children}: IPopUpImgProp) => {
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
  return (
    <>
      <a className="open-slide glightbox no-underline" glight-box-ref={0} href={imageList[0]}>
        {children}
      </a>
      <div className="glightbox-list">
        {imageList.slice(1).map((img, idx) => (
          <a href={img} glight-box-ref={idx} className="glightbox hidden" key={idx}>
            {idx}
          </a>
        ))}
      </div>
    </>
  );
};

export default PopUpImage;
