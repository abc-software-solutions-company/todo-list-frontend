import {CKEditor} from '@ckeditor/ckeditor5-react';
import aws from 'aws-sdk';
import {PutObjectRequest} from 'aws-sdk/clients/s3';
import React, {FC, useState} from 'react';

import ClassicEditor from './ckeditor';
import style from './styles.module.scss';

interface IEditorProps {
  name: string;
  value: string;
  onChange: (data: string) => void;
}

const Editor: FC<IEditorProps> = ({onChange, name, value}) => {
  const [isUpload, setIsUpload] = useState<boolean>(false);

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
              Key: `${process.env.NEXT_PUBLIC_AWS_BUCKET_ENV}/${fileName}.png`,
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

  return (
    <div className={style['ck-editor']}>
      <div className="prose max-w-full">
        <CKEditor
          name={name}
          onReady={(editor: any) => {
            editor.model.change((writer: any) => {
              writer.setSelection(editor.model.document.getRoot(), 'end');
            });
            editor.editing.view.focus();
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
      </div>
    </div>
  );
};

export default Editor;
