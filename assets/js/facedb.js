const request = require('request')
const rp = require('request-promise-native')
require('dotenv').config()
const keys = require('./keys.js')
const gKeys = keys.google
// const fireApiKey = keys.firebase.key
// const facePlusKey = keys.faceplus.key
// const facePlusSecret = keys.faceplus.secret
// const faceSetToken = '9711957eacdcac8875925abca37d090c'
const facepp = require('./faceplusplus.js')
const fs = require('fs')
const getImage = require('./getimage.js')
const getZodiac = require('./getzodiac.js')
// const getImgUrl = require('./getimgurl.js')
const getGoogleUrl = require('./getgoogle.js')
// const resizeImg = require('./resize.js')
const Jimp = require("jimp")
// const firebase = require("firebase");

const admin = require('firebase-admin')


const serviceAccount = require('../../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-celebrity-horoscope.firebaseio.com",
  storageBucket: "my-celebrity-horoscope.appspot.com"
});
const db = admin.database();
const storage = admin.storage();


// const firebaseConfig = {
//   apiKey: "AIzaSyB3OK_gHk-gUawA0rVSWZH-P4IIHL9BooM",
//   authDomain: "my-celebrity-horoscope.firebaseapp.com",
//   databaseURL: "https://my-celebrity-horoscope.firebaseio.com",
//   projectId: "my-celebrity-horoscope",
//   storageBucket: "my-celebrity-horoscope.appspot.com",
//   messagingSenderId: "290575991301"
// };
// firebase.initializeApp(firebaseConfig);
// const database = firebase.database();


// let wikiPic = Array.from(document.querySelectorAll('.infobox.biography img'))[0].src
// let rawZod = Array.from(document.querySelectorAll('a.lienPosition')).filter(elm => elm.href.includes('0'))[0].textContent
// let rawZod = '25-7 Capricorn';
// let zod = rawZod.slice(rawZod.indexOf(' ') + 1);








const getImgZod = (target) => {
  let zodTarg = target.replace(' ', '_')
  return Promise.all([
    // getZodiac(zodTarg),
    // getImgUrl(target),
    getGoogleUrl(target)
  ]).then(values => {
    let imageUrl = values[0]
    if (!imageUrl) return null
    // console.log (!imageUrl)
    return getImage(values[0], 'test/test.png', (thing) => {
      console.log('done')
      Jimp.read('test/test.png')
          .then(image => {
            image
              .cover(250, 250, Jimp.VERTICAL_ALIGN_TOP | Jimp.HORIZONTAL_ALIGN_CENTER)
              .write('test/testCopy.png')
          })
      return thing
    })
  })
  .then(resp => console.log(!!resp))
  .then()
  .catch(err => console.error(err))
}

const uploadImage = (faceToken) => {
  let image;
  return new Promise((resolve,reject) => {
    let storageBucket = storage.bucket()
    // let storageRef = storage.ref('/celebImages/' + faceToken + '.png')
    image =  storageBucket.file(`celebImages/${faceToken}.png`)
    fs.createReadStream('test/testCopy.png')
      .pipe(image.createWriteStream())
      .on('error', err => {
        console.log(err)
        reject(err)
      })
      .on('finish', (result) => {
        console.log('complete')
        resolve(result);
      })      
  })
    .then(() => {
      return image.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
      })
    })    
    .then(signedUrls => {
      // signedUrls[0] contains the file's public URL
      // console.log(signedUrls[0])
      return signUrls[0]
    })
}

uploadImage('1234567')
// .then(res => console.log(res))

// Promise.all([
//   getZodiac('Bradley_Cooper'),
//   getImgUrl('Bradley Cooper')
// ]).then(values => getImage(values[1], 'test.png', () => {
//   console.log('done')
// }))

// console.log('zodiac works:' + getZodiac('Bradley_Cooper'))
// console.log('image url works: ' + getImgUrl('Bradley Cooper'))

// const proofOfConcept = (name) => {
//   return getImgUrl(name)
//           .then(url => getImage(url, 'test.png', () => {
//             console.log('done')
//           }))
// }

// proofOfConcept(process.argv[2])

// getImgZod(process.argv[2])


// TODO: return multiple images from GIS, then choose one that is an image
// TODO: upload cropped image to firebase storage
// todo: create entry for image in celebsref on firebase db
// todo: run face++ for the image
// todo: store face++ 
// todo: continue firebase fuckery


// database.ref('addFaceUsers').once('value', snap => console.log(snap.val()))
// db.ref('addFaceUsers').once('value', snap => console.log(snap.val()))

// facepp.searchToken('https://firebasestorage.googleapis.com/v0/b/my-celebrity-horoscope.appspot.com/o/celebImages%2F1234567.png?alt=media&token=4d5af896-ffdc-45d6-a69f-4f0291051d32')