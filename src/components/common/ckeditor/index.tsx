import React, {FC, useEffect, useRef, useState} from 'react';

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
    editorRef.current = {
      // ClassicEditor: import(/* webpackChunkName: "vendor.ckclassic" */ '@ckeditor/ckeditor5-build-classic')
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    };
    setTimeout(() => {
      setEditorLoaded(true);
    }, 3000);
  }, []);

  return (
    <div className="mx-8">
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
