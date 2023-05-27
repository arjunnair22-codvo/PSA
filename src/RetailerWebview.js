import React, {useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {GiftedChat} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome';

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

const RetailerWebView = ({route}) => {
  const [showChat, setShowChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: '',
      received: true,
      quickReplies: {
        type: 'radio', // or 'radio',
        values: [
          {
            title: 'Recommendation',
            value: 'recommendation',
          },
          {
            title: 'Price',
            value: 'price',
          },
          {
            title: 'Features',
            value: 'features',
          },
        ],
      },
      user: {
        _id: 2,
      },
    },
  ]);
  const [currentUrl, setCurrentUrl] = useState('');
  const webviewRef = useRef();
  const [htmlContent, setHtmlContent] = useState('');
  const handleWebViewNavigation = event => {
    const {url} = event;
    setCurrentUrl(url);

    // Check if the user navigated to a specific URL
    // setShowChat(true);
  };

  const handleWebViewMessage = event => {
    const {data} = event.nativeEvent;
    setHtmlContent(data);
    setShowChat(true);
  };

  const handleWebViewLoad = () => {
    const script = `
      window.ReactNativeWebView.postMessage(document.body.innerHTML);true;`;
    webviewRef.current.injectJavaScript(script);
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setMessages([]); // Clear chat messages
  };
  const handleSend = (newMessages = []) => {
    setMessages(prevMessages =>
      GiftedChat.append(prevMessages, [
        {
          ...newMessages[0],
          user: {
            _id: 1, // User ID
          },
        },
      ]),
    );

    const question = newMessages[0];
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers required by your API
      },
      body: JSON.stringify({html: htmlContent, question: question}),
    };
    fetch('http://localhost:5001/homedepot/product/question', requestOptions)
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        const text = data.data;
        setMessages(prev =>
          GiftedChat.append(prev, [
            {
              _id: Math.random(),
              text,
              user: {_id: 2},
              received: true,
            },
          ]),
        );
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });

    // Handle sending newMessages to the backend
  };

  const handleQuickReply = data => {
    setMessages(() => GiftedChat.append([], []));
    const value = data[0].value;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers required by your API
      },
      body: JSON.stringify({html: htmlContent, question: value}),
    };
    fetch('http://localhost:5001/homedepot/product/' + value, requestOptions)
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        const text = data.data;
        setMessages(prev =>
          GiftedChat.append(
            [
              {
                _id: 1,
                text: value,
              },
            ],
            [
              {
                _id: Math.random(),
                text,
                user: {_id: 2},
                received: true
              },
            ],
          ),
        );
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{uri: route.params.url}}
        style={styles.webView}
        onNavigationStateChange={handleWebViewNavigation}
        onMessage={handleWebViewMessage}
      />
      {showChat ? (
        <View style={{flex: 1, padding: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={handleCloseChat}>
              <Icon name="times" size={32} color="blue" />
            </TouchableOpacity>
          </View>
          <GiftedChat
            extraData={{
              htmlContent,
            }}
            messages={messages}
            onSend={handleSend}
            onQuickReply={handleQuickReply}
            user={{
              _id: 1,
            }}
            isTyping={isTyping}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={{position: 'absolute', bottom: 20, right: 20}}
          onPress={() => {
            handleWebViewLoad();
          }}>
          <Icon name="comments" size={32} color="blue" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RetailerWebView;
