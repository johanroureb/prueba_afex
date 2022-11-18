import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  collection,
  getDocs,
  query,
  connectFirestoreEmulator,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import config from "../config";

class FirebaseProvider {
  constructor(env, config) {
    this.collection = config.collection;
    this._app = initializeApp(config);
    this._db = initializeFirestore(this._app, {});
    if (env == "dev") {
      connectFirestoreEmulator(this._db, "127.0.0.1", 8080);
    }
  }

  async getVideos() {
    const q = query(collection(this._db, this.collection));
    const results = await getDocs(q);
    return results;
  }
  async addVideo(id, data) {
    return await setDoc(doc(this._db, this.collection, id), data);
  }
  async deleteVideo(id) {
    return await deleteDoc(doc(this._db, this.collection, id));
  }
}
export default new FirebaseProvider(config.env, config.firebaseConfig);
