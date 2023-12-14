import { useDispatch, useSelector } from "react-redux";
import { notesSelectors, notesSlice } from "./notesSlices";
import { nanoid } from "@reduxjs/toolkit";

const Notes = () => {
  const notes = useSelector(notesSelectors.selectAll);
  const dispatch = useDispatch();

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const note = form.note?.value;

    if (note !== "") {
      dispatch(
        notesSlice.actions.addNote({
          content: note,
          id: nanoid(),
        })
      );
    }
  };

  const handleRemoveNote = (id) => dispatch(notesSlice.actions.removeNote(id));

  return (
    <div className="Notes">
      <h2>Notes pour la cuisine</h2>
      <div className="NotesContainer">
        <form onSubmit={handleNoteSubmit}>
          <label htmlFor="note">Saisir une note</label>
          <textarea name="note"></textarea>
          <button type="submit" className="AddNote">
            Ajouter
          </button>
        </form>
        <ul className="NodeList">
          {notes &&
            notes?.map((note) => (
              <li key={note.id}>
                {note.content}{" "}
                <button type="button" onClick={() => handleRemoveNote(note.id)}>
                  supprimer ❌
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Notes;
