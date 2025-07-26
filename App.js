import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchArticles } from './services/newsService';
import ArticleItem from './components/ArticleItem';

export default function App() {
  const [articles, setArticles] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const loadArticles = async (search = 'latest') => {
    setLoading(true);
    const data = await fetchArticles(search);
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by title, author or keyword"
        style={styles.input}
        value={keyword}
        onChangeText={setKeyword}
        onSubmitEditing={() => loadArticles(keyword)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => <ArticleItem article={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },
});