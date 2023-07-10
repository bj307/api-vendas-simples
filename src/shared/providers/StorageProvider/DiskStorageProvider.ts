import upload from '@config/upload';
import fs from 'fs';
import path from 'path';

export default class DiskStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(upload.tempFolder, file),
      path.resolve(upload.directory, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(upload.directory, file);

    try {
      await fs.promises.stat(filePath);
    } catch (error) {}
  }
}
