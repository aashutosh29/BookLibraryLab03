import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack initialRouteName="index"> 
        <Stack.Screen name="index" options={{ title: 'Book Library' }} />
        <Stack.Screen name="book-detail/[id]" options={{ title: 'Book Details' }} />
        <Stack.Screen name="borrowed-books" options={{ title: 'Borrowed Books' }} />
      </Stack>
    </Provider>
  );
}