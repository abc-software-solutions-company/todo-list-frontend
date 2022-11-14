import {extractImageLinks} from './utils/extract-image-link';

interface IProp {
  value: string;
}

const AttachmentSync = ({value}: IProp) => {
  const result = extractImageLinks(value);

  return result;
};

export default AttachmentSync;
