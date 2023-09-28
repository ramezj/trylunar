import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FolderPlusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import CreateProject from '../board/CreateProject';

export default function Create() {
    const router = useRouter();
    let [isOpen, setIsOpen] = useState(false)
    function closeModal() {
      setIsOpen(false)
    }

    function openModal() {
      setIsOpen(true)
    }
    const [ text, setText ] = useState("Create Board");
    const [ loading, setLoading ] = useState(false);
    const [ name, setName ] = useState();
    const [ error, setError ] = useState();
    const [ url, setUrl ] = useState();
    const [ response, setResponse ] = useState();
    const createProject = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch('/api/board/new', {
            method:'POST',
            headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name: name,
                url: url
              })
        });
        const resp = await res.json();
        if(resp.ok == true) {
            setLoading(false);
            setText("Created Successfully");
            setResponse(resp);
            console.log(resp);
            router.push(`/board/${resp.response.id}`)
        } else if (resp.ok == false) {
            setLoading(false);
            setError(resp.response);
        }
    }
    return (
        <>
        <button 
        className='btn bg-black bg-opacity-80 hover:bg-opacity-90 hover:bg-black text-white border-none normal-case font-bold px-12 outline-none duration-300 rounded-xl' 
        onClick={openModal}><PlusIcon width={21} strokeWidth={'2.5'}/> Create Board</button>
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
            <div className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[22.5rem]  max-w-md transform overflow-hidden rounded-2xl bg-transparent  text-left align-middle transition-all">
                <CreateProject />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
        </>
    )
}