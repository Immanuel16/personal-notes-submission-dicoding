import React from "react";
import swal from "sweetalert";

export default class NoteInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            body: "",
            maxLengthTitle: 50,
        };
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        const maxLengthTitle = 50;
        if (this.state.title.length >= maxLengthTitle) {
            swal({
                title: "Maaf :(",
                icon: "error",
                text: "Judul tidak boleh melebihi 50 karakter",
            });
            this.setState({
                title: event.target.value.substring(0, maxLengthTitle),
            });
            // event.target.value.length = maxLengthTitle;
        } else {
            this.setState({
                title: event.target.value,
            });
        }
    }

    onBodyChangeEventHandler(event) {
        this.setState((prev) => ({
            ...prev,
            body: event.target.value,
        }));
    }

    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.addNote(this.state);
        this.setState({
            title: "",
            body: "",
            maxLengthTitle: 50,
        });
        swal({
            title: "Mantaps :)",
            icon: "success",
            text: "Catatan berhasil ditambahkan",
            timer: 3000,
            buttons: false,
        });
    }

    render() {
        return (
            <div className="note-input">
                <h1 className="note-input__title text-2xl mb-4">Buat Catatan</h1>
                <form onSubmit={this.onSubmitEventHandler}>
                    <p className="flex justify-end">
                        Sisa karakter :{" "}
                        {this.state.maxLengthTitle - this.state.title.length < 0
                            ? 0
                            : this.state.maxLengthTitle - this.state.title.length}
                    </p>
                    <input
                        type="text"
                        placeholder="Masukkan judul catatan"
                        value={this.state.title}
                        onChange={this.onTitleChangeEventHandler}
                    />

                    <textarea
                        type="text"
                        placeholder="Tuliskan catatanmu di sini ..."
                        value={this.state.body}
                        onChange={this.onBodyChangeEventHandler}
                        rows="4"
                    ></textarea>

                    <button type="submit" className="">
                        Tambah
                    </button>
                </form>
            </div>
        );
    }
}
