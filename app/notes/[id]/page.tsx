import styles from '../Notes.module.scss';
import { formatDate } from '../../utils/utils';
import PocketBase from 'pocketbase';

async function getNote(noteId: string) {
    const pb = new PocketBase('https://chatapplication.pockethost.io');
    const record = await pb.collection('Notes').getOne(noteId, {
        expand: 'relField1,relField2.subRelField',
    });
    return record;
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