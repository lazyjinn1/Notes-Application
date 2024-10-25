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
        <form onSubmit={createNote}>
            <h3>New Note:</h3>
            <input 
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <button type="submit">Save</button>
        </form>
    )
}