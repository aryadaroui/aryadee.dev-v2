import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

function make_thumbnails(source_dir, target_dir) {

  console.log(`making thumbnails from ${source_dir} into ${target_dir}`);

  // const thumbnail_dir = source_dir + '/thumbnails';


  fs.readdir(source_dir, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    // Create thumbnails directory if it doesn't exist
    if (!fs.existsSync(target_dir)) {
      fs.mkdirSync(target_dir);
    }

    // Loop through files in photos directory and generate thumbnails
    files.forEach(file => {
      if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.gif') || file.endsWith('.webp')) {
        const photoPath = path.join(source_dir, file);
        const thumbnailPath = path.join(target_dir, file);

        sharp(photoPath)
          .resize(400)
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

// a function to  a find all markdown files in a directory and its immediate subdirectory
function find_markdown_files(start_dir) {
  let markdown_files = [];

  fs.readdirSync(start_dir).forEach((file) => {
    const filepath = path.join(start_dir, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      // recurse
      const subfiles = find_markdown_files(filepath);
      markdown_files = markdown_files.concat(subfiles);
    } else if (stat.isFile() && file.endsWith('.svx')) {
      markdown_files.push(filepath);
    }
  });

  return markdown_files;
}

function find_thumbnail_path(file) {
  const data = fs.readFileSync(file, 'utf8');
  const content = data.split("---\n");
  const frontmatter = yaml.load(content[1]);
  let thumbnail_path = frontmatter.thumbnail;

  // for the thumbnail, if it's an absolute path, return it, otherwise, return the path relative to the file, i.e. make it into an absolute path
  if (thumbnail_path === undefined) {
    console.error("\x1b[31m%s\x1b[0m", `No thumbnail defined for ${file}`);
    return undefined;
  } else if (path.isAbsolute(thumbnail_path)) {
    return thumbnail_path;
  }
  else {
    return path.join(path.dirname(file), thumbnail_path);
  }
}



function make_post_thumbnails(source_dir, target_dir) {

  console.log(`making thumbnails from ${source_dir} into ${target_dir}`);

  // Create thumbnails directory if it doesn't exist
  if (!fs.existsSync(target_dir)) {
    fs.mkdirSync(target_dir);
  }

  // files and their thumbnail paths
  const file_thumbs = find_markdown_files(source_dir).map((file) => {
    return { file: file, thumb: find_thumbnail_path(file) }
  })

  // loop through files and generate thumbnails
  file_thumbs.forEach((file_thumb) => {
    if (file_thumb.thumb === undefined) {
      // console.error("\x1b[31m%s\x1b[0m", `No thumbnail found for ${file_thumb.file}`);
      return;
    }

    const thumbnailPath = path.join(target_dir, path.basename(file_thumb.file, '.svx') + '.webp');

    sharp(file_thumb.thumb)
      .resize({
        width: 400,
        height: 400,
        fit: sharp.fit.outside,
        withoutEnlargement: true
      })
      .toFile(thumbnailPath, err => {
        if (err) {
          console.error("\x1b[31m%s\x1b[0m", `Error generating thumbnail for ${file_thumb.file}:`);
          console.error(`┗ ${err}`);
        } else {
          console.log(`Generated thumbnail for ${path.basename(file_thumb.file)}`);
        }
      });
  })
}


// ----
console.log("* Generating thumbnails *");
const photos_dir = './static/creative/photos';
const art_dir = './static/creative/art';
const posts_dir = './src/posts';
const posts_thumbnails_dir = './static/blog/thumbnails';
const test_post = './src/posts/_error.svx'

make_thumbnails(photos_dir, photos_dir + '/thumbnails');
make_thumbnails(art_dir, art_dir + '/thumbnails');
make_post_thumbnails(posts_dir, posts_thumbnails_dir)

// ----

