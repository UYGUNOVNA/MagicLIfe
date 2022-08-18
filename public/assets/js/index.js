import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4OCYH6OJWzOktp1TCyO6Z0ZE2bR9ilr0",
  authDomain: "magiclife2-b7152.firebaseapp.com",
  projectId: "magiclife2-b7152",
  storageBucket: "magiclife2-b7152.appspot.com",
  messagingSenderId: "1042269258216",
  appId: "1:1042269258216:web:ac3d02fb7f662525e8245d",
  measurementId: "G-7V3SN6V8WE",
};

initializeApp(firebaseConfig);
const auth = getAuth();
auth.languageCode = "en";

window.recaptchaVerifier = new RecaptchaVerifier(
  "send",
  {
    size: "invisible",
    callback: (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      console.log("Recatcha ishladi");
    },
  },
  auth
);

document.querySelector("#send").addEventListener("click", () => {
  const phoneNumber = document.querySelector("#numberPhone").value;
  const appVerifier = window.recaptchaVerifier;
  const auth = getAuth();
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      console.log("Kod:", confirmationResult);

      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    })
    .catch((error) => {
      // Error; SMS not sent
      console.log("Erporor bo'ldi", error);
      // ...
    });
});

document.querySelector("#verify").addEventListener("click", () => {
  const code = document.querySelector("#verificationCode").value;
  window.confirmationResult
    .confirm(code)
    .then((result) => {
      // User signed in successfully.
      console.log(result);
      alert("Yaxshi codingiz vertifikatsitadan o'tdi");
      // ...
    })
    .catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      alert("Erporor bo'ldi", error);
      console.log("Error:", error);
    });
});
