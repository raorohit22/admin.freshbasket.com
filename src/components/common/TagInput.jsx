import React from 'react';

const TagInput = ({
  notes,
  addNote,
  removeNote,
  getInputValue,
  onChangeInput,
  setShowKeyBoard,
  setInputName,
}) => {
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
        value={getInputValue('note')}
        onChange={onChangeInput}
        onFocus={() => {
          setShowKeyBoard(true);
          setInputName('note');
        }}
        className="react-tag-input__input"
        type="text"
        onBlur={(event) => addNote(event)}
        onKeyUp={(event) => (event.key === 'Enter' ? addNote(event) : null)}
        placeholder="Press enter to add note"
      />
    </div>
  );
};

export default TagInput;
