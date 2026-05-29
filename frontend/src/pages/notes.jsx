import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import { useNavigate }
from "react-router-dom";

function Notes() {

  const navigate =
    useNavigate();

  const [text, setText] =
    useState("");

  const [notes, setNotes] =
    useState([]);

  const token =
    localStorage.getItem("token");

  // Load Notes
  const getNotes = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/notes",
        {
          headers: {
            authorization: token
          }
        }
      );

      setNotes(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // Add Note
  const addNote = async () => {

    await axios.post(

      "http://localhost:5000/notes",

      { text },

      {
        headers: {
          authorization: token
        }
      }

    );

    setText("");

    getNotes();

  };

  // Delete Note
  const deleteNote = async (id) => {

    await axios.delete(

     axios.get("https://mern-notes-app-s1fc.onrender.com/notes") 

    );

    getNotes();

  };

  // Logout
  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  useEffect(() => {

    getNotes();

  }, []);

  return (

  <div className="container">

    <h1>Notes App</h1>

    <button onClick={logout}>
      Logout
    </button>

    <br /><br />

    <input

      value={text}

      placeholder="Write a note..."

      onChange={(e) =>
        setText(e.target.value)
      }

    />

    <button onClick={addNote}>
      Add Note
    </button>

    <ul>

      {notes.map((note) => (

        <li key={note._id}>

          <span>{note.text}</span>

          <button
            onClick={() =>
              deleteNote(note._id)
            }
          >
            Delete
          </button>

        </li>

      ))}

    </ul>

  </div>

);

}

export default Notes;