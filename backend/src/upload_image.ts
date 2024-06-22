import { storage } from "./utils/firebase.config.js";
import { readFileSync } from "fs";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const filePath = 'D:/The-Book-Project/backend/images/isthisnormally.png';
const file = readFileSync(filePath);

const uploadImage = async () => {
  try {
    const storageRef = ref(storage, 'test-series/bao-test-image.png');
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
};

//uploadImage();