import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADU7EwmE6oMz-hLHk4HN1CgqvuYMI4zrQ",
  authDomain: "website-watching-film.firebaseapp.com",
  projectId: "website-watching-film",
  storageBucket: "website-watching-film.appspot.com",
  messagingSenderId: "486270135974",
  appId: "1:486270135974:web:fa2d64578fa1d6f8dc4e67",
  measurementId: "G-QHFDNWJJ40",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // Export auth here

// Sign up with email and password
export const signUpWithEmail = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    toast.success("Sign Up Successful!");
  } catch (error) {
    toast.error(error.message);
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Sign In Successful!");
  } catch (error) {
    toast.error(error.message);
  }
};

// Đăng nhập với Google
export const signInWithGoogle = async (setUser, setLoading) => {
  const provider = new GoogleAuthProvider();
  try {
    setLoading(true);
    const result = await signInWithPopup(auth, provider);
    setUser(result.user); // Cập nhật user sau khi đăng nhập
    toast.success("Đăng nhập thành công với Google!");
  } catch (error) {
    // Kiểm tra lỗi 'popup-closed-by-user'
    if (error.code === "auth/popup-closed-by-user") {
      toast.info("Bạn đã đóng cửa sổ xác thực trước khi hoàn tất.");
    } else {
      toast.error(error.message);
    }
  } finally {
    setLoading(false);
  }
};

// Sign in with Facebook
export const signInWithFacebook = async (setUser, setLoading) => {
  const provider = new FacebookAuthProvider();
  try {
    setLoading(true);
    const result = await signInWithPopup(auth, provider);
    setUser(result.user); // Set user after login
    toast.success("Đăng nhập thành công với Facebook!");
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};

// Sign in with Github
export const signInWithGithub = async (setUser, setLoading) => {
  const provider = new GithubAuthProvider();
  try {
    setLoading(true);
    const result = await signInWithPopup(auth, provider);
    setUser(result.user); // Set user after login
    toast.success("Đăng nhập thành công với Github!");
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};

// Hàm đăng xuất
export const logOut = async () => {
  try {
    await signOut(auth);
    toast.success("Đăng xuất thành công!");
  } catch (error) {
    toast.error(error.message);
  }
};
//
