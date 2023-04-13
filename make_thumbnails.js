import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
// import { readdir, existsSync, mkdirSync } from 'fs';
// import { join } from 'path';

// const photosDir = './static/photos';
// const thumbnailsDir = './static/photos/thumbnails';

// console.log('Generating thumbnails...');


// function make_thumbnails(err, files) {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   // Create thumbnails directory if it doesn't exist
//   if (!existsSync(thumbnailsDir)) {
//     mkdirSync(thumbnailsDir);
//   }

//   // Loop through files in photos directory and generate thumbnails
//   files.forEach(file => {
//     if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.gif') || file.endsWith('.webp')) {
//       const photoPath = join(photosDir, file);
//       const thumbnailPath = join(thumbnailsDir, file);

//       sharp(photoPath)
//         .resize(500)
//         .toFile(thumbnailPath, err => {
//           if (err) {
//             console.error(`Error generating thumbnail for ${file}: ${err}`);
//           } else {
//             console.log(`Generated thumbnail for ${file}`);
//           }
//         });
//     }
//   });

// }


// readdir(photosDir, (err, files) => {

// });

function generate_thumbnails(source_dir) {

  console.log(`Generating thumbnails for ${source_dir}...`);

  const thumbnail_dir = source_dir + '/thumbnails';

  fs.readdir(source_dir, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    // Create thumbnails directory if it doesn't exist
    if (!fs.existsSync(thumbnail_dir)) {
      fs.mkdirSync(thumbnail_dir);
    }

    // Loop through files in photos directory and generate thumbnails
    files.forEach(file => {
      if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.gif') || file.endsWith('.webp')) {
        const photoPath = path.join(source_dir, file);
        const thumbnailPath = path.join(thumbnail_dir, file);

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
}


generate_thumbnails('./static/photos');
generate_thumbnails('./static/art');