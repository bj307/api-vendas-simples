import { initializeApp } from 'firebase/app';
import AppError from '@shared/errors/AppError';
import firebase from '@config/firebase.config';
import { Request } from 'express';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from 'firebase/storage';

initializeApp(firebase.firebaseConfig);
const storage = getStorage();

export default class FirebaseStorageProvider {
  public async saveFile(req: Request): Promise<string | any> {
    if (!req.file) {
      throw new AppError('No file uploaded.');
    }

    const img = req.user.id;
    const nameFile = img + '.' + req.file.originalname.split('.').pop();

    const fileRef = ref(storage, nameFile);

    uploadBytesResumable(fileRef, req.file.buffer).then(snapshot => {
      console.log('Uploaded a blob or file!');
    });

    return nameFile;
  }

  public async deleteFile(file: String): Promise<void> {
    const storageRef = ref(storage, `${file}`);
    await deleteObject(storageRef)
      .then(() => {})
      .catch(error => {
        console.log('aqui');
      });
  }
}
