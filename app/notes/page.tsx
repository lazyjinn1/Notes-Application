import styles from './Notes.module.scss';
import { NoteType } from './../types/types';
import { formatDate, getNotes } from './../utils/utils';
import CreateNote from './CreateNote';
import DeleteNote from './DeleteNote'
import FinishNote from './FinishNote';
import ChangeCategory from './Category';


function Note({ note }: { note: NoteType }) {
    const { id, title, content, created, finished, category } = note || {};
    return (
        <div className={`${styles.note} relative p-0 border rounded-lg space-y-5 w-1/4 h-1/5 overflow-visible`}>
            <div className="z-10 mb-20 grid grid-rows-1 grid-cols-2">
                <div className="z-20"><DeleteNote noteId={id} /></div>
                <div className="z-20s"><ChangeCategory noteId={id} category={category} title={title} /></div>
            </div>
            <p className="text-wrap break-words"><b className="text-1xl">Details:</b> {content ? content : 'N/A'}</p>

            <div className="absolute bottom-1 right-0"><FinishNote noteId={id} finished={finished} /></div>
            <p className="absolute bottom-0 left-1">{formatDate(created)}</p>

        </div>
    );
}


export default async function NotesPage() {
    const { allNotes, finishedNotes, unfinishedNotes } = await getNotes();
    return (
        <div className="grid grid-cols-3 grid-rows-2 h-screen">
            <div className="col-span-2 overflow-x-scroll row-span-2" >
                <h1 className="pointer-events-none sticky top-0 text-center font-bold text-5xl z-30">To-Do-List:</h1>
                <div className={`${styles.grid}  flex flex-row space-x-4`}>
                    {unfinishedNotes?.map((note) => {
                        return <Note key={note.id} note={note} />;
                    })}
                </div>
            </div>
            <div className="col-span-1 overflow-x-scroll row-span-0">
                <h1 className="pointer-events-none sticky top-0 text-center font-bold text-5xl z-30">Done:</h1>
                <div className={`${styles.grid} flex flex-row`}>
                    {finishedNotes?.map((note, index) => {
                        return (
                            <div key={index} className="opacity-50 hover:opacity-100 transition-all">
                                <Note key={note.id} note={note} />;
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='absolute right-0 bottom-0 col-start-3'>
                <CreateNote />
            </div>

        </div>
    );
}
