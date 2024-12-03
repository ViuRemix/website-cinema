// Import Firebase SDK modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Firestore
import {
  getAuth, // Auth
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  TwitterAuthProvider,
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

// Initialize Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app); // Firestore instance
export { createUserWithEmailAndPassword };
// Sign up with email and password
export const signUpWithEmail = async (email, password, navigate) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    toast.success("Sign Up Successful!");
    navigate("/"); // Chuyển đến trang Home sau khi đăng nhập
  } catch (error) {
    toast.error(error.message);
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Sign In Successful!");
    navigate("/"); // Chuyển đến trang Home sau khi đăng nhập
  } catch (error) {
    toast.error(error.message);
  }
};

// Hàm đăng nhập với Google
export const signInWithGoogle = async (setUser, navigate) => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider); // Mở popup đăng nhập
    setUser(result.user); // Lưu thông tin người dùng
    navigate("/"); // Chuyển đến trang Home sau khi đăng nhập
    console.log("Đăng nhập thành công:", result.user);
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error.message);
    alert(`Đăng nhập thất bại: ${error.message}`);
  }
};
// Sign in with Facebook
export const signInWithFacebook = async (setUser, setLoading, navigate) => {
  const provider = new FacebookAuthProvider();
  try {
    setLoading(true);
    const result = await signInWithPopup(auth, provider);
    navigate("/"); // Chuyển đến trang Home sau khi đăng nhập
    setUser(result.user); // Set user after login
    toast.success("Đăng nhập thành công với Facebook!");
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};

// Sign in with Github
export const signInWithGithub = async (setUser, setLoading, navigate) => {
  const provider = new GithubAuthProvider();
  try {
    setLoading(true);
    const result = await signInWithPopup(auth, provider);
    setUser(result.user); // Set user after login
    toast.success("Đăng nhập thành công với Github!");
    navigate("/"); // Chuyển đến trang Home sau khi đăng nhập
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};

export const signInWithTwitter = async (setUser, setLoading, navigate) => {
  const provider = new TwitterAuthProvider();
  try {
    setLoading(true);
    const result = await signInWithPopup(auth, provider);
    setUser(result.user); // Cập nhật user sau khi đăng nhập
    toast.success("Đăng nhập thành công với Twitter!");
    navigate("/"); // Chuyển đến trang Home sau khi đăng nhập
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
    window.location.reload(); // Tải lại trang để cập nhật giao diện
  } catch (error) {
    toast.error(error.message);
  }
};
//
