import cls from 'classnames';
import React from 'react';

import Icon from '@/core-ui/icon';

// import OptionDocument from '../option-document';

interface IProps {
  iconDropdown?: any;
  content?: string;
  active?: boolean;
  showMoreDoc?: () => void;
  showContent?: () => void;
  getDocument: () => void;
}
const Document: React.FC<IProps> = ({content, iconDropdown, active, getDocument, showMoreDoc, showContent}) => {
  return (
    <div className="relative min-w-[10rem]">
      <div
        className={cls(
          active ? '-mx-3 bg-slate-100 px-3' : 'hover:rounded-md hover:bg-slate-100',
          'flex cursor-pointer justify-between py-3'
        )}
        onClick={getDocument}
      >
        <div className="flex" onClick={showContent}>
          <Icon name="drop" className={iconDropdown} onClick={showMoreDoc} />
          <p className="max-h-[25px] overflow-hidden">📗 {content}</p>
        </div>
        {/* <OptionDocument /> */}
      </div>
    </div>
  );
};

export default Document;
