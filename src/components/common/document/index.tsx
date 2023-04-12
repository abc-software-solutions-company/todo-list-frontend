import cls from 'classnames';
import React, {useState} from 'react';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';

import OptionDocument from '../option-document';

interface IProps {
  iconDropdown?: any;
  content?: string;
  active?: boolean;
  showMoreDoc?: () => void;
  showContent?: () => void;
  getDocument: () => void;
}
const Document: React.FC<IProps> = ({content, iconDropdown, active, getDocument, showMoreDoc, showContent}) => {
  const [isRename, setIsRename] = useState<boolean>(false);

  return (
    <div className="relative">
      {!isRename ? (
        <div
          className={cls(
            active ? '-mx-3 bg-slate-100 px-3' : 'hover:rounded-md hover:bg-slate-100',
            'flex cursor-pointer justify-between py-3'
          )}
          onClick={getDocument}
        >
          <div className="flex w-full" onClick={showContent}>
            <Icon name="drop" className={iconDropdown} onClick={showMoreDoc} />
            {isRename ? (
              <Input autoFocus={true} value={content} />
            ) : (
              <p className="max-h-[25px] overflow-hidden">📗 {content}</p>
            )}
          </div>
          <OptionDocument onRename={() => {}} />
        </div>
      ) : (
        <>
          <Input value={content} autoFocus={true} />
          <Button text="Save" onClick={() => {}} />
        </>
      )}
    </div>
  );
};

export default Document;
