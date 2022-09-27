import React from "react";
import ListButton from "./ListButton";
import NoteItemBody from "./NoteItemBody";

export default function NoteItem({
    title,
    body,
    id,
    createdAt,
    onDelete,
    onArchive,
    archived,
}) {
    return (
        <div className="contact-item">
            <NoteItemBody title={title} body={body} createdAt={createdAt} />
            <ListButton
                id={id}
                onDelete={onDelete}
                onArchive={onArchive}
                archived={archived}
            />
        </div>
    );
}
