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

var kotak_awal = {
  "type": "template",
  "altText": "this is a carousel template",
  "template": {
    "type": "carousel",
    "actions": [],
    "columns": [
      {
        "thumbnailImageUrl": "https://lh3.googleusercontent.com/F9p5XX1LLiC43yf4sY82jB0te64uLG68q0053RfD3bSWGiQcEg23omhDy_EHPTTY-SrRflM0HQUS5D7yrL3pkgVQDmJs20rjlaeGGKUyuo7-4MuwDdOS_To4t2V1c5Z7dhZJGvPmuQuRzFOpIdOOMT_sUOv2HAvZ-rX21iv7MhILBH5Zi50CUN0QnvqnYtaX6jrWjutEo4wQYiUbMUEFuz9Gg7iX8hD8khPL36qIS9BctdfMVOo5rZpJnSfIIyOvIOVW5C08Oqd0LYV4V_qHBChGQ3E6tnoj4cStx5hBEnL2Dz2a4RUhhG7CyYy1qBjlcMI53OZjG_Tb1aPAu-v7mqXzrOgPH012mOaXK7z5rXoryzd7eMHMdO7HyfQDbj7boyoXDvO03rW_E1kbqyB9vFPevuKThLmMUwH2YP4e8w22Bkfywqny6__hlospydM0OPqxPz0NlQFQcRFhMHTIWN0R-uXRpkKBnmKvQi1QbKOZu1cmVkA1FiFQMY0eHBjfTIgSctCQVOgprOKXMAfgX8RiMqfXtIUA-98xlvddPszlR-ItcPSKycF0cQVF5AgY=w1366-h664",
        "title": "Layanan Pengaduan Masyarakat",
        "text": "Ada keluhan? Laporkan saja",
        "actions": [
          {
            "type": "message",
            "label": "Lapor",
            "text": "Lapor"
          }
        ]
      },
      {
        "thumbnailImageUrl": "https://lh3.googleusercontent.com/pEYhu0J-HGNNs9nXa62WVHMV2JSVy9CCp63fVmihaKAFCkUAxhUMFxG_Ql0AaqE5_rmZsbFUoLrNmCNAij5E7j0B-7zpObzrNN24u-Zh3NZcL-_JAlYMZpiol5jhcr0yac4sy8lPZFwJEb50CuCmuujNTYmBWJP64wByTASLpOyfq_4ezzatgYylkqYTHehujY7OwUD8bQP6Xrkakk1vtREGCdcOPJxWmEZinWcZ7Ei-enTZuBRG85pVibGEj_1Bgw7jTGvgyxZDkb3D01FWqBOdleQdfsiKiVQpyOHgiYsQH1U25WAaZxLmiItgPjsyxbIpiYLNstJqNpWKguuuFrjO6LYTgruBE5ZVKOOfDPE8lAAccyIWey6UUnro2-oAXpWwtJtrQrjh1e-vEIH76Kg6-2wGixnteeUNmza3NQkFzWaOAV37yIetUyNjXIzh8l59v-krDJG__Z-7ZYtkAGzOsvsQ3xdpG7LkS9KSaIf1iePtBNsGbHmIRQO8e8wmV_amo_jTWf2y88dmIp_D6dLQQyAclqEVeFCKELc5MzwbEO6I6RY8gfraLmD3fDZF=w1366-h664",
        "title": "Informasi Lokasi Wisata",
        "text": "Butuh Informasi lokasi wisata?",
        "actions": [
          {
            "type": "message",
            "label": "Klik disini",
            "text": "Informasi"
          }
        ]
      }
    ]
  }
};

function handleEvent(event) {
	if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return client.replyMessage(event.replyToken,kotak_awal);
  }
  var kalimat = event.message.text;

  if(kalimat.toLowerCase() == "lapor"){
    var echo = {type: 'text', text : "Silahkan kirimkan detail laporan anda"};
    return client.replyMessage(event.replyToken,echo);
  }
  if(kalimat.toLowerCase() == "informasi"){
    var echo = {type: 'text', text : "Anda sedang berada di kota/kabupaten apa?"};
    return client.replyMessage(event.replyToken,echo);
  }
  if(kalimat.toLowerCase().length > 10){
    var echo ={type: 'text', text: "Laporanmu Lyana terima, terima kasih :)"};
    return client.replyMessage(event.replyToken,echo);
  }
  if(kalimat.toLowerCase() == 'malang'){
    var echo = {
      "type": "text",
      "text": "1. Batu Night Spectacular (HTM: Rp50.000)\n2. Jatim Park 1 (HTM: Rp60.000)\n3. Jatim Park 2 (HTM: Rp50.000)\n4. Jatim Park 3 (HTM: Rp80.000)"
    };
    return client.replyMessage(event.replyToken,echo);
  }
  // echo.text = 'Coba test';
  return client.replyMessage(event.replyToken,kotak_awal);
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