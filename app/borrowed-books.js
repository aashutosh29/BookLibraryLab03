import { FlatList, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { returnBook } from '../redux/bookSlice';
import BorrowedCard from '../bookComponents/BorrowedCard';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from 'react';

export default function BorrowedBooksScreen() {
  const dispatch = useDispatch();
  const borrowedBooks = useSelector(state => state.books.borrowedBooks).filter(
    book => book && book.id && book.title && book.author
  );
  const [loading, setLoading] = useState(false);

  console.log('BorrowedBooks from Redux on render:', borrowedBooks);

  const handleReturn = async (bookId) => {
    try {
      setLoading(true); 
      dispatch(returnBook(bookId));
      await updateDoc(doc(db, 'books', bookId), { isBorrowed: false });
      console.log('Returned book:', bookId);
    } catch (error) {
      console.error('Error returning book:', error);
    } finally {
      setLoading(false); 
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Borrowed Books</Text>
      <Text style={styles.headerSubtitle}>
        {borrowedBooks.length} / 3 books borrowed
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? ( 
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      ) : (
        <FlatList
          data={borrowedBooks}
          renderItem={({ item }) => (
            <BorrowedCard book={item} onReturn={() => handleReturn(item.id)} />
          )}
          keyExtractor={item => item.id}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No books borrowed yet.</Text>
              <Text style={styles.emptySubText}>Borrow up to 3 books from the library.</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e0e0e0', marginBottom: 10 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#212121', marginBottom: 4 },
  headerSubtitle: { fontSize: 16, color: '#757575' },
  listContent: { paddingBottom: 20 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#424242', marginBottom: 8 },
  emptySubText: { fontSize: 14, color: '#888', textAlign: 'center' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' }
}); 