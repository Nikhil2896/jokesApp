import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import Loading from './Loading';
import Icon from 'react-native-vector-icons/FontAwesome';

const AgeCounterApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jokes, setJokes] = useState([]);
  const [isFetchingJokes, setIsFetchingJokes] = useState(false);

  useEffect(() => {
    loadJokes();
  }, []);

  const loadJokes = () => {
    setIsFetchingJokes(true);
    fetch(`https://icanhazdadjoke.com/search?term=${searchTerm}&limit=${10}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        const fetchedJokes = json.results;
        setJokes(fetchedJokes);
        setIsFetchingJokes(false);
      })
      .catch(error => {
        console.error('Error fetching jokes:', error);
        setIsFetchingJokes(false);
      });
  };

  const renderItem = (renderData, index) => {
    return (
      <View style={styles.listView}>
        <Text style={{fontSize: 16}}>{renderData.item.joke}</Text>
      </View>
    );
  };

  const empty = () => {
    return <Text style={styles.jokesText}>No jokes found</Text>;
  };

  return (
    <View style={styles.container}>
      <Loading visible={isFetchingJokes} />
      <View style={styles.searchView}>
        <TextInput
          placeholder={'Search Jokes..'}
          onChangeText={setSearchTerm}
          value={searchTerm}
          maxLength={100}
        />
        <TouchableOpacity onPress={loadJokes}>
          <Icon name="search" size={20} />
        </TouchableOpacity>
      </View>
      {jokes && (
        <FlatList
          data={jokes}
          renderItem={(data, index) => renderItem(data, index)}
          ListEmptyComponent={empty}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{flexDirection: 'column-reverse'}}
        />
      )}
    </View>
  );
};

export default AgeCounterApp;

const styles = StyleSheet.compose({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  searchView: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listView: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  jokesText: {
    fontSize: 16,
    marginVertical: 30,
  },
});
