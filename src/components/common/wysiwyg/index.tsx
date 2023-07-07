import React, {useCallback, useEffect} from 'react';

import {replaceCdnUrl} from '@/utils/misc';

interface IProps {
  className?: string;
  content: any;
}

function wrapImage() {
  const imageNode = document.querySelectorAll('.wysiwyg img') as NodeList;
  const images = Array.from(imageNode) as HTMLImageElement[];
  images.forEach(elem => {
    const anchor = document.createElement('a');
    anchor.href = elem.src;
    anchor.className = 'glightbox';
    const parent = elem.parentElement as HTMLElement;
    parent.insertBefore(anchor, elem);
    anchor.appendChild(elem);
  });
}

const WYSIWYG: React.FC<IProps> = ({content}) => {
  const ref = useCallback((node: HTMLDivElement) => {
    if (node) wrapImage();
  }, []);

  useEffect(() => {
    const prismjs = import('prismjs');
    prismjs.then(resp => {
      const prism = resp.default;
      prism.highlightAll();
    });

    const glightbox = import('glightbox');
    import('glightbox/dist/css/glightbox.min.css');
    glightbox.then(resp => {
      const gLightbox = resp.default;
      gLightbox({
        selector: '.glightbox',
        loop: true
      });
    });
  }, [content]);

  return <div ref={ref} className="wysiwyg" dangerouslySetInnerHTML={{__html: replaceCdnUrl(content) || ''}}></div>;
};

export default WYSIWYG;
