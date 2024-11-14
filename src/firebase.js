// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBqZ4KTsOmg2J-vqb9Ry15FSZ5kvDYKYc", // Lấy từ biến môi trường
  authDomain: "my-website-cinema.firebaseapp.com",
  databaseURL: "https://my-website-cinema-default-rtdb.firebaseio.com",
  projectId: "my-website-cinema",
  storageBucket: "my-website-cinema.firebasestorage.app",
  messagingSenderId: "651908411692",
  appId: "1:651908411692:web:e91dd914347397180c7c89",
  measurementId: "G-BZK7L58ZB5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and providers
export const auth = getAuth(); // Xuất khẩu đối tượng auth
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();

// Các hàm đăng nhập và đăng ký
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed up:", userCredential.user);
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed in:", userCredential.user);
  } catch (error) {
    console.error("Error signing in:", error.message);
  }
};
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User signed in with Google:", result.user);
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
  }
};

export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    console.log("User signed in with Facebook:", result.user);
  } catch (error) {
    console.error("Error signing in with Facebook:", error.message);
  }
};

export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    console.log("User signed in with GitHub:", result.user);
  } catch (error) {
    console.error("Error signing in with GitHub:", error.message);
  }
};
