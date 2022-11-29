import dynamic from 'next/dynamic';
import {FC} from 'react';
import {Controller, SubmitHandler, UseFormReturn} from 'react-hook-form';

import Button from '@/core-ui/button';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import useTask from '@/states/task/use-task';
import {syncAttachments} from '@/utils/sync-attachment';
import {extractImageLinks} from '@/utils/sync-attachment/extract-image-link';

const Editor = dynamic(() => import('@/components/common/ckeditor'), {
  ssr: false
});

export interface IDescriptionForm {
  description: string;
}

interface Iprops {
  form: UseFormReturn<IDescriptionForm, any>;
  onClose: () => void;
  beforeChange?: string;
}

const DescriptionForm: FC<Iprops> = ({form, onClose, beforeChange}) => {
  const {task, update} = useTask();
  const {id, description} = task;
  const toast = useToast();
  const {handleSubmit, formState, control} = form;
  const {isSubmitting} = formState;

  const afterChange = () => {
    const listImageOld = extractImageLinks(beforeChange!);
    console.log(listImageOld);
  };

  const submitHandler: SubmitHandler<IDescriptionForm> = formData => {
    if (formData.description.includes('<img>')) {
      toast.show({type: 'warning', title: 'Warning', content: 'Image is still upload, please be patient'});
      return;
    }
    if (task) {
      api.task
        .update({id, ...formData})
        .then(update)
        .then(() => {
          syncAttachments({id, listAttachment: task.attachments, rawHTML: formData.description, update});
        })
        .then(() => afterChange())
        .then(() => toast.show({type: 'success', title: 'Update Description', content: 'success'}))
        .then(() => onClose())
        .catch(() => toast.show({type: 'danger', title: 'Error', content: 'An error occurred, please try again'}));
    }
  };

  return (
    <form className="decsription-form" onSubmit={handleSubmit(submitHandler)}>
      <Controller
        name="description"
        control={control}
        rules={{required: false}}
        defaultValue={description}
        render={({field}) => <Editor name="example" value={description} onChange={text => field.onChange(text)} />}
      />
      <div className="mt-4 flex gap-4">
        <Button
          className="max-w-20 h-8 px-2 text-sm"
          variant="contained"
          color="primary"
          text="Save"
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
        />
        <Button className="max-w-20 h-8 px-2 text-sm" variant="outlined" color="white" text="Cancel" onClick={onClose} type="button" />
      </div>
    </form>
  );
};
export default DescriptionForm;
