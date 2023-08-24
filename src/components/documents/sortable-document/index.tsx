import classNames from 'classnames';
import React, {FC, ReactNode, useEffect, useRef} from 'react';
import Sortable, {SortableEvent} from 'sortablejs';

import {IBaseProps} from '@/types';

interface ISortableDocumentProps extends IBaseProps {
  children?: ReactNode;
  onMove?: (e: SortableEvent) => void;
}

const SortableDocument: FC<ISortableDocumentProps> = ({children, className, onMove}) => {
  const matcherRef = useRef(null);

  useEffect(() => {
    if (!matcherRef.current) return;

    const element = matcherRef.current as HTMLElement;

    const nestedItems: HTMLElement[] = Array.from(element.querySelectorAll('.nested-item'));
    nestedItems.forEach(
      x =>
        new Sortable(x, {
          group: 'nested',
          animation: 300,
          onMove: function (evt) {
            if (evt.to.childElementCount > 0) return false;
          }
        })
    );

    const nestedSortables: HTMLElement[] = Array.from(element.querySelectorAll('.nested-sortable'));
    nestedSortables.forEach(
      y =>
        new Sortable(y, {
          group: 'nested',
          animation: 300,
          fallbackOnBody: true,
          swapThreshold: 0.65,
          invertSwap: true,
          onMove: function (evt) {
            if (evt.to.childElementCount > 0) return false;
          },
          onEnd(e: SortableEvent) {
            onMove?.(e);
          }
        })
    );
  }, [matcherRef.current]);

  return (
    <div className={(classNames('matcher'), className)} ref={matcherRef}>
      {children}
    </div>
  );
};

export default SortableDocument;
