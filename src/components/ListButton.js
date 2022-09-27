import React from "react";

export default function ListButton({ id, onDelete, onArchive, archived }) {
    if (archived) {
        return (
            <div className="note-item__action">
                <button
                    className="note-item__delete-button"
                    onClick={() => onDelete(id, archived)}
                >
                    Hapus
                </button>
                <button
                    className="note-item__archive-button"
                    onClick={() => onArchive(id, archived)}
                >
                    Pindahkan
                </button>
            </div>
        );
    }
    return (
        <div className="note-item__action">
            <button
                className="note-item__delete-button"
                onClick={() => onDelete(id, archived)}
            >
                Hapus
            </button>
            <button
                className="note-item__archive-button"
                onClick={() => onArchive(id, archived)}
            >
                Arsipkan
            </button>
        </div>
    );
}
