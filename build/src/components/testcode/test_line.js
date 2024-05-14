import React, { useEffect } from 'react';
import axios from 'axios';

const LineMessaging = () => {
  useEffect(() => {
    // Your LINE Messaging API Access Token
    const accessToken = 'mrv14xyd7laydtN9LzMIQ629HZjpHaHjHtMLnbP8Zum';

    // LINE Messaging API endpoint
    const apiEndpoint = 'https://notify-api.line.me/api/notify';//'https://api.line.me/v2/bot/message/push';

    // User ID to send the message to
    const userId = '14.06.41';

    // Message to send
    const message = {
      type: 'text',
      text: 'Hello, this is a LINE message from React!'
    };

    // Make the HTTP request to the LINE Messaging API
    axios.post(
      apiEndpoint,
      {
        to: userId,
        messages: [message]
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',//'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    )
    .then(response => {
      console.log('Message sent successfully:', response.data);
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
  }, []); // The empty dependency array ensures the effect runs once after the initial render

  return (
    <div>
      <p>Message sent to LINE!</p>
    </div>
  );
};

export default LineMessaging;
