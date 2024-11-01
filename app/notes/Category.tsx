"use client";
import styles from './Notes.module.scss';
import { getNote, updateNote } from '../utils/utils';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export default function ChangeCategory({ noteId, category, title }: { noteId: string, category: string, title: string }): JSX.Element {
    const router = useRouter();
    const choices = ["Blue", "Pink", "Purple", "Green", "Red", "Orange"];
    const [showChoices, setShowChoices] = useState(false);
    const choicesRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: { target: { value: string; }; }) => {
        category = e.target.value;
    };

    const chooseCategory = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const record = await getNote(noteId);

        const data = {
            "title": record.title,
            "content": record.content,
            "category": category
        };

        await updateNote(noteId, data);
        router.refresh();
        setShowChoices(false);
    };

    const toggleChoices = () => {
        setShowChoices(!showChoices);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (choicesRef.current && !choicesRef.current.contains(event.target as Node)) {
                setShowChoices(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="absolute top-0 left-1 overflow-visible w-full">
            <button 
                className={`${styles[category.toLowerCase()]} w-full h-10`}
                onClick={toggleChoices}
            >
                <h2 className={` bg-opacity-75 p-1 h-16 overflow-auto ${styles[category.toLowerCase()]}`}><b className="text-1xl"> {title}</b></h2>
            </button>

            {/* Show color choices if showChoices is true */}
            {showChoices && (
                <div 
                    ref={choicesRef}
                    className="absolute inset-0 top-10 flex items-center justify-center bg-black bg-opacity-50 z-20"
                >
                    <div className="grid grid-cols-3 gap-2 p-3 bg-white rounded shadow-lg">
                        {choices.map((color, index) => (
                            <button
                                key={index}
                                className={`w-full h-10 m-auto ${styles[color.toLowerCase()]}`}
                                onClick={() => {
                                    category = color; // Update category
                                    handleChange({ target: { value: color } }); // Update category
                                    chooseCategory({ preventDefault: () => {} }); // Call chooseCategory after selecting
                                }}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
