import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const RetailerListingPage = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  const retailers = [
    {
      id: 1,
      title: 'Amazon',
      bannerImage: 'https://thumbs.dreamstime.com/b/amazon-logo-246306726.jpg',
      url: 'https://www.amazon.com',
    },
    {
      id: 2,
      title: 'Homedepot',
      bannerImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLcPBVHVNrUA9u1hxbNCbRamjrXkoOYh0v2bIDfXGkWOvlmdWafU9nRJw7_48ont29Amk&usqp=CAU',
      url: 'https://www.homedepot.com',
    },
    {
      id: 3,
      title: 'Walmart',
      bannerImage:
        'https://wwaarc.org/wp-content/uploads/2018/05/walmart-2018-sponsor-banner.png',
      url: 'https://www.walmart.com',
    },
  ];

  const handleRetailerPress = url => {
    navigation.navigate('WebView', {url});
  };

  const renderRetailerItem = ({item}) => (
    <TouchableOpacity
      style={styles.retailerItem}
      onPress={() => handleRetailerPress(item.url)}>
      <Text style={styles.retailerTitle}>{item.title}</Text>
      <Image
        source={{uri: item.bannerImage}}
        style={styles.retailerBanner}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const filterRetailers = () => {
    return retailers.filter(retailer =>
      retailer.title.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search retailers..."
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>
      <FlatList
        data={filterRetailers()}
        renderItem={renderRetailerItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.retailersList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  retailersList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  retailerItem: {
    marginBottom: 16,
  },
  retailerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  retailerBanner: {
    height: 200,
    borderRadius: 8,
  },
  webView: {
    flex: 1,
  },
});

export default RetailerListingPage;
