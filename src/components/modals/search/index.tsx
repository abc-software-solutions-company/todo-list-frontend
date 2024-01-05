import cls from 'classnames';
import {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';

import Modal from '@/core-ui/modal';

import styles from './style-search.module.scss';
import Icon from '@/core-ui/icon';
import {IProps} from './type-search';
import Input from '@/core-ui/input';
import SearchModalItems from './items';
import {useTasksSearch} from '@/hooks/useTasksSearch';
import {debounce} from 'lodash-es';

const ModalSearch: FC<IProps> = props => {
  const {open, onClose} = props;
  const {tasks, search} = useTasksSearch();
  const [query, setQuery] = useState('');

  if (!open) return null;

  const debounceSearch = debounce(onChange, 500);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    if(value.trim()) {
      search(value.trim());
    }
  }

  return (
    <Modal variant="center" open={open} onClose={onClose} showCloseButton={false} className="w-[606px]">
      <form className="w-full">
        <Modal.Body className={cls(styles['com-modal-search'])}>
          <div className="flex w-full flex-col items-start gap-6">
            <div className="flex items-center gap-[21px] self-stretch border-b-[0.5px] border-gray-400 py-3">
              <Icon name="ico-search" className="pointer-events-none" />
              <Input
                autoFocus
                type="search"
                placeholder="search..."
                className="border-none bg-inherit text-lg leading-6 text-gray-500"
                value={query}
                onChange={debounceSearch}
              />
            </div>
            {tasks?.length > 0 ? (
              <>
                {tasks.map(task => (
                  <p>{task.name}</p>
                ))}
              </>
            ) : (
              <>
                <SearchModalItems type="recently" />
                <SearchModalItems type="navigation" />
              </>
            )}
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
};

export default ModalSearch;
