const Jimp = require('jimp')


const main = () => {
  return Jimp.read('test/test.png')
          .then(image => {
            image
              .cover(250, 250, Jimp.VERTICAL_ALIGN_TOP)
              .write('test/testCopy.png')
          })
          
}


// async function main() {
//   const image = await Jimp.read('test/test.png');

//   image
//     .cover(
//       250,
//       250,
//     )
//     .write('test/testCrop.png')
// }

// main();

module.exports = main