"use client"
import PocketBase from 'pocketbase';
import { useRouter } from 'next/navigation';

export default function CreateNote({noteId}: {noteId: string}) {

    const router = useRouter();

    const deleteNote = async (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Prevent the default form submission
        const pb = new PocketBase('http://127.0.0.1:8090');

        try {
            await pb.collection('Notes').delete(noteId);
            router.refresh();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };
    
    return (
        <button onClick={deleteNote}>
            Delete Note
        </button>
    )
}