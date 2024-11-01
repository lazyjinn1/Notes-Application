"use client"
import PocketBase from 'pocketbase';
import { useRouter } from 'next/navigation';

export default function DeleteNote({noteId}: {noteId: string}) {

    const router = useRouter();

    const deleteNote = async (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Prevent the default form submission
        const pb = new PocketBase('https://chatapplication.pockethost.io');

        try {
            await pb.collection('Notes').delete(noteId);
            router.refresh();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };
    
    return (
        <button className="absolute top-0 right-1 bg-transparent text-3xl text-red-600 font-bold hover:scale-150 transition-all" onClick={deleteNote}>
            x
        </button>
    )
}