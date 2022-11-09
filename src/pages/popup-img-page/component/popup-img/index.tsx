import React, {useEffect} from 'react';

interface IPopUpImgProp {
  imageList: string[];
}

const PopUpImage = ({imageList}: IPopUpImgProp) => {
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
      <a className="open-slide glightbox no-underline" href={imageList[0]}>
        Open
      </a>
      <div className="glightbox-list">
        {imageList.slice(1).map((img, idx) => (
          <a href={img} className="glightbox hidden" key={idx}>
            {idx}
          </a>
        ))}
      </div>
    </>
  );
};

export default PopUpImage;
