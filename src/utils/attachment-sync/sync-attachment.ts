import api from '@/data/api';
import {IAttachmentResponse} from '@/data/api/types/task.type';

import {extractImageLinks} from './extract-image-link';

interface ISyncAtachments {
  rawHTML: string;
  listAttachment: IAttachmentResponse[];
  id: string;
  update: () => void;
}

export const syncAttachments = ({rawHTML, listAttachment, id, update}: ISyncAtachments) => {
  const listImage = extractImageLinks(rawHTML);
  const currentAttachments: string[] = [];
  listAttachment.forEach(e => {
    currentAttachments.push(e.link);
  });

  listImage.forEach(e => {
    if (!currentAttachments.includes(e)) {
      api.task.update({id, attachment: {create: {name: `${e}.png`, link: e}}}).then(update);
      console.log('Upload ok');
    }
  });
};
