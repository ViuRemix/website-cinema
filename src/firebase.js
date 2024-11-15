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
import { toast } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Đừng quên import CSS

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
    const toastId = toast.success(
      `Chào mừng ${userCredential.user.displayName}! Bạn đã đăng ký thành công.`
    );
    setTimeout(() => {
      toast.dismiss(toastId); // Tắt thông báo sau 2 giây
    }, 2000);
  } catch (error) {
    console.error("Error signing up:", error.message);
    const toastId = toast.error("Đã có lỗi xảy ra trong quá trình đăng ký.");
    setTimeout(() => {
      toast.dismiss(toastId); // Tắt thông báo sau 2 giây
    }, 2000);
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
    const toastId = toast.success(
      `Chào mừng trở lại, ${userCredential.user.displayName}! Bạn đã đăng nhập thành công.`
    );
    setTimeout(() => {
      toast.dismiss(toastId); // Tắt thông báo sau 2 giây
    }, 2000);
  } catch (error) {
    console.error("Error signing in:", error.message);
    const toastId = toast.error("Đã có lỗi xảy ra trong quá trình đăng nhập.");
    setTimeout(() => {
      toast.dismiss(toastId); // Tắt thông báo sau 2 giây
    }, 2000);
  }
};
export const signInWithGoogle = async (setUser, setLoading) => {
  setLoading(true); // Bắt đầu loading
  try {
    const result = await signInWithPopup(auth, googleProvider); // Đăng nhập với Google
    const loggedInUser = result.user; // Lấy thông tin người dùng
    setUser(loggedInUser); // Cập nhật thông tin người dùng vào state
    localStorage.setItem("user", JSON.stringify(loggedInUser)); // Lưu thông tin người dùng vào localStorage

    // Hiển thị thông báo thành công
    const toastId = toast.success(
      `Chào mừng ${
        loggedInUser.displayName || loggedInUser.email
      }! Bạn đã đăng nhập thành công với Google.`
    );
    setTimeout(() => {
      toast.dismiss(toastId); // Tắt thông báo sau 2 giây
    }, 2000);
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
    // Hiển thị thông báo lỗi
    const toastId = toast.error(
      "Đã có lỗi xảy ra trong quá trình đăng nhập với Google."
    );
    setTimeout(() => {
      toast.dismiss(toastId); // Tắt thông báo sau 2 giây
    }, 2000);
  } finally {
    setLoading(false); // Kết thúc loading
  }
};

export const signInWithFacebook = async (setUser, setLoading) => {
  setLoading(true); // Bắt đầu loading
  try {
    const result = await signInWithPopup(auth, facebookProvider); // Đăng nhập với Facebook
    const loggedInUser = result.user; // Lấy thông tin người dùng
    setUser(loggedInUser); // Cập nhật thông tin người dùng vào state
    localStorage.setItem("user", JSON.stringify(loggedInUser)); // Lưu thông tin người dùng vào localStorage

    // Hiển thị thông báo thành công
    const toastId = toast.success(
      `Chào mừng ${
        loggedInUser.displayName || loggedInUser.email
      }! Bạn đã đăng nhập thành công với Facebook.`
    );
    setTimeout(() => {
      toast.dismiss(toastId); // Tắt thông báo sau 2 giây
    }, 2000);
  } catch (error) {
    console.error("Error signing in with Facebook:", error.message);
    const toastId = toast.error(
      "Đã có lỗi xảy ra trong quá trình đăng nhập với Facebook."
    );
    setTimeout(() => {
      toast.dismiss(toastId); // Tắt thông báo sau 2 giây
    }, 2000);
  } finally {
    setLoading(false); // Kết thúc loading
  }
};

export const signInWithGithub = async (setUser, setLoading) => {
  setLoading(true); // Bắt đầu loading
  try {
    const result = await signInWithPopup(auth, githubProvider); // Đăng nhập với Github
    const loggedInUser = result.user; // Lấy thông tin người dùng
    setUser(loggedInUser); // Cập nhật thông tin người dùng vào state
    localStorage.setItem("user", JSON.stringify(loggedInUser)); // Lưu thông tin người dùng vào localStorage

    // Hiển thị thông báo thành công
    const toastId = toast.success(
      `Chào mừng ${
        loggedInUser.displayName || loggedInUser.email
      }! Bạn đã đăng nhập thành công với GitHub.`
    );
    setTimeout(() => {
      toast.dismiss(toastId); // Tắt thông báo sau 2 giây
    }, 2000);
  } catch (error) {
    console.error("Error signing in with GitHub:", error.message);
    const toastId = toast.error(
      "Đã có lỗi xảy ra trong quá trình đăng nhập với GitHub."
    );
    setTimeout(() => {
      toast.dismiss(toastId); // Tắt thông báo sau 2 giây
    }, 2000);
  } finally {
    setLoading(false); // Kết thúc loading
  }
};
