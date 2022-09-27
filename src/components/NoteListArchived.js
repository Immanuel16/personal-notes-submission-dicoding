import React from "react";
import ShowEmptyMessage from "./EmptyMessage";
import NoteItem from "./NoteItem";


export default function NoteListArchived({ notes, onDelete, onArchive}) {
    if(notes.length !== 0){
        return (
            <div className="notes-list">
                {
                    notes.map((note) => (
                        <NoteItem
                            key={note.id}
                            {...note}
                            id={note.id}
                            onDelete={onDelete}
                            onArchive={onArchive}
                            isArchived={note.archived}
                        />
                    ))
                }
            </div>
        );
    }
    return <ShowEmptyMessage />
}
