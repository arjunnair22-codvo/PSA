import React from 'react';
import { View, StyleSheet,TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  webView: {
    flex: 1,
  },
});


const RetailerWebView = ({ route }) => {
  console.log(route.params.url);
  return (
    <View style={styles.container}>
      <WebView source={{ uri: route.params.url }} style={styles.webView} />
    </View>
  );
};

export default RetailerWebView;
