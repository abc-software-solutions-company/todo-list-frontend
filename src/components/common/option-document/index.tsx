import React, {FC, useState} from 'react';

import Tool, {IToolProps} from '@/components/lists-detail/toolbar/tool';
import ToolMenu from '@/components/lists-detail/toolbar/tool-menu';
import ModalCreateDocument from '@/components/modal/documents/modal-create';
import Icon from '@/core-ui/icon';
import {MUI_ICON} from '@/utils/mui-icon';

interface Iprops {
  onRename?: () => void;
  onAddFavorite?: () => void;
  onDelete?: () => void;
}
const OptionDocument: FC<Iprops> = ({onAddFavorite, onDelete, onRename}) => {
  const [creteChildDoc, isCreateChildDoc] = useState<boolean>(false);
  const renameToolProps: IToolProps = {
    icon: <></>,
    text: 'Rename',
    onClick: onRename
  };

  const favoriteToolProps: IToolProps = {
    icon: <></>,
    text: 'Add to favorite',
    onClick: onAddFavorite
  };

  const deleteToolProps: IToolProps = {
    icon: <></>,
    text: 'Delete',
    onClick: onDelete
  };
  //FIXME:Click name can call action, but click outside name not active action, please fill color button for deubg.
  const toolMenuItems = [renameToolProps, favoriteToolProps, deleteToolProps].map((item, idx) => (
    <Tool key={idx} {...{...item, className: 'flex-row-reverse w-full'}} />
  ));
  return (
    <>
      <div className="ml-2 flex space-x-3">
        <ToolMenu display="alway" icon={<MUI_ICON.MORE_HORIZON />} items={toolMenuItems} margin={-0.5} />
        <Icon
          name="plus"
          className="ico-plus"
          size={20}
          onClick={() => {
            isCreateChildDoc(true);
          }}
        />
      </div>
      {creteChildDoc && (
        <ModalCreateDocument open={creteChildDoc} onClose={() => isCreateChildDoc(false)} docChild={true} />
      )}
    </>
  );
};

export default OptionDocument;
