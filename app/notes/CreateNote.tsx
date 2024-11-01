"use client"
import { useState } from 'react';
import PocketBase from 'pocketbase';
import { useRouter } from 'next/navigation';

export default function CreateNote() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    const router = useRouter();

    const createNote = async (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Prevent the default form submission
        const pb = new PocketBase('https://chatapplication.pockethost.io');

        // Create a data object to pass to the PocketBase create method
        const data = {
            title,
            content,
        };

        try {
            const record = await pb.collection('Notes').create(data);
            console.log('Note created successfully:', record);
            // Optionally reset the form fields after creation
            setTitle('');
            setContent('');

            router.refresh();
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    return (
        <div className="right-0  h-100  grid p-2 w-96 bg-black bg-opacity-25 text-center place-items-center text-black rounded">
            <form onSubmit={createNote} className="grid grid-cols-2">
                <h3 className='font-bold col-span-2 row-start-1'>New Note:</h3>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="p-2 w-screen text-black row-start-2"
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="p-2 w-screen text-black row-start-3"
                />
                <button className="rounded bg-slate-200 w-10 row-start-4"type="submit">Save</button>
            </form>
        </div>

    )
}