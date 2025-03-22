import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    borrowedBooks: [],
  },
  reducers: {
    setBooks: (state, action) => {
      console.log('Updating Redux books:', action.payload);
      state.books = action.payload;
    },
    borrowBook: (state, action) => {
      if (state.borrowedBooks.length < 3) {
        const book = action.payload;
        if (book && book.id && book.title && book.author) {
          console.log('Adding to borrowedBooks:', book);
          state.borrowedBooks.push(book);
          const originalBook = state.books.find(b => b.id === book.id);
          if (originalBook) originalBook.isBorrowed = true;
          console.log('Updated borrowedBooks:', state.borrowedBooks);
        } else {
          console.error('Invalid book payload:', book);
        }
      }
    },
    returnBook: (state, action) => {
      state.borrowedBooks = state.borrowedBooks.filter(b => b.id !== action.payload);
      const book = state.books.find(b => b.id === action.payload);
      if (book) book.isBorrowed = false;
      console.log('After return, borrowedBooks:', state.borrowedBooks);
    },
  },
});

export const { setBooks, borrowBook, returnBook } = bookSlice.actions;
export default bookSlice.reducer;