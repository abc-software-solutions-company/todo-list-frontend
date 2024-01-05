export interface IBaseResponse {
  createdDate: string;
  updatedDate: string;
}
export interface IBaseProps {
  className?: string;
  visible?: boolean;
  disabled?: boolean;
}

export interface IStateInit {
  isCreating?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
  isFeching?: boolean;
  error?: boolean;
}