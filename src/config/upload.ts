import { File } from 'buffer';
import multer, { StorageEngine } from 'multer';
import path from 'path';

interface IUploadConfig {
  driver: 'firebase' | 'disk';
  tempFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'assets', 'uploads');
const tempFolder = path.resolve(__dirname, '..', '..', 'assets', 'temp');

export default {
  driver: process.env.STORAGE_DRIVER,
  directory: uploadFolder,
  tempFolder,
  multer: {
    //storage: multer.diskStorage({
    //  destination: tempFolder,
    //  filename(request, file, callback) {
    //    const filename = `${request.user.id}-${file.originalname}`;
    //    callback(null, filename);
    //  },
    //}),
  },
} as IUploadConfig;
