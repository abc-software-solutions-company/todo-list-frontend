import aws from 'aws-sdk';
import {PutObjectRequest} from 'aws-sdk/clients/s3';
import React, {FC, useEffect, useRef, useState} from 'react';

import style from './styles.module.scss';

interface IEditorProps {
  name: string;
  value: string;
  onChange: (data: string) => void;
}

const Editor: FC<IEditorProps> = ({onChange, name, value}) => {
  aws.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION
  });

  const s3 = new aws.S3();

  const uploadAdapter = (loader: any) => {
    return {
      upload: () => {
        return new Promise((resolve: any, reject: any) => {
          const fileName = Date.now();

          loader.file.then((file: any) => {
            const s3ObjectRequest: PutObjectRequest = {
              Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
              Body: file,
              Key: `data1/${fileName}.png`,
              ACL: 'public-read'
            };
            s3.upload(s3ObjectRequest)
              .promise()
              .then(res => {
                console.log('here');
                resolve({default: `${res.Location}`});
              })
              .catch(err => {
                reject(err);
              });
          });
        });
      }
    };
  };

  const uploadPlugin = (editor: any) => {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return uploadAdapter(loader);
    };
  };

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
      <div className="prose">
        {editorLoaded ? (
          <CKEditor
            name={name}
            onReady={(editor: any) => {
              editor.focus();
            }}
            id={'editor'}
            config={{
              extraPlugins: [uploadPlugin]
            }}
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
    </div>
  );
};

export default Editor;
