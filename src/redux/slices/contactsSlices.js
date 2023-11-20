import { createSlice } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const initialState = JSON.parse(localStorage.getItem('contacts')) || [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    addContact: (state, action) => {
      const checkContact = state.find(
        contact => contact.number === action.payload.number
      );
      if (checkContact) {
        Notify.failure('There is a contact for this number in the phone book');
        return state;
      }
      const updatedState = [...state, action.payload];
      localStorage.setItem('contacts', JSON.stringify(updatedState));
      Notify.success('Great! Contact has been added');
      return updatedState;
    },
    deleteContact: (state, action) => {
      const updatedState = state.filter(
        contact => contact.id !== action.payload
      );
      localStorage.setItem('contacts', JSON.stringify(updatedState));
      Notify.info('Contact has been removed');
      return updatedState;
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
