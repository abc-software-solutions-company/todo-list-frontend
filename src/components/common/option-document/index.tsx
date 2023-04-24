import React, {FC, useState} from 'react';

import Tool, {IToolProps} from '@/components/lists-detail/toolbar/tool';
import ToolMenu from '@/components/lists-detail/toolbar/tool-menu';
import ModalCreateDocument from '@/components/modal/documents/modal-create';
import ModalDeleteDocument from '@/components/modal/documents/modal-delete';
import ModalUpdateDocument from '@/components/modal/documents/modal-update';
import Icon from '@/core-ui/icon';
import {MUI_ICON} from '@/utils/mui-icon';

export interface IProps {
  textFavorite: string;
  handleFavorite: () => void;
}

const OptionDocument: FC<IProps> = ({textFavorite, handleFavorite}) => {
  const [creteChildDoc, isCreateChildDoc] = useState<boolean>(false);
  const [showModalUpdate, isShowModalUpdate] = useState<boolean>(false);
  const [showModalDelete, isShowModalDelete] = useState<boolean>(false);

  const renameToolProps: IToolProps = {
    icon: <></>,
    text: 'Rename',
    onClick: () => isShowModalUpdate(true)
  };

  const addFavoriteToolProps: IToolProps = {
    icon: <></>,
    text: textFavorite,
    onClick: () => handleFavorite()
  };

  const deleteToolProps: IToolProps = {
    icon: <></>,
    text: 'Delete',
    onClick: () => isShowModalDelete(true)
  };
  const toolMenuItems = [renameToolProps, addFavoriteToolProps, deleteToolProps].map((item, idx) => (
    <Tool key={idx} {...{...item, className: 'flex-row-reverse w-full justify-end'}} />
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
      {showModalUpdate && <ModalUpdateDocument open={showModalUpdate} onClose={() => isShowModalUpdate(false)} />}
      {showModalDelete && <ModalDeleteDocument open={showModalDelete} onClose={() => isShowModalDelete(false)} />}
    </>
  );
};

export default OptionDocument;
