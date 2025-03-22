import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function BookCard({ book, onReturn }) {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
      </View>

      {/* Display the status on the right side of the card */}
      <Text
        style={[
          styles.status,
          { backgroundColor: book.isBorrowed ? '#E57373' : '#81C784' }, 
        ]}
      >
        {book.isBorrowed ? 'Borrowed' : 'Available'}
      </Text>

      {/* If the book is borrowed, show the return button */}
      {book.isBorrowed && onReturn && (
        <TouchableOpacity style={styles.returnButton} onPress={onReturn}>
          <Text style={styles.returnButtonText}>Return Book</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    width: '100%',
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  textContainer: {
    flex: 1, 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 12,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    textAlign: 'center',
    minWidth: 80, 
  },
  returnButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
