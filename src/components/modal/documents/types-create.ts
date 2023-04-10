import {IDocumentResponse} from '@/data/api/types/documents.type';

export interface IProps {
  open: boolean;
  onClose: () => void;
  hiddenVisibility?: boolean;
  data?: IDocumentResponse;
}
