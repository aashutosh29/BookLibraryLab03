import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { forwardRef } from 'react';

const BorrowedCard = forwardRef(({ book, onReturn }, ref) => {
  if (!book || !book.id || !book.title || !book.author) {
    return (
      <View ref={ref} style={styles.card}>
        <Text style={styles.errorText}>Invalid or missing book data</Text>
      </View>
    );
  }

  return (
    <View ref={ref} style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        {book.description && (
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
            {book.description}
          </Text>
        )}
      </View>
      <TouchableOpacity style={styles.returnButton} onPress={onReturn}>
        <Text style={styles.returnButtonText}>Return</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    color: '#757575',
    fontStyle: 'italic',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
  returnButton: {
    backgroundColor: '#0288D1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  returnButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#D32F2F', 
    textAlign: 'center',
  },
});

export default BorrowedCard;