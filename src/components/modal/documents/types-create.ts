// import {IDocumentAttribute} from '@/data/api/types/documents.type';

export interface IProps {
  open: boolean;
  onClose: () => void;
  docChild?: boolean;
  // data: IDocumentAttribute;
}

export interface IFormInputs {
  name: string;
  content?: string;
}
