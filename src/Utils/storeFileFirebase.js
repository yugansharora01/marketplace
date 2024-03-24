import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/Config/firebase.config";

const storeFileFirebase = async (path, data, afterFunc) => {
  const dataRef = ref(storage, path);
  await uploadBytes(dataRef, data).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => {
      afterFunc(url);
    });
  });
};

export default storeFileFirebase;
