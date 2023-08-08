import Prism from 'prismjs';
import React, {useCallback, useEffect} from 'react';

import {replaceCdnUrl} from '@/utils/misc';

interface IProps {
  className?: string;
  content: any;
  render: any;
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

const WYSIWYG: React.FC<IProps> = ({content, render}) => {
  const ref = useCallback(
    (node: HTMLDivElement) => {
      if (node) wrapImage();
    },
    [render]
  );

  useEffect(() => {
    if (typeof window !== 'undefined') Prism.highlightAll();

    const glightbox = import('glightbox');
    import('glightbox/dist/css/glightbox.min.css');
    glightbox.then(resp => {
      const gLightbox = resp.default;
      gLightbox({
        selector: '.glightbox',
        loop: true
      });
    });
  }, [render]);

  return (
    <div
      ref={ref}
      className="wysiwyg ck-content prose"
      dangerouslySetInnerHTML={{__html: replaceCdnUrl(content) || ''}}
    ></div>
  );
};

export default WYSIWYG;
