import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // Initialize Firebase
    var app = firebase.initializeApp(firebaseConfig);
    var appStore = getFirestore(app);
     getAnalytics(app);
    

  }
  title = 'app-insta-clone';
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkr0azI4pCrNThjTBKDKMAejr0rNTXn7w",
  authDomain: "jta-instagran-clone-b5198.firebaseapp.com",
  projectId: "jta-instagran-clone-b5198",
  storageBucket: "jta-instagran-clone-b5198.appspot.com",
  messagingSenderId: "902386989205",
  appId: "1:902386989205:web:d1d3f8984318e294e8039c",
  measurementId: "G-8TCYD9KFMP"
};
