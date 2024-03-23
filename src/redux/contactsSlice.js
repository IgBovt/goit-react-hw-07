import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './contactsOps';

const slice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addContact.pending, state => {
        state.error = false;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, state => {
        state.error = true;
      })
      .addCase(deleteContact.pending, state => {
        state.error = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteContact.rejected, state => {
        state.error = true;
      }),
});

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export default slice.reducer;
