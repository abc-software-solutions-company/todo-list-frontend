import React, {FC, useEffect} from 'react';

const PopUpImage: FC = () => {
  // Instead of using a selector, define the gallery elements

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
    <div>
      <a href={'https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png'} className="glightbox">
        <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png" />
      </a>
    </div>
  );
};

export default PopUpImage;
