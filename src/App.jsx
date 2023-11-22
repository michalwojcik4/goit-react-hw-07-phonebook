import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectFilteredContacts, selectIsLoading } from 'redux/selectors';
import { deleteContact, fetchContacts, addContact } from 'redux/operations';

import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import { Loader } from 'components/Loader/Loader';
import Filter from './components/Filter/Filter';

import css from './App.module.css';

export const App = () => {
  const { isLoading } = useSelector(selectIsLoading);
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = newContact => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.container}>
      <div className={css.container__box}>
        <ContactForm onAddContact={handleAddContact} />
      </div>
      <div className={css.container__box}>
        <Filter />
        {isLoading && <Loader />}
        {!isLoading && (
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={handleDeleteContact}
          />
        )}
      </div>
    </div>
  );
};
