import React, { useState, ReactElement, useEffect } from 'react';

import { Box, Image, View, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import moment from 'moment';

import Throbber from '../components/Throbber';
import AlertComponent from '../components/AlertComponent';
import Header from '../components/Header';

import { apiWrapper, apiUrls } from '../config/api';

// Экран подробной информации по новости
export default function NewsItemShowScreen ({ route }: { route: any }): ReactElement {
  const [newsItem, setNewsItem] = useState({});

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = route.params;

  useEffect(() => {
    fetchNewsItem().then(() => setLoading(false));
  }, []);

  // Запрос новости
  async function fetchNewsItem() {
    setLoading(true);

    const response: any = await apiWrapper.get(apiUrls.news.itemShow(id));

    const { ok, data } = response;

    if (ok && data) setNewsItem(data.news);
    else if (data) setErrors(data.errors);
  }

  // Вывод новости
  function _renderNewContent (): ReactElement {
    const { image_url: imageUrl, title, created_at: createdAt, body } = newsItem;

    return (
      <Box flex={1} alignItems="center">
        <Image source={{uri: imageUrl}} style={styles.newsImageSize} alt='news_image'/>
        <View style={styles.marginForHorizontal} alignItems="center">
          <Text style={[styles.marginForTop, styles.marginForBottom]} bold>{title}</Text>
          <Text style={styles.marginForBottom} fontSize={14}>Дата: {moment(createdAt).format('D MMM YYYY')}</Text>

          <Text fontSize={16}>{body}</Text>
        </View>
      </Box>
    );
  }

  return (
    <Box flex={1} alignItems="center">
      <Header />
      {loading && <Throbber />}
      {errors.length > 0 && <AlertComponent errors={errors} setErrors={setErrors} />}
      {newsItem && _renderNewContent()}
    </Box>
  );
}

const styles = StyleSheet.create({
  newsImageSize: {
    width: '100%',
    height: 190,
  },
  marginForHorizontal: {
    marginHorizontal: 10
  },
  marginForTop: {
    marginTop: 5
  },
  marginForBottom: {
    marginBottom: 10
  },
});
