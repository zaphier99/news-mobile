import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import newsApiService from '@/services/api/news-api';
import SearchBar from '@/components/SearchBar';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search term.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await newsApiService.fetchEverything({q: query});
      setArticles(results);
    } catch (err) {
      setError('Failed to fetch news. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news = await newsApiService.fetchTopHeadlines({q: "technology"});
        setArticles(news);
      } catch (err) {
        setError('Failed to load news');
      }
    };

    fetchNews();
  }, []);

  return (
    <View style={styles.container}>

      <SearchBar query={query} onSearch={handleSearch} onQueryChange={setQuery} />

      {loading && <ActivityIndicator size="large" style={styles.loader} />}
      {error && !articles && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={articles}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.article}>
            {item.urlToImage && (
              <Image
                source={{ uri: item.urlToImage }}
                style={styles.image}
              />
            )}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={!loading ? <Text style={styles.empty}>No articles found.</Text> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  loader: { marginVertical: 16 },
  error: { color: 'red', marginBottom: 16 },
  article: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  description: { fontSize: 14, color: '#555' },
  empty: { textAlign: 'center', marginTop: 16, fontSize: 16, color: '#aaa' },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});