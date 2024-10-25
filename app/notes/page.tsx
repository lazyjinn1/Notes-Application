import Link from "next/link";
import styles from './Notes.module.scss';
import { NoteType } from './../types/types';
import { formatDate } from './../utils/utils';
import CreateNote from './CreateNote';
import DeleteNote from './DeleteNote'

async function getNotes() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30', { cache: 'no-store' });
    const data = await res.json();
    return data?.items as any[];
}

export default async function NotesPage() {
    const notes = await getNotes();
    return (
        <div>
            <h1>Notes</h1>
            <div className={styles.grid}>
                {notes?.map((note) => {
                    return <Note key={note.id} note={note} />;
                })}
            </div>
            <CreateNote />
        </div>
    );
}

function Note({ note }: { note: NoteType }) {
    const { id, title, content, created } = note || {};
    return (
        <div className={styles.note}>
            <Link href={`/notes/${id}`}>
                <h2><b>Title:</b> {title}</h2>
                <p><b>Details:</b> {content ? content : 'N/A'}</p>
                <p><b>Note created:</b> {formatDate(created)}</p>
            </Link>
            <DeleteNote noteId={id}/>
        </div>
    );
}
