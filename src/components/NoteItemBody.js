import React from "react";
import { showFormattedDate } from "../utils";

export default function NoteItemBody({ title, createdAt, body }) {
    return (
        <div className="note-item__body">
            <h3 className="note-item__title capitalize">{title}</h3>
            <p className="note-item__date">{showFormattedDate(createdAt)}</p>
            <hr />
            <p className="note-item__body">{body}</p>
        </div>
    );
}
