import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
  },
  reducers: {
    addContact: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: value => {
        return {
          payload: {
            id: Date.now(),
            ...value,
          },
        };
      },
    },
    deleteContact(state, action) {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});
export const { addContact, deleteContact } = slice.actions;
export const selectContacts = state => state.contacts.items;
export default slice.reducer;
