import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const PHOTO_DIR = 'public/assets/images/photography';
const MAX_DIMENSION = 300;

async function generateThumbnail(imagePath, thumbnailPath) {
  try {
    // Get image metadata
    const metadata = await sharp(imagePath).metadata();
    
    // Calculate new dimensions maintaining aspect ratio
    const ratio = Math.max(metadata.width, metadata.height) / MAX_DIMENSION;
    const newWidth = Math.round(metadata.width / ratio);
    const newHeight = Math.round(metadata.height / ratio);

    // Generate thumbnail
    await sharp(imagePath)
      .resize(newWidth, newHeight)
      .png({ palette: true }) // Use 8-bit PNG
      .toFile(thumbnailPath);

    console.log(`Generated thumbnail: ${thumbnailPath}`);
  } catch (error) {
    console.error(`Error generating thumbnail for ${imagePath}:`, error);
  }
}

async function processCategory(categoryPath) {
  try {
    // Create thumbnails directory if it doesn't exist
    const thumbnailsDir = path.join(categoryPath, 'thumbnails');
    await fs.mkdir(thumbnailsDir, { recursive: true });

    // Get all image files in the category
    const files = await fs.readdir(categoryPath);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif)$/i.test(file) && 
      !file.includes('thumbnails/')
    );

    // Process each image
    for (const file of imageFiles) {
      const imagePath = path.join(categoryPath, file);
      const thumbnailName = `${path.parse(file).name}.png`;
      const thumbnailPath = path.join(thumbnailsDir, thumbnailName);

      // Check if thumbnail already exists
      try {
        await fs.access(thumbnailPath);
        console.log(`Thumbnail exists: ${thumbnailPath}`);
      } catch {
        // Thumbnail doesn't exist, generate it
        await generateThumbnail(imagePath, thumbnailPath);
      }
    }
  } catch (error) {
    console.error(`Error processing category ${categoryPath}:`, error);
  }
}

async function main() {
  try {
    // Get all category directories
    const categories = await fs.readdir(PHOTO_DIR);
    
    // Process each category
    for (const category of categories) {
      const categoryPath = path.join(PHOTO_DIR, category);
      const stats = await fs.stat(categoryPath);
      
      if (stats.isDirectory()) {
        console.log(`Processing category: ${category}`);
        await processCategory(categoryPath);
      }
    }
  } catch (error) {
    console.error('Error processing photos:', error);
  }
}

main(); 