import React, { useState, ReactElement, useEffect } from 'react';

import { Box } from 'native-base';
import { RefreshControl, FlatList } from 'react-native';

import Throbber from '../components/Throbber';
import NewsCard from '../components/NewsCard';
import AlertComponent from '../components/AlertComponent';
import Header from '../components/Header';

import { apiWrapper, apiUrls } from '../config/api';

// Экран списка новостей
export default function NewsScreen(): ReactElement {
  const [news, setNews] = useState([]);

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchNews().then(() => setLoading(false));
  }, []);

  // Запрос новостей
  async function fetchNews() {
    const response: any = await apiWrapper.get(apiUrls.news.list);

    const { ok, data } = response;

    if (ok && data) setNews(data.news);
    else if (data) setErrors(data.errors);
  }

  // Обновление данных экрана
  function onRefresh() {
    setRefreshing(true);

    fetchNews().then(() => setRefreshing(false));
  }

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Header />
      {loading && <Throbber />}
      {errors.length > 0 && <AlertComponent errors={errors} setErrors={setErrors} />}
      <FlatList data={news}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                renderItem={({ item }) => <NewsCard item={item} />}
                keyExtractor={({ id }) => `newsItem_${id}`} />
    </Box>
  );
}
