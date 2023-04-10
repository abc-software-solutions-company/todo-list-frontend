import React, {useState} from 'react';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';

interface IProps {
  iconDropdown?: any;
  content?: string;
  isRename: boolean;
  showMoreDoc?: () => void;
  showContent?: () => void;
  showPopup?: () => void;
  onSave?: () => void;
}
const Document: React.FC<IProps> = ({content, iconDropdown, isRename, showMoreDoc, showContent, showPopup, onSave}) => {
  const [showOptions, setShowOptions] = useState(false);

  function handleMouseEnter() {
    setShowOptions(true);
  }

  function handleMouseLeave() {
    setShowOptions(false);
  }

  return (
    <div className="relative">
      {!isRename ? (
        <div
          className="flex cursor-pointer justify-between py-3 hover:rounded-md hover:bg-slate-100"
          onMouseOver={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex w-full" onClick={showContent}>
            <Icon name="drop" className={iconDropdown} onClick={showMoreDoc} />
            {isRename ? (
              <Input autoFocus={true} value={content} />
            ) : (
              <p className="max-h-[25px] overflow-hidden"> 📗 {content}</p>
            )}
          </div>
          {showOptions && (
            <div className="mr-4">
              <Icon name="more-vertical" className="ico-more-horizontal mr-3" size={20} onClick={showPopup} />
              <Icon name="plus" className="ico-plus" size={20} />
            </div>
          )}
        </div>
      ) : (
        <>
          <Input value={content} autoFocus={true} />
          <Button text="Save" onClick={onSave} />
        </>
      )}
    </div>
  );
};

export default Document;
