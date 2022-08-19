import {Dialog, Transition} from '@headlessui/react';
import {Fragment, useContext} from 'react';
import cn from 'classnames';
import styles from './style.module.scss';
import ModalCtx from '@/contexts/modal.context';

interface IProps {
  heading: string;
}

const ModalDelete: React.FC<IProps> = props => {
  const modalContext = useContext(ModalCtx);

  return (
    <>
      <Transition appear show={modalContext?.isOpen} as={Fragment}>
        <Dialog as="div" className={cn(styles['section-modal-delete'])} onClose={modalContext?.hide}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="backdrop" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="panel">
                  {/* <Dialog.Title as="" className=""> */}
                  <div className="panel-wrapper">
                    <Dialog.Title className="heading">{`Are you sure you want to delete ${props.heading}`}</Dialog.Title>

                    <div className="button-wrapper">
                      <button type="button" className="btn btn-cancel" onClick={modalContext?.hide}>
                        No
                      </button>
                      <button type="button" className="btn btn-create">
                        Yes
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalDelete;
