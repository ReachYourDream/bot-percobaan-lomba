'use strict';
const express = require('express');
const line = require('@line/bot-sdk');// create LINE SDK config from env variables

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);
const app = express();

app.post('/callback', line.middleware(config), (req, res) => {

  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  console.log(event);
  if(event.message.type =='image'){
    var id_gambar = event.message.id;
    var gambar = {type:'image', id=''};
    gambar.id= id_gambar;
    console.log('gambar: ' + $gambar);
    return client.replyMessage(event.replyToken,gambar);
  }
	if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  var echo = {type: 'text', text: 'coba'};
  const insert_text = String(event.message.text);
  if(insert_text.toLowerCase()=="sakit"){
    echo.text = "Sabar ya";
  }
  console.log('woi');
  // echo.text = 'Coba test';
  return client.replyMessage(event.replyToken,echo);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

// { type: 'message',
// 2018-07-16T14:18:15.611959+00:00 app[web.1]:   replyToken: 'bcace659aaf3411ea394051378170b63',
// 2018-07-16T14:18:15.611962+00:00 app[web.1]:   source: { userId: 'U0f70c027f512a5252dea0b9498e775cd', type: 'user' },
// 2018-07-16T14:18:15.611963+00:00 app[web.1]:   timestamp: 1531750695138,
// 2018-07-16T14:18:15.611965+00:00 app[web.1]:   message:
// 2018-07-16T14:18:15.611967+00:00 app[web.1]:    { type: 'location',
// 2018-07-16T14:18:15.611968+00:00 app[web.1]:      id: '8274111258384',
// 2018-07-16T14:18:15.611970+00:00 app[web.1]:      address: 'Ruang A1 No.19 Ketawanggede, Kecamatan Lowokwaru, Kota Malang, Jawa Timur 65145',
// 2018-07-16T14:18:15.611972+00:00 app[web.1]:      latitude: -7.954879789956453,
// 2018-07-16T14:18:15.611994+00:00 app[web.1]:      longitude: 112.61452244422676 } }


// { type: 'message',
// 2018-07-16T14:20:37.698623+00:00 app[web.1]:   replyToken: 'a842937c6f2d4bcabfd948acda5c9017',
// 2018-07-16T14:20:37.698625+00:00 app[web.1]:   source: { userId: 'Ud5572a7dae7213d18788691958d98fa4', type: 'user' },
// 2018-07-16T14:20:37.698627+00:00 app[web.1]:   timestamp: 1531750836737,
// 2018-07-16T14:20:37.698628+00:00 app[web.1]:   message: { type: 'image', id: '8274124138927' } }