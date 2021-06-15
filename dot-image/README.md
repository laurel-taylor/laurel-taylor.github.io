# build
## for creating new images
Install `readline` for node and [imagemagick](https://imagemagick.org/script/download.php).



# run
```
python -m SimpleHTTPServer
```
go to `https://localhost:8000`



# make new image
Save image as `images/processing/myimage.png`  (or .jpg or whatever)

Open `./images` in terminal

Run:
```
convert processing/myimage.png txt: >> processing/img.txt && node ./makeJson.js
```
This will make a `/images/processing/img.json` file which is then used by the script
