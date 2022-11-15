import dynamic from 'next/dynamic';
import {FC} from 'react';
import {Controller, SubmitHandler, UseFormReturn} from 'react-hook-form';

import useTask from '@/components/task-detail/hooks/use-task';
import Button from '@/core-ui/button';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {syncAttachments} from '@/utils/sync-attachment';
import {replaceOnlineLinkToS3Link} from '@/utils/upload-image-online/replace-online-link-to-s3-link';

const Editor = dynamic(() => import('@/components/common/ckeditor'), {
  ssr: false
});

export interface IDescriptionForm {
  description: string;
}

interface Iprops {
  form: UseFormReturn<IDescriptionForm, any>;
  onClose: () => void;
}

const DescriptionForm: FC<Iprops> = ({form, onClose}) => {
  const {task, update} = useTask();
  const {id, description} = task;
  const toast = useToast();
  const {handleSubmit, formState, control} = form;
  const {isSubmitting} = formState;

  const submitHandler: SubmitHandler<IDescriptionForm> = formData => {
    // replaceOnlineLinkToS3Link(formData.description);

    if (task) {
      // formData.description = replaceOnlineLinkToS3Link(formData.description);
      console.log(replaceOnlineLinkToS3Link(formData.description));

      api.task
        .update({id, ...formData})
        .then(update)
        .then(() => {
          syncAttachments({id, listAttachment: task.attachments, rawHTML: formData.description, update});
        })
        .then(() => toast.show({type: 'success', title: 'Update Description', content: 'success'}))
        .catch(() => toast.show({type: 'danger', title: 'Error', content: 'An error occurred, please try again'}));
    }
    onClose();
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
