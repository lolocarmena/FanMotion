@echo off
REM Pone este archivo en la carpeta con tus videos y hacele doble clic. Requiere ffmpeg (winget install ffmpeg)
cd /d "%~dp0"
if not exist optimizados mkdir optimizados
for %%f in (*.mp4 *.mov *.mkv *.avi) do ffmpeg -y -i "%%f" -vf "scale='if(gt(iw,ih),min(1920,iw),-2)':'if(gt(iw,ih),-2,min(1920,ih))'" -c:v libx264 -preset slow -crf 21 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k "optimizados\%%~nf.mp4"
echo Listo: subi los videos de la carpeta "optimizados".
pause
