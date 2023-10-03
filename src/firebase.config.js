import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCQqHGI_LZfvL6-OtnfJsKISJ-Jo_esPxU",
  authDomain: "registration-form-8999b.firebaseapp.com",
  projectId: "registration-form-8999b",
  storageBucket: "registration-form-8999b.appspot.com",
  messagingSenderId: "323842977259",
  appId: "1:323842977259:web:bcaa54c244ed83a9c6fdae"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;