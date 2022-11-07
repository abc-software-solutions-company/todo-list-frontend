import React, {FC, useEffect, useRef, useState} from 'react';

import style from './style.module.scss';

interface IEditorProps {
  name: string;
  value: string;
  onChange: (data: string) => void;
}

const Editor: FC<IEditorProps> = ({onChange, name, value}) => {
  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const {CKEditor, ClassicEditor} = editorRef.current || {};

  useEffect(() => {
    (async () => {
      const classic = await import(/* webpackChunkName: "vendor.ckclassic" */ '@ckeditor/ckeditor5-build-classic');
      const editor = await import(/* webpackChunkName: "vendor.ckeditor" */ '@ckeditor/ckeditor5-react');
      editorRef.current = {CKEditor: editor.CKEditor, ClassicEditor: classic.default};
      setEditorLoaded(true);
    })();
  }, []);

  return (
    <div className={style.ckeditor}>
      {editorLoaded ? (
        <CKEditor
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading...</div>
      )}
    </div>
  );
};

export default Editor;
