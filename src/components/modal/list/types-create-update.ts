import {ITodolistKanbanResponse, ITodolistResponse} from '@/data/api/types/todolist.type';

export interface IProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  hiddenVisibility?: boolean;
  data?: ITodolistResponse | ITodolistKanbanResponse;
}
