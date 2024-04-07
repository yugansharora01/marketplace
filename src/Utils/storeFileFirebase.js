import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/Config/firebase.config";

export const storeAndDeleteFileFirebase = async (path, data, filePath) => {
  const url = await storeFileFirebase(path, data);
  await DeleteFileFirebase(filePath);
  return url;
};

export const DeleteFileFirebase = async (filePath) => {
  if (filePath && filePath !== "") {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    console.log("Deleting Finished");
  }
};

export const storeFileFirebase = async (path, data) => {
  const dataRef = ref(storage, path);
  const snapshot = await uploadBytes(dataRef, data);
  const url = await getDownloadURL(snapshot.ref);
  console.log("Uploading successfull");
  return url;
};
