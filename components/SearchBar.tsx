import React from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

interface SearchBarProps {
  query: string;
  onSearch: (query: string) => void;
  onQueryChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onSearch, onQueryChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for news..."
        value={query}
        onChangeText={onQueryChange}
      />
      <Button title="Search" onPress={() => onSearch(query)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginBottom: 16 },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    flex: 1,
    borderRadius: 4,
  },
});

export default SearchBar;