import React, {useEffect, useState} from 'react';

import Icon from '@/core-ui/icon';

import OptionDocument from '../option-document';

interface IProps {
  showMoreDoc?: () => void;
  showContent?: () => void;
  iconDropdown?: any;
  content?: string;
}
const Document: React.FC<IProps> = ({showMoreDoc, showContent, content, iconDropdown}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showPopupOptions, setShowPopupOptions] = useState(false);

  function handleMouseEnter() {
    setShowOptions(true);
  }

  function handleMouseLeave() {
    setShowOptions(false);
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (showPopupOptions && !event.target.closest('.options')) {
        setShowPopupOptions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopupOptions]);

  return (
    <div className="relative">
      <div
        className="flex cursor-pointer justify-between py-3 hover:rounded-md hover:bg-slate-100"
        onMouseOver={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex w-full" onClick={showContent}>
          <Icon name="drop" className={iconDropdown} onClick={showMoreDoc} />
          <p className="max-h-[25px] overflow-hidden"> 📗 {content}</p>
        </div>
        {showOptions && (
          <div className="mr-4">
            <Icon
              name="more-vertical"
              className="ico-more-horizontal mr-3"
              size={20}
              onClick={() => {
                setShowPopupOptions(!showPopupOptions);
              }}
            />
            <Icon name="plus" className="ico-plus" size={20} />
          </div>
        )}
      </div>
      {showPopupOptions && <OptionDocument />}
    </div>
  );
};

export default Document;
