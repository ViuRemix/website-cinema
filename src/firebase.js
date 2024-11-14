// Import the functions you need from the SDKs you need
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
  apiKey: process.env.REACT_APP_API_KEY,
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
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();

// Hàm đăng ký với Email/Password
const signUpWithEmail = async (email, password) => {
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

// Hàm đăng nhập với Email/Password
const signInWithEmail = async (email, password) => {
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

// Hàm đăng nhập với Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User signed in with Google:", result.user);
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
  }
};

// Hàm đăng nhập với Facebook
const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    console.log("User signed in with Facebook:", result.user);
  } catch (error) {
    console.error("Error signing in with Facebook:", error.message);
  }
};

// Hàm đăng nhập với GitHub
const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    console.log("User signed in with GitHub:", result.user);
  } catch (error) {
    console.error("Error signing in with GitHub:", error.message);
  }
};

// Hàm đăng nhập với Twitter
const signInWithTwitter = async () => {
  try {
    const result = await signInWithPopup(auth, twitterProvider);
    console.log("User signed in with Twitter:", result.user);
  } catch (error) {
    console.error("Error signing in with Twitter:", error.message);
  }
};
///////// các phương thức gọi khi click vào button
// <button onClick={() => signInWithGoogle()}>Đăng nhập với Google</button>
// <button onClick={() => signInWithFacebook()}>Đăng nhập với Facebook</button>
// <button onClick={() => signInWithGithub()}>Đăng nhập với GitHub</button>
// <button onClick={() => signInWithTwitter()}>Đăng nhập với Twitter</button>
// <button onClick={() => signInWithEmail(email, password)}>Đăng nhập với Email</button>
// <button onClick={() => signUpWithEmail(email, password)}>Đăng ký với Email</button>
