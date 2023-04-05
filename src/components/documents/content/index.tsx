import dynamic from 'next/dynamic';
import React, {useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import useToast from '@/core-ui/toast';
import {useDocumentsStore} from '@/hooks/useDocuments';
import {ToastContents} from '@/utils/toast-content';

import style from './style.module.scss';

const Editor = dynamic(() => import('@/components/common/ckeditor'), {
  ssr: false
});

export interface IForm {
  content: string;
}

const DocumentContent: React.FC = () => {
  const [edit, setEdit] = useState(false);
  const {show} = useToast();
  const {document, updateDocument, error} = useDocumentsStore();
  const {id, name, content, favorite} = document;
  const {control, handleSubmit} = useForm({
    defaultValues: {
      content: content
    }
  });
  const onSubmit: SubmitHandler<IForm> = data => {
    updateDocument({id, name, ...data, favorite});
    if (error) {
      setEdit(true);
      show({type: 'danger', title: 'Edit Content', content: ToastContents.ERROR});
    } else {
      setEdit(false);
      show({type: 'success', title: 'Edit Content', content: ToastContents.SUCCESS});
    }
  };

  return (
    <div className={style['document-content']}>
      <div>
        <Icon name="content" className="ico-fluent_text-description mr-1" size={20} />
        <span className="mr-3">Content</span>
        <Button
          text="Edit"
          className="bg-slate-100"
          onClick={() => {
            setEdit(!edit);
          }}
        />
      </div>
      {edit ? (
        <form className="decsription-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="content"
            control={control}
            rules={{required: false}}
            defaultValue={content}
            render={({field}) => <Editor name="example" value={content} onChange={text => field.onChange(text)} />}
          />
          <div className="mt-4 flex gap-4">
            <Button
              className="max-w-20 h-8 px-2 text-sm"
              variant="contained"
              color="primary"
              text="Save"
              type="submit"
            />
            <Button
              className="max-w-20 h-8 px-2 text-sm"
              variant="outlined"
              color="white"
              text="Cancel"
              type="button"
              onClick={() => setEdit(false)}
            />
          </div>
        </form>
      ) : (
        <div className="mt-4" dangerouslySetInnerHTML={{__html: content}} />
      )}
    </div>
  );
};

export default DocumentContent;
