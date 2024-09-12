/*

This class is the main image handler used by the api.

It has two main function, store and get. The names should be obvious by store stores a new image in the database and get gets a image form the database.

*/
import { getRepository } from 'typeorm';

import { getConnection } from './db/index';
import { Image } from './db/Image';  // Import your Image entity

class ImageService {
  async uploadImage(file: Express.Multer.File) {
    const imageRepository = getConnection().getRepository(Image);

    const newImage = new Image();
    newImage.data = file.buffer;         // Store file buffer (binary data)

    return await imageRepository.save(newImage);  // Save the image entity and return it (inc the id)
  }

  async getImageById(id: number): Promise<Image | null> {
    const imageRepository = getConnection().getRepository(Image);
    return await imageRepository.findOne( { where: { id } } );     // Retrieve image by ID
  }
}

export default new ImageService();
