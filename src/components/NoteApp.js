import React from "react";
import { getInitialData } from "../utils";
import NoteInput from "./NoteInput";
import NoteList from "./NoteList";
import NoteListArchived from "./NoteListArchived";
import swal from "sweetalert";

export default class NoteApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: getInitialData().filter((note) => !note.archived),
            notesArchived: getInitialData().filter((note) => note.archived),
            keyword: "",
        };

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onAddNotesHandler = this.onAddNotesHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onKeywordSearchChangeEventHandler =
            this.onKeywordSearchChangeEventHandler.bind(this);
    }

    componentDidMount() {
        sessionStorage.setItem("listNote", JSON.stringify(this.state.notes));
        sessionStorage.setItem(
            "listNoteArchived",
            JSON.stringify(this.state.notesArchived)
        );
    }

    onDeleteHandler(id, archived) {
        let notes = [];
        if (!archived) {
            notes = this.state.notes.filter((notes) => notes.id !== id);
            this.setState({
                notes,
            });
            sessionStorage.setItem("listNote", JSON.stringify(notes));
        } else {
            notes = this.state.notesArchived.filter((notes) => notes.id !== id);
            this.setState({
                notesArchived: notes,
            });
            sessionStorage.setItem("listNoteArchived", JSON.stringify(notes));
        }

        swal({
            title: "Cakeupp :)",
            icon: "success",
            text: "Catatan berhasil dihapus",
            timer: 3000,
            buttons: false,
        });
    }

    onArchiveHandler(id, archived) {
        const { notesArchived, notes } = this.state;
        let listArchivedNote = notesArchived;
        let listNotes = notes;
        let tempNotes = [];

        if (archived) {
            tempNotes = notesArchived.map((note) => {
                if (note.id === id) {
                    note.archived = false;
                }
                return note;
            });
            listNotes.push(...tempNotes.filter((note) => !note.archived));
            this.setState({
                notes: listNotes,
                notesArchived: tempNotes.filter((note) => note.id !== id),
            });
            sessionStorage.setItem("listNote", JSON.stringify(listNotes));
            sessionStorage.setItem(
                "listNoteArchived",
                JSON.stringify(tempNotes.filter((note) => note.id !== id))
            );
            swal({
                title: "Cakeupp :)",
                icon: "success",
                text: "Catatan berhasil dipindahkan",
                timer: 3000,
                buttons: false,
            });
        } else {
            tempNotes = notes.map((note) => {
                if (note.id === id) {
                    note.archived = true;
                }
                return note;
            });
            listArchivedNote.push(...tempNotes.filter((note) => note.archived));
            this.setState({
                notesArchived: listArchivedNote,
                notes: tempNotes.filter((note) => note.id !== id),
            });
            sessionStorage.setItem(
                "listNote",
                JSON.stringify(tempNotes.filter((note) => note.id !== id))
            );
            sessionStorage.setItem(
                "listNoteArchived",
                JSON.stringify(listArchivedNote)
            );
            swal({
                title: "Cakeupp :)",
                icon: "success",
                text: "Catatan berhasil diarsipkan",
                timer: 3000,
                buttons: false,
            });
        }
    }

    onAddNotesHandler({ title, body }) {
        const reqBody = {
            id: +new Date(),
            title,
            body,
            createdAt: new Date(),
            archived: false,
        };
        this.setState((prev) => {
            return {
                notes: [...prev.notes, reqBody],
            };
        });
        sessionStorage.setItem(
            "listNote",
            JSON.stringify([...this.state.notes, reqBody])
        );
    }

    onKeywordSearchChangeEventHandler(event) {
        const keyword = event.target.value;
        const dataNotesExisting = JSON.parse(sessionStorage.getItem("listNote"));
        const dataNotesArchivedExisting = JSON.parse(
            sessionStorage.getItem("listNoteArchived")
        );
        const filteredNotes = dataNotesExisting.filter((item) => {
            return item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
        });
        const filteredNotesArchived = dataNotesArchivedExisting.filter((item) => {
            return item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
        });

        this.setState({
            keyword,
            notes: filteredNotes,
            notesArchived: filteredNotesArchived,
        });
    }

    filteredSearchingHandler = (filteredData) => {
        if (!this.state.keyword) {
            return filteredData;
        }

        const filteredNotes = filteredData.filter(
            (note) =>
                note.title
                    .toLowerCase()
                    .split("")
                    .indexOf(this.state.keyword.toLowerCase()) !== -1
        );

        return filteredNotes;
    };

    render() {
        return (
            <>
                <div className="note-app__header">
                    <h1 className="text-3xl">Notes</h1>
                    <input
                        type="text"
                        value={this.state.keyword}
                        placeholder="Cari catatan ..."
                        onChange={this.onKeywordSearchChangeEventHandler}
                    />
                </div>
                <div className="note-app__body">
                    <NoteInput addNote={this.onAddNotesHandler} />
                    <h2 className="mb-6 text-2xl">Catatan Aktif</h2>
                    <NoteList
                        notes={this.state.notes}
                        onDelete={this.onDeleteHandler}
                        onArchive={this.onArchiveHandler}
                    />
                    <h2 className="text-2xl my-6">Arsip</h2>
                    <NoteListArchived
                        notes={this.state.notesArchived}
                        onDelete={this.onDeleteHandler}
                        onArchive={this.onArchiveHandler}
                    />
                </div>
            </>
        );
    }
}
