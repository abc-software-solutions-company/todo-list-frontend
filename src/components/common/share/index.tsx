import cx from 'classnames';
import {FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton} from 'next-share';
import React from 'react';

import styles from './share.module.scss';

interface IProps {
  className?: string;
  title: string;
  description: string;
  url: string;
  hashtag?: string;
}

const Share: React.FC<IProps> = ({className, title, description, url, hashtag = ''}) => {
  return (
    <div className={cx(styles['mod-share'], className)}>
      <div className="list">
        <FacebookShareButton url={url} quote={description} hashtag={hashtag}>
          <FacebookIcon size={28} />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={28} />
        </TwitterShareButton>
        <LinkedinShareButton url={url} title={title}>
          <LinkedinIcon size={28} />
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export default Share;
