import {IDocumentResponse} from '@/data/api/types/document.type';

export interface IProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  hiddenVisibility?: boolean;
  data?: IDocumentResponse;
}
