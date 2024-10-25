import styles from '../Notes.module.scss';
import { formatDate } from '../../utils/utils';

async function getNote(noteId: string) {
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
        {
            next: { revalidate: 10 },
        }
    );
    const data = await res.json();
    return data;
}

export default async function NotePage({ params }: any) {
    const { id } = await params;

    const note = await getNote(id);

    return (
        <div>
            <h1>Note/{note.id}</h1>
            <div className={styles.note}>
                <h2><b>Title:</b> {note.title}</h2>
                <p><b>Details: </b>{note.content ? note.content : 'N/A'}</p>
                <p><b>Note created:</b> {formatDate(note.created)}</p>
                <p><b>Last updated:</b> {formatDate(note.updated)}</p>
            </div>
        </div>
    )
}