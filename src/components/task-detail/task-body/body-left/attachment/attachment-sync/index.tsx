import {dataTestAttachmentSync} from './utils/data-test';
import {extractImageLinks} from './utils/extract-image-link';

const AttachmentSync = () => {
  console.log(extractImageLinks(dataTestAttachmentSync));

  return <>AttachmentSync</>;
};

export default AttachmentSync;
