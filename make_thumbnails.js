import sharp from 'sharp';
import { readdir, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const photosDir = './static/photos';
const thumbnailsDir = './static/photos/thumbnails';

console.log('Generating thumbnails...');

readdir(photosDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  // Create thumbnails directory if it doesn't exist
  if (!existsSync(thumbnailsDir)) {
    mkdirSync(thumbnailsDir);
  }

  // Loop through files in photos directory and generate thumbnails
  files.forEach(file => {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.gif') || file.endsWith('.webp')) {
      const photoPath = join(photosDir, file);
      const thumbnailPath = join(thumbnailsDir, file);

      sharp(photoPath)
        .resize(500)
        .toFile(thumbnailPath, err => {
          if (err) {
            console.error(`Error generating thumbnail for ${file}: ${err}`);
          } else {
            console.log(`Generated thumbnail for ${file}`);
          }
        });
    }
  });
});

