import dynamic from 'next/dynamic';
import {FC} from 'react';

const Editor = dynamic(() => import('@/components/common/ckeditor'), {
  ssr: false
});

const PreLoadCKEditor: FC = () => {
  return (
    <div className="preload-ckeditor hidden">
      <Editor name="preload-ckeditor" value={''} onChange={() => {}} />
    </div>
  );
};

export default PreLoadCKEditor;
