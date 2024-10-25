import Link from "next/link";
import styles from './Notes.module.scss';
import { NoteType } from './../types/types';
import { formatDate } from './../utils/utils';
import CreateNote from './CreateNote';
import DeleteNote from './DeleteNote'
import PocketBase from 'pocketbase';

async function getNotes() {
    const pb = new PocketBase('https://chatapplication.pockethost.io');
    const records = await pb.collection('Notes').getFullList({
        sort: '-created',
    });
    return (
        records.map(record => ({
            id: record.id,
            title: record.title,
            content: record.content,
            created: record.created,
            updated: record.updated
        }))
    )
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
