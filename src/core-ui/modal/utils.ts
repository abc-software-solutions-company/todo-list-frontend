export function getVariantClass(currentVariant: string) {
  let result = '';
  switch (currentVariant) {
    case 'center':
      result = 'abc-modal--center';
      break;
    case 'fullscreen':
      result = 'abc-modal--fullscreen';
      break;
    case 'scrollable':
      result = 'abc-modal--scrollable';
      break;
    case 'scrollable-fullheight':
      result = 'abc-modal--scrollable-fullheight';
      break;
    default:
      result = 'abc-modal--top';
  }
  return result;
}

export function setBodyClass(value: boolean) {
  if (value) {
    document.body.classList.add('modal-opened');
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '8px';
  } else {
    document.body.classList.remove('modal-opened');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}
