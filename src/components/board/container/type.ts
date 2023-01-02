import {IAssigneeResponse, IAttachmentResponse} from '@/data/api/types/task.type';

export default interface DNDCurrent {
  sortable: DNDSortable;
  id: string;
  name: string;
  isDone: boolean;
  statusId: string;
  index: string;
  priority: string;
  createdDate: string;
  assignees: IAssigneeResponse[];
  attachments: IAttachmentResponse[];
}

interface DNDSortable {
  containerId: string;
  index: number;
  items: string[];
}
