import { useEffect, useState } from 'react';
import { FlatList, Button, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { setBooks, borrowBook } from '../redux/bookSlice';
import BookCard from '../bookComponents/BookCard';
import { Link } from 'expo-router';

export default function BookListScreen() {
  const dispatch = useDispatch();
  const books = useSelector(state => state.books.books);
  const borrowedBooks = useSelector(state => state.books.borrowedBooks);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'books'), (snapshot) => {
      const bookData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      dispatch(setBooks(bookData));

      const borrowedFromFirestore = bookData.filter(book => book.isBorrowed);
      borrowedFromFirestore.forEach(book => {
        if (!borrowedBooks.some(b => b.id === book.id)) {
          dispatch(borrowBook(book));
        }
      });
    }, (error) => {
      console.error('Error in Firestore listener:', error);
    });

    return () => unsubscribe();
  }, [dispatch, borrowedBooks]);

  const handleAddBook = async () => {
    if (!title || !author || !description) {
      alert('Please filal in all fields');
      return;
    }
    
    try {
      const newBook = { title, author, description, isBorrowed: false };
      await addDoc(collection(db, 'books'), newBook);
      setTitle('');
      setAuthor('');
      setDescription('');
      alert('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book');
    }
  };

  const renderHeader = () => (
    <>
      <TouchableOpacity style={styles.toggleButton} onPress={() => setShowForm(prev => !prev)}>
        <Text style={styles.toggleButtonText}>{showForm ? 'Hide Add Book Form' : 'Add a New Book'}</Text>
      </TouchableOpacity>

      {showForm && (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Add a New Book</Text>
          <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
          <TextInput style={styles.input} placeholder="Author" value={author} onChangeText={setAuthor} />
          <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} multiline />
          <Button title="Add Book" onPress={handleAddBook} />
        </View>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={({ item }) => (
          <Link href={`/book-detail/${item.id}`}>
            <BookCard book={item} />
          </Link>
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={() => (
          <View style={styles.bottomContainer}>
            <Link href="/borrowed-books" asChild>
              <Button title="View Borrowed Books" />
            </Link>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  flatListContent: { paddingBottom: 20 },
  toggleButton: {
    backgroundColor: '#1E88E5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  toggleButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  formContainer: { marginBottom: 20, backgroundColor: '#fff', padding: 16, borderRadius: 8 },
  formTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  separator: { height: 10 },
  bottomContainer: { marginTop: 20, marginBottom: 20 },
});