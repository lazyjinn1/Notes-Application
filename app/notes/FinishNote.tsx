"use client"
import styles from './Notes.module.scss';
import {getNote, updateNote} from '../utils/utils';
import { useRouter } from 'next/navigation';
export default function FinishNote({noteId, finished}: {noteId: string, finished: boolean}): JSX.Element {
    const router = useRouter();
    const toggleFinish = async (e: { preventDefault: () => void; }) => {

        const record = await getNote(noteId);

        const data = {
            "title": record.title,
            "content": record.content,
            "finished": !record.finished
        };
        await updateNote(noteId, data);
        router.refresh();
    }
    
    return (
        <div className="mr-3">
            <button className={`${styles.checkbox} hover:scale-110 transition-all text-black ${finished ? styles.checked : styles.unchecked}`} onClick={toggleFinish}></button>
        </div>
       
    )
}