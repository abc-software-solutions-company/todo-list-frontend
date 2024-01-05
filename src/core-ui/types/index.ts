export type XPosition = 'start' | 'end';

export type AnchorTargetType = '_self' | '_blank' | '_parent' | '_top';

export type ButtonVariantType = 'default' | 'contained' | 'outlined';

export type TextInputType =
  | 'text'
  | 'email'
  | 'url'
  | 'password'
  | 'number'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'search'
  | 'tel'
  | 'time'
  | 'week';

export type ColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'dark'
  | 'light'
  | 'white';

export type CompomentSizeType = 'sm' | 'md' | 'lg' | 'default';

export type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type ModalVariantType = 'top' | 'center' | 'scrollable' | 'scrollable-fullheight' | 'fullscreen';

export type FontWeightType = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type IconSizeType = 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 64;

export type LoadingSizeType = 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48;

export type LoadingThicknessType = 0 | 2 | 4 | 6 | 8 | 10 | 12 | 14 | 16 | 18 | 20;

export type AvatarSizeType = 32 | 36 | 40 | 44 | 48;

export type RoundedType = 0 | 2 | 4 | 6 | 8 | 12 | 14 | 16 | 18 | 20 | 22 | 24;

export type SpacingType = RoundedType;

export interface ICoreUIBaseProps {
  className?: string;
  visible?: boolean;
  disabled?: boolean;
}
