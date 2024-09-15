"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./db/index");
const Image_1 = require("./db/Image"); // Import your Image entity
class ImageService {
    // Uploads a new image to the database
    uploadImage(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageRepository = (0, index_1.getConnection)().getRepository(Image_1.Image);
            const newImage = new Image_1.Image();
            newImage.data = file.buffer; // Store file buffer (binary data)
            return yield imageRepository.save(newImage); // Save the image entity and return it (inc the id)
        });
    }
    // Gets an image based on the id
    getImageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageRepository = (0, index_1.getConnection)().getRepository(Image_1.Image);
            return yield imageRepository.findOne({ where: { id } }); // Retrieve image by ID
        });
    }
}
// Allows the image service to be accessable (and it's functions) outside of this file
exports.default = new ImageService();
