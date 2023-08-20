
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  id: string;
  name: string;
  email: string;
}

const initialState: Contact[] = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      return action.payload;
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      state.push(action.payload);
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const { id, name, email } = action.payload;
      const contactToUpdate = state.find(contact => contact.id === id);
      if (contactToUpdate) {
        contactToUpdate.name = name;
        contactToUpdate.email = email;
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      const contactId = action.payload;
      const index = state.findIndex(contact => contact.id === contactId);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { setContacts, addContact, updateContact, deleteContact } = contactsSlice.actions;

export default contactsSlice.reducer;
