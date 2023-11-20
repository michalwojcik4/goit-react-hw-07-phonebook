import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact } from 'redux/slices/contactsSlices';
import { setFilter } from 'redux/slices/filterSlices';

import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';

import css from './App.module.css';

export const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleAddContact = newContact => {
    dispatch(addContact(newContact));
  };

  const handleFilterChange = filterValue => {
    dispatch(setFilter(filterValue));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.container}>
      <div className={css.container__box}>
        <ContactForm onAddContact={handleAddContact} />
      </div>
      <div className={css.container__box}>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </div>
  );
};
