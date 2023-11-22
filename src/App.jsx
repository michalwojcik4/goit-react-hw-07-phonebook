import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { setFilter } from 'redux/slices/filterSlices';
import {
  deleteContact,
  fetchContacts,
  addContact,
} from 'redux/slices/operations';

import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import { Loader } from 'components/Loader/Loader';
// import Filter from './components/Filter/Filter';

import css from './App.module.css';

export const App = () => {
  const { contacts, isLoading } = useSelector(state => state.contacts);
  // const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = newContact => {
    dispatch(addContact(newContact));
  };

  // const handleFilterChange = filterValue => {
  //   dispatch(setFilter(filterValue));
  // };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  // const filteredContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(filter.toLowerCase())
  // );

  return (
    <div className={css.container}>
      <div className={css.container__box}>
        <ContactForm onAddContact={handleAddContact} />
      </div>
      <div className={css.container__box}>
        {/* <Filter value={filter} onChange={handleFilterChange} /> */}
        {isLoading && <Loader />}
        {!isLoading && (
          <ContactList
            contacts={contacts}
            onDeleteContact={handleDeleteContact}
          />
        )}
      </div>
    </div>
  );
};
