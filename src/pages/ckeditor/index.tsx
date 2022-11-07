import {Controller, SubmitHandler, useForm} from 'react-hook-form';

import Editor from '@/components/common/ckeditor';
import DefaultLayout from '@/layouts/default';

interface Inputs {
  example: string;
}

export default function CKEditorPage() {
  const {handleSubmit, control} = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => alert(data.example);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-8">
      <h1>asdf</h1>
      <Controller
        name="example"
        rules={{required: true}}
        control={control}
        render={({field}) => <Editor name="example" value="" onChange={text => field.onChange(text)} />}
      />
      <input type="submit" />
    </form>
  );
}

CKEditorPage.Layout = DefaultLayout;
