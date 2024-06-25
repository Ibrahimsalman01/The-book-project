import { storage } from "../utils/firebase.config.js";
import { readFileSync, existsSync } from "fs";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export class FirebaseRepository {
  public async uploadImage(filePath: string): Promise<void> {
    try {
      
      const file = readFileSync(filePath);
      const storageRef = ref(storage, 'test-series/bao-image-test.png');
      const metadata = { contentType: 'image/png' };
  
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Upload failed: ', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);
        }
      );
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  }
  
  public async getImage(imagePath: string): Promise<string> {  
    try {
      const storageRef = ref(storage, imagePath);
      const downloadURL = await getDownloadURL(storageRef);
      console.log('Download URL:', downloadURL);
      return downloadURL;
    }
    catch (error) {
    console.error('Error uploading image: ', error);
  } 
}

}
