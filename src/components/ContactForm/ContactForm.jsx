import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import css from './ContactForm.module.css';

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    onAddContact(newContact);
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.form__side}>
        <h1 className={css.form__title}>Phonebook</h1>
      </div>
      <div className={css.form__side}>
        <div className={css.form__group}>
          <input
            className={css.form__input}
            type="text"
            name="name"
            placeholder="Imie i Nazwisko"
            required
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className={css.form__group}>
          <input
            className={css.form__input}
            type="tel"
            name="number"
            placeholder="123123123"
            pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
          />
        </div>
        <div className={css.form__group}>
          <button type="submit" className={css.form__button}>
            Add Contact
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onAddContact: PropTypes.func,
};
