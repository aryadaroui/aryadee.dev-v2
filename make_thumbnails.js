import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

/** makes thumbnails from all images in a source directory and puts them in a target directory */
function make_thumbnails(source_dir, target_dir) {

  console.log(`making thumbnails from ${source_dir} into ${target_dir}`);

  fs.readdir(source_dir, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    // Create thumbnails directory if it doesn't exist
    if (!fs.existsSync(target_dir)) {
      fs.mkdirSync(target_dir);
    }

    async function process_images(files) {
      let image_sizes = {};
      for (const file of files) {
        if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.gif') || file.endsWith('.webp')) {
          const imgPath = path.join(source_dir, file);
          const thumbnailPath = path.join(target_dir, file);

          let img = sharp(imgPath);
          let img_metadata = await img.metadata();
          image_sizes[file.split(".")[0]] = { width: img_metadata.width, height: img_metadata.height };

          img.resize({
            width: 500,
            height: 500,
            fit: sharp.fit.outside,
            withoutEnlargement: true
          }).toFile(thumbnailPath, err => {
            if (err) {
              console.error(`Error generating thumbnail for ${file}: ${err}`);
            } else {
              console.log(`Generated thumbnail for ${file}`);
            }
          });
        }
      }

      fs.writeFileSync(path.join(source_dir, path.basename(source_dir) + '_image_sizes.json'), JSON.stringify(image_sizes))
    }

    process_images(files);

  });
}

/** find all markdown (.svx, not .md) files in a directory and its immediate subdirectory */
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

/** get the thumbnail path from a markdown file's YAML metadata */
function find_post_thumbnail_path(file) {
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

/** make thumbnails for the listed thumbnails in the frontmatter of each markdown file in a source directory and place them in a target directory */
function make_post_thumbnails(source_dir, target_dir) {

  console.log(`making thumbnails from ${source_dir} into ${target_dir}`);

  // Create thumbnails directory if it doesn't exist
  if (!fs.existsSync(target_dir)) {
    fs.mkdirSync(target_dir);
  }

  // files and their thumbnail paths
  const file_thumbs = find_markdown_files(source_dir).map((file) => {
    return { file: file, thumb: find_post_thumbnail_path(file) }
  })

  // loop through files and generate thumbnails
  file_thumbs.forEach((file_thumb) => {
    if (file_thumb.thumb === undefined) {
      // we alrady logged an error in find_post_thumbnail_path
      // console.error("\x1b[31m%s\x1b[0m", `No thumbnail found for ${file_thumb.file}`);
      return;
    }

    const thumbnailPath = path.join(target_dir, path.basename(file_thumb.file, '.svx') + '.webp');

    sharp(file_thumb.thumb)
      .resize({
        width: 500,
        height: 500,
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


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

console.log("* Generating thumbnails *");
const photos_dir = './src/routes/creative/assets/photos';
const art_dir = './src/routes/creative/assets/art';
const posts_dir = './src/posts';
const posts_thumbnails_dir = './static/blog/thumbnails';

make_thumbnails(photos_dir, photos_dir + '/thumbnails');
make_thumbnails(art_dir, art_dir + '/thumbnails');
make_post_thumbnails(posts_dir, posts_thumbnails_dir)


