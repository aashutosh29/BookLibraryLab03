import { View, Text, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { borrowBook } from '../../redux/bookSlice';
import { useLocalSearchParams } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const books = useSelector(state => state.books.books);
  const borrowedBooks = useSelector(state => state.books.borrowedBooks);
  const book = books.find(b => b.id === id);

  if (!book) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Book not found (ID: {id})</Text>
      </View>
    );
  }

  const handleBorrow = async () => {
    if (borrowedBooks.length >= 3) {
      Alert.alert('Limit Reached', 'You cannot borrow more than 3 books at a time.');
    } else {
      try {
        console.log('Attempting to borrow book:', book);
        dispatch(borrowBook(book));
        await updateDoc(doc(db, 'books', book.id), { isBorrowed: true });
        console.log('Borrowed book, updated Firestore. New borrowedBooks:', borrowedBooks);
        Alert.alert('Success', `${book.title} has been borrowed!`);
      } catch (error) {
        console.error('Error borrowing book:', error);
        Alert.alert('Error', 'Failed to borrow book');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.status,
              { backgroundColor: book.isBorrowed ? '#F44336' : '#4CAF50' },
            ]}
          >
            {book.isBorrowed ? 'Borrowed' : 'Available'}
          </Text>
        </View>
        <Text style={styles.descriptionLabel}>Description</Text>
        <Text style={styles.description}>{book.description}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title={book.isBorrowed ? 'Already Borrowed' : 'Borrow Book'}
            onPress={handleBorrow}
            disabled={book.isBorrowed}
            color="#0288D1"
          />
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Book ID:</Text>
          <Text style={styles.infoText}>{book.id}</Text>
          <Text style={styles.infoLabel}>Borrowed Count:</Text>
          <Text style={styles.infoText}>{borrowedBooks.length} / 3</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, margin: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 4, borderWidth: 1, borderColor: '#e0e0e0' },
  title: { fontSize: 28, fontWeight: '700', color: '#212121', marginBottom: 8 },
  author: { fontSize: 18, color: '#757575', fontStyle: 'italic', marginBottom: 12 },
  statusContainer: { alignSelf: 'flex-start', marginBottom: 20 },
  status: { fontSize: 14, fontWeight: '600', color: '#fff', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, overflow: 'hidden' },
  descriptionLabel: { fontSize: 16, fontWeight: '600', color: '#424242', marginBottom: 8 },
  description: { fontSize: 16, color: '#616161', lineHeight: 24, marginBottom: 20 },
  buttonContainer: { marginBottom: 20, borderRadius: 8, overflow: 'hidden' },
  infoSection: { borderTopWidth: 1, borderTopColor: '#e0e0e0', paddingTop: 12 },
  infoLabel: { fontSize: 14, fontWeight: '600', color: '#424242', marginBottom: 4 },
  infoText: { fontSize: 14, color: '#616161', marginBottom: 12 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  errorText: { fontSize: 18, color: '#D32F2F' },
});