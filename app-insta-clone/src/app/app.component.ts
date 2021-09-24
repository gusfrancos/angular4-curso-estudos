import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // Initialize Firebase
    initializeApp(firebaseConfig);
    

  }
  title = 'app-insta-clone';
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1udT0RAcoClwrMvvq3fSjk-3MJSPLp0U",
  authDomain: "jta-instagram-clone-150c8.firebaseapp.com",
  projectId: "jta-instagram-clone-150c8",
  storageBucket: "jta-instagram-clone-150c8.appspot.com",
  messagingSenderId: "1011760642593",
  appId: "1:1011760642593:web:a52d590a788d7eb6070160",
  measurementId: "G-MSSB367B4P"
};
