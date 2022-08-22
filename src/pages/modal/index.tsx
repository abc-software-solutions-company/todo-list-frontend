import {Dialog, Transition} from '@headlessui/react';
import Image from 'next/image';
import {Fragment, useState} from 'react';

import IconClose from '@/assets/images/icon-close-modal.svg';

import styles from './style.module.scss';

export default function ModalShare() {
  const [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button type="button" onClick={openModal} className="btn-modal">
          MODAL SHARE
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className={styles['create-modal-share']} onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="modal-form">
                  <div className="modal-share">
                    <div className="container">
                      <div className="icon-close" onClick={closeModal}>
                        <Image src={IconClose} alt="Close" width={21} height={21} />
                      </div>
                      <div className="title-modal">Share this list to a teammate</div>
                      <div className="content-modal">
                        <div className="input-group-link">
                          <label className="title-label" htmlFor="">
                            Link:
                          </label>
                        </div>
                        <div className="input-group-modal  ">
                          <input
                            type="text"
                            className="form-control-modal"
                            placeholder="https://to-do-list/board/#8f677ssf"
                          />
                          <div className="input-group-copy">Copy</div>
                        </div>
                        <div className="input-group-ID">
                          <label className="title-label" htmlFor="">
                            ID List:
                          </label>
                        </div>
                        <div className="input-group-modal  ">
                          <input type="text" className="form-control-modal" placeholder="A0001" />
                          <div className="input-group-copy">Copy</div>
                        </div>
                      </div>
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
}
