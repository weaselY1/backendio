/////////////////////////////////////////////////////////////////
// Notification Push Sender
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

var admin = require('firebase-admin');

// Admin SDK ใช้คู่กับ private key ที่โหลดจากแท๊ป Service accouts ในหน้า Setting ของ Firebase
var serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testjs-d42fd.firebaseio.com"
});

///////////////////////////////////////////
// กรณีส่ง user เดียว

// var registrationToken = 'fhUcf59pzcT4RrEtuUU_wr:APA91bEuXylHd-cfT2-5b8-kzM7ebxTjQpmwRH5hqFqwaSLRxxgFEtTYbphHfekbKkVlrs5RZtRmX1K0M7J8H7mtHBrnSl2Ymw9VlXkOBFUOYN-MSzB_06tI6WAUMN6rYfrhD3TVQVUc';
//
// var message = {
//   notification: {
//     // ตั้ง text หัว notification แล้ว ข้อความ body message
//     title: "head check",
//     body: "message"
//   },
//   webpush: {
//     fcm_options: {
//       // ลิ้งเมื่อคลิ้ก notification แล้วจะเข้าลิ้งที่ระบุ
//       link: "https://google.com"
//     }
//   },
//   token: registrationToken
// };
//
// // Send a message to the device corresponding to the provided
// // registration token.
// admin.messaging().send(message)
//   .then((response) => {
//     // Response is a message ID string.
//     console.log('Successfully sent message:', response);
//   })
//   .catch((error) => {
//     console.log('Error sending message:', error);
//   });


///////////////////////////////////////////
// กรณีส่งหลาย user ใช้ token เป็น array
  var registrationTokens = [
    'fhUcf59pzcT4RrEtuUU_wr:APA91bEuXylHd-cfT2-5b8-kzM7ebxTjQpmwRH5hqFqwaSLRxxgFEtTYbphHfekbKkVlrs5RZtRmX1K0M7J8H7mtHBrnSl2Ymw9VlXkOBFUOYN-MSzB_06tI6WAUMN6rYfrhD3TVQVUc',
    'dPtkrtge0ibEQGi6CNlcPP:APA91bHX1yS8bHDYbndyWetVjDKxJkFweMUsqVTyn5YynJDc6-DpnM6_2QsEQkLAkp2uR0_4kGj-zpyhHlniUP84YyMXN5EOTd8O9A6ABJv7NW_dzx55hGpmEtJCTuejyRBIUrvzSwZI'
  ];

  const message = {
    notification: {
      // ตั้ง text หัว notification แล้ว ข้อความ body message
      title: "head check",
      body: "message"
    },
    webpush: {
      fcm_options: {
        // ลิ้งเมื่อคลิ้ก notification แล้วจะเข้าลิ้งที่ระบุ
        link: "https://google.com"
      }
    },
    tokens: registrationTokens,
  }

  admin.messaging().sendMulticast(message)
  .then((response) => {
    console.log(response.successCount + ' messages were sent successfully');
  });


// ในกรณีนี้เวลาใช้ผ่าน CLI คำสั่ง node send.js ใน directory โปรเจคนี้
