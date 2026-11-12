#!/bin/bash
# Pone este archivo en la carpeta con tus videos y ejecutalo (chmod +x optimizar-videos.sh && ./optimizar-videos.sh). Requiere ffmpeg (brew install ffmpeg)
cd "$(dirname "$0")"; mkdir -p optimizados
for f in *.mp4 *.mov *.mkv *.avi *.MP4 *.MOV; do [ -f "$f" ] || continue
  ffmpeg -y -i "$f" -vf "scale='if(gt(iw,ih),min(1920,iw),-2)':'if(gt(iw,ih),-2,min(1920,ih))'" -c:v libx264 -preset slow -crf 21 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k "optimizados/${f%.*}.mp4"
done
echo 'Listo: subi los videos de la carpeta "optimizados".'
