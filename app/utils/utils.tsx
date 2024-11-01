import PocketBase from 'pocketbase';

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
}

export async function getNote(noteId: string) {
    const pb = new PocketBase('https://chatapplication.pockethost.io');
    const record = await pb.collection('Notes').getOne(noteId, {
        expand: 'relField1,relField2.subRelField',
    });
    return record;
}


export async function getNotes() {
    const pb = new PocketBase('https://chatapplication.pockethost.io');
    const records = await pb.collection('Notes').getFullList({
        sort: '-created',
    });
    const finishedNotes = records.filter((note) => note.finished === true);
    const unfinishedNotes = records.filter((note) => note.finished === false);
    
    return {
        allNotes: records.map(record => ({
            id: record.id,
            title: record.title,
            content: record.content,
            created: record.created,
            updated: record.updated,
            finished: record.finished,
            category: record.category,
        })),
        finishedNotes: finishedNotes.map(record => ({
            id: record.id,
            title: record.title,
            content: record.content,
            created: record.created,
            updated: record.updated,
            finished: record.finished,
            category: record.category,
        })),
        unfinishedNotes: unfinishedNotes.map(record => ({
            id: record.id,
            title: record.title,
            content: record.content,
            created: record.created,
            updated: record.updated,
            finished: record.finished,
            category: record.category,
        }))
    };
}


export async function updateNote(noteId: string, data: { title: string, content: string }) {
    const pb = new PocketBase('https://chatapplication.pockethost.io');
    const record = await pb.collection('Notes').update(noteId, data);
    return record;
}