'use client'

import OptionSelection from '@/app/_components/OptionSelection';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { IoAddSharp } from 'react-icons/io5'

interface NewUnitDialogProps {
    user_id: string;
    styles?: string;
    onAddClick?: any;
}

export interface OjbectOptionType{
    label: string;
    value: string;
    realValue: string;
}


export default function NewUnitDialog({user_id, styles, onAddClick}: NewUnitDialogProps) {
    let [isOpen, setIsOpen] = useState(false);
    let [selected, setSelected] = useState<any>(null)

	const HandleAddClick = () => {
		onAddClick(selected)
		//setIsOpen(false)
	}

    const HandleSelectionChange = (selection: any) => {
        setSelected(selection)
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

  return (
    <>
      <div className="inset-0 justify-center">
        <button
          type="button"
          onClick={openModal}
          className={`${styles}`}
        >
          <IoAddSharp className='text-2xl font-thin text-gray-400"' />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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

          <div className="fixed inset-0">
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
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl p-6 text-left shadow-xl transition-all 
                                            border-transparent border-4 dark:dark:border-yellow-900/50 text-yellow-200/70 dark:bg-[url('/bg1.jpg')]">
                  	<Dialog.Title
                  	  as="h3"
                  	  className="text-lg font-medium leading-6 text-yellow-200/70"
                  	>
                  	  Add Unit
                  	</Dialog.Title>

                  	{/* Dialog Content */}
                  	<OptionSelection  endpoint={`/units/user/extended/${user_id}?include_items=true&include_race=true&include_specialization=true&include_culture=true&include_belief=true`}
                                    queryKey={'units'} 
                                    onSelectionChange={HandleSelectionChange} />

                    <div className="mt-4 flex justify-between">
                      <button type="button"
                          className="inline-flex justify-center rounded-md bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 px-4 py-2 text-sm font-medium text-gray-400  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2"
                          onClick={closeModal} >
                        Cancel
                      </button>
                      <button type="button"
                          className="inline-flex justify-center rounded-md bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 px-4 py-2 text-sm font-medium text-gray-400  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2"
                          onClick={HandleAddClick} >
                        Add
                      </button>
                    </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
