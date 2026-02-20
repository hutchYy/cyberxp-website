#!/bin/bash
# Download all images used in the CyberXP site from framerusercontent.com CDN
# Run this script from the project root: bash download-images.sh

BASE="https://framerusercontent.com"
mkdir -p public/images public/assets

echo "Downloading images..."

# Homepage images
curl -sL "$BASE/images/ACSVSU8pnh3frOWUrPpQOXvXA.jpg" -o public/images/ACSVSU8pnh3frOWUrPpQOXvXA.jpg
curl -sL "$BASE/assets/cAbnkI0AkEaDouR18fSragbzg78.png" -o public/assets/cAbnkI0AkEaDouR18fSragbzg78.png
curl -sL "$BASE/images/HcTNqoMpEO4zYf3mobWq0blOHo.svg" -o public/images/HcTNqoMpEO4zYf3mobWq0blOHo.svg
curl -sL "$BASE/images/fRLmuHxT6FIdeQVg8fIuyFyLDq4.svg" -o public/images/fRLmuHxT6FIdeQVg8fIuyFyLDq4.svg
curl -sL "$BASE/images/BeNOgk1bEw5ZzKYubJxPaYLGiNQ.png" -o public/images/BeNOgk1bEw5ZzKYubJxPaYLGiNQ.png
curl -sL "$BASE/images/lcl2DYdGFcBg3duLXdVaoYUhn4.webp" -o public/images/lcl2DYdGFcBg3duLXdVaoYUhn4.webp
curl -sL "$BASE/images/8zmWBkx59Fg7in1lUniBis0o.png" -o public/images/8zmWBkx59Fg7in1lUniBis0o.png
curl -sL "$BASE/images/OZfdhMviFUpV8nirAHRR7LazPY.png" -o public/images/OZfdhMviFUpV8nirAHRR7LazPY.png
curl -sL "$BASE/images/TXwtdYzpB46YLNOWqlw5kC4DZM.webp" -o public/images/TXwtdYzpB46YLNOWqlw5kC4DZM.webp
curl -sL "$BASE/images/1OakTX1AX3vpPipZoeiQS3Rlc.png" -o public/images/1OakTX1AX3vpPipZoeiQS3Rlc.png
curl -sL "$BASE/images/KD7dvx0TuFUojm9zQgQ1tiPdzn8.jpg" -o public/images/KD7dvx0TuFUojm9zQgQ1tiPdzn8.jpg
curl -sL "$BASE/images/9GjrDEGtPHn6adtz6YzwcmqTx8.jpg" -o public/images/9GjrDEGtPHn6adtz6YzwcmqTx8.jpg
curl -sL "$BASE/images/sZ8mQikAtmpfYYZKcPwnJj6xw4.svg" -o public/images/sZ8mQikAtmpfYYZKcPwnJj6xw4.svg
curl -sL "$BASE/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg" -o public/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg
curl -sL "$BASE/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg" -o public/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg
curl -sL "$BASE/images/s7y3sUoZtsF07OXIzT9n6tqVSo.jpg" -o public/images/s7y3sUoZtsF07OXIzT9n6tqVSo.jpg
curl -sL "$BASE/images/xJEPhamNz683w6fG1UzarDByAs0.jpg" -o public/images/xJEPhamNz683w6fG1UzarDByAs0.jpg
curl -sL "$BASE/images/Q4NCqDjNdLfLqr6xFJrf6Qo.jpg" -o public/images/Q4NCqDjNdLfLqr6xFJrf6Qo.jpg
curl -sL "$BASE/images/sKnteV5gw2KcXKo0be6tfzQBU.jpg" -o public/images/sKnteV5gw2KcXKo0be6tfzQBU.jpg
curl -sL "$BASE/images/yroeEAgXVNPK8x6Bhi2PlNTtRc.jpg" -o public/images/yroeEAgXVNPK8x6Bhi2PlNTtRc.jpg
curl -sL "$BASE/images/GXQdapANe1hLJnrSnLGo19Po.jpg" -o public/images/GXQdapANe1hLJnrSnLGo19Po.jpg
curl -sL "$BASE/images/OQ5AZmcp6OZoB6VxFrw1cVfRHC4.jpg" -o public/images/OQ5AZmcp6OZoB6VxFrw1cVfRHC4.jpg
curl -sL "$BASE/images/g0YusB2R02F67MNmL4nRCrOlyf0.jpg" -o public/images/g0YusB2R02F67MNmL4nRCrOlyf0.jpg
curl -sL "$BASE/images/IsgmnS8Sh2jY1lSKSyF63F0so.png" -o public/images/IsgmnS8Sh2jY1lSKSyF63F0so.png
curl -sL "$BASE/images/H9jxUEn4Q7yyuXHtXdW6nFaXJA.svg" -o public/images/H9jxUEn4Q7yyuXHtXdW6nFaXJA.svg
curl -sL "$BASE/images/YgonaRmqKXUm8wv6xvp3KapiYn4.svg" -o public/images/YgonaRmqKXUm8wv6xvp3KapiYn4.svg

# Team page images
curl -sL "$BASE/images/6l2RuAqLCFzP1WOAW8QFvkwObek.jpg" -o public/images/6l2RuAqLCFzP1WOAW8QFvkwObek.jpg
curl -sL "$BASE/images/3AcKoTlqGxxdHlnT0ZrIYBNUr3E.png" -o public/images/3AcKoTlqGxxdHlnT0ZrIYBNUr3E.png
curl -sL "$BASE/images/OrZAcCO7eE6m3mipW8FbkJHVnH0.jpg" -o public/images/OrZAcCO7eE6m3mipW8FbkJHVnH0.jpg
curl -sL "$BASE/images/Mu6g00IINsL9vZKg2fICiAICmbI.png" -o public/images/Mu6g00IINsL9vZKg2fICiAICmbI.png

# Footer logos
curl -sL "$BASE/images/ZmzcFoFaght8UcgUwdo6S7XE.png" -o public/images/ZmzcFoFaght8UcgUwdo6S7XE.png
curl -sL "$BASE/images/7uB7L1GyoURX7AiRe5OvCj8ruk.png" -o public/images/7uB7L1GyoURX7AiRe5OvCj8ruk.png

# Resources page images
curl -sL "$BASE/images/mDIvEXtY18ZeKV27B3MYvqdibIA.png" -o public/images/mDIvEXtY18ZeKV27B3MYvqdibIA.png
curl -sL "$BASE/images/e8NET0zhNgIVg1syqhUBpGdYg.png" -o public/images/e8NET0zhNgIVg1syqhUBpGdYg.png
curl -sL "$BASE/images/SiXwbQ3MKaMuquZBKZGv4wOGo.jpg" -o public/images/SiXwbQ3MKaMuquZBKZGv4wOGo.jpg
curl -sL "$BASE/images/cTILoSni2SmsKQXxxrdswnL6J5Y.png" -o public/images/cTILoSni2SmsKQXxxrdswnL6J5Y.png
curl -sL "$BASE/images/3FBDPuFXLZmHS0vuPPAnikEKoz4.png" -o public/images/3FBDPuFXLZmHS0vuPPAnikEKoz4.png
curl -sL "$BASE/images/zEiMslO2fx0F2VgmGo2kSt4.png" -o public/images/zEiMslO2fx0F2VgmGo2kSt4.png
curl -sL "$BASE/images/YNJTPqN216E58bQjWdLZO8H7BEY.svg" -o public/images/YNJTPqN216E58bQjWdLZO8H7BEY.svg

echo "Done! Downloaded $(ls public/images/ public/assets/ | wc -l) files."
