import dynamic from 'next/dynamic';
import React from 'react';

const ReactBeautifullDND = dynamic(() => import('@/components/react-beautifull-dnd'), {
  ssr: false
});

export default function ReactDND() {
  return (
    <div>
      ReactDND
      <ReactBeautifullDND />
    </div>
  );
}
