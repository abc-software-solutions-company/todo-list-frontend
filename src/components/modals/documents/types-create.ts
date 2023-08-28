export interface IProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  docChild?: boolean;
}

export interface IFormInputs {
  name: string;
  content?: string;
}
