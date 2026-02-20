const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE = 'https://framerusercontent.com';
const images = [
  // Homepage
  { path: '/images/ACSVSU8pnh3frOWUrPpQOXvXA.jpg', dest: 'public/images/' },
  { path: '/assets/cAbnkI0AkEaDouR18fSragbzg78.png', dest: 'public/assets/' },
  { path: '/images/HcTNqoMpEO4zYf3mobWq0blOHo.svg', dest: 'public/images/' },
  { path: '/images/fRLmuHxT6FIdeQVg8fIuyFyLDq4.svg', dest: 'public/images/' },
  { path: '/images/BeNOgk1bEw5ZzKYubJxPaYLGiNQ.png', dest: 'public/images/' },
  { path: '/images/lcl2DYdGFcBg3duLXdVaoYUhn4.webp', dest: 'public/images/' },
  { path: '/images/8zmWBkx59Fg7in1lUniBis0o.png', dest: 'public/images/' },
  { path: '/images/OZfdhMviFUpV8nirAHRR7LazPY.png', dest: 'public/images/' },
  { path: '/images/TXwtdYzpB46YLNOWqlw5kC4DZM.webp', dest: 'public/images/' },
  { path: '/images/1OakTX1AX3vpPipZoeiQS3Rlc.png', dest: 'public/images/' },
  { path: '/images/KD7dvx0TuFUojm9zQgQ1tiPdzn8.jpg', dest: 'public/images/' },
  { path: '/images/9GjrDEGtPHn6adtz6YzwcmqTx8.jpg', dest: 'public/images/' },
  { path: '/images/sZ8mQikAtmpfYYZKcPwnJj6xw4.svg', dest: 'public/images/' },
  { path: '/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg', dest: 'public/images/' },
  { path: '/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg', dest: 'public/images/' },
  { path: '/images/s7y3sUoZtsF07OXIzT9n6tqVSo.jpg', dest: 'public/images/' },
  { path: '/images/xJEPhamNz683w6fG1UzarDByAs0.jpg', dest: 'public/images/' },
  { path: '/images/Q4NCqDjNdLfLqr6xFJrf6Qo.jpg', dest: 'public/images/' },
  { path: '/images/sKnteV5gw2KcXKo0be6tfzQBU.jpg', dest: 'public/images/' },
  { path: '/images/yroeEAgXVNPK8x6Bhi2PlNTtRc.jpg', dest: 'public/images/' },
  { path: '/images/GXQdapANe1hLJnrSnLGo19Po.jpg', dest: 'public/images/' },
  { path: '/images/OQ5AZmcp6OZoB6VxFrw1cVfRHC4.jpg', dest: 'public/images/' },
  { path: '/images/g0YusB2R02F67MNmL4nRCrOlyf0.jpg', dest: 'public/images/' },
  { path: '/images/IsgmnS8Sh2jY1lSKSyF63F0so.png', dest: 'public/images/' },
  { path: '/images/H9jxUEn4Q7yyuXHtXdW6nFaXJA.svg', dest: 'public/images/' },
  { path: '/images/YgonaRmqKXUm8wv6xvp3KapiYn4.svg', dest: 'public/images/' },
  // Team
  { path: '/images/6l2RuAqLCFzP1WOAW8QFvkwObek.jpg', dest: 'public/images/' },
  { path: '/images/3AcKoTlqGxxdHlnT0ZrIYBNUr3E.png', dest: 'public/images/' },
  { path: '/images/OrZAcCO7eE6m3mipW8FbkJHVnH0.jpg', dest: 'public/images/' },
  { path: '/images/Mu6g00IINsL9vZKg2fICiAICmbI.png', dest: 'public/images/' },
  // Footer
  { path: '/images/ZmzcFoFaght8UcgUwdo6S7XE.png', dest: 'public/images/' },
  { path: '/images/7uB7L1GyoURX7AiRe5OvCj8ruk.png', dest: 'public/images/' },
  // Resources
  { path: '/images/mDIvEXtY18ZeKV27B3MYvqdibIA.png', dest: 'public/images/' },
  { path: '/images/e8NET0zhNgIVg1syqhUBpGdYg.png', dest: 'public/images/' },
  { path: '/images/SiXwbQ3MKaMuquZBKZGv4wOGo.jpg', dest: 'public/images/' },
  { path: '/images/cTILoSni2SmsKQXxxrdswnL6J5Y.png', dest: 'public/images/' },
  { path: '/images/3FBDPuFXLZmHS0vuPPAnikEKoz4.png', dest: 'public/images/' },
  { path: '/images/zEiMslO2fx0F2VgmGo2kSt4.png', dest: 'public/images/' },
  { path: '/images/YNJTPqN216E58bQjWdLZO8H7BEY.svg', dest: 'public/images/' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        download(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

async function main() {
  fs.mkdirSync('public/images', { recursive: true });
  fs.mkdirSync('public/assets', { recursive: true });

  console.log(`Downloading ${images.length} images...`);
  let done = 0;
  for (const img of images) {
    const filename = path.basename(img.path);
    const destPath = path.join(img.dest, filename);
    try {
      await download(BASE + img.path, destPath);
      done++;
      process.stdout.write(`\r[${done}/${images.length}] ${filename}`);
    } catch (err) {
      console.error(`\nFailed: ${img.path} - ${err.message}`);
    }
  }
  console.log(`\nDone! Downloaded ${done} files.`);
}

main();
