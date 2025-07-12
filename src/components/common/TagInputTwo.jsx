import React from 'react';

const TagInputTwo = ({ notes, addNote, removeNote }) => {


  return (
    <div className="react-tag-input">
      <ul id="tags">
        {notes.map((note, index) => (
          <li key={index} className="react-tag-input__tag">
            <span className="tag-title react-tag-input__tag__content">
              {note}
            </span>
            <span
              className="react-tag-input__tag__remove"
              onClick={() => removeNote(index)}
            ></span>
          </li>
        ))}
      </ul>

      <input
        name="note"
        className="react-tag-input__input"
        type="text"
        onBlur={(event) => addNote(event)}
        onKeyDown={(event) => (event.key === 'Enter' ? addNote(event) : null)}
        // onKeyDown={(event) => console.log(event.key)}
        placeholder="Press enter to add variant"
      />
    </div>
  );
};

export default TagInputTwo;
