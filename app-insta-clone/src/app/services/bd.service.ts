import * as firebaseAuth from "firebase/auth";
import { getDatabase, push, ref } from "firebase/database";
import * as firebase from "firebase/app";
import * as firestorage from 'firebase/storage'

export class Bd {
   
    public publicar(publicacao: any): void {
        // Initialize Firebase
        var app = firebase.initializeApp(firebaseConfig);
        var firebaseDB = getDatabase();
        var auth = firebaseAuth.getAuth();
        var storage = firestorage.getStorage()
        var storageRef =  firestorage.ref(storage,`imagens/$nomeImagem`)
     


        
        /*
        push(ref(firebaseDB,'publicacoes/' + auth.currentUser?.uid ), {
            email: publicacao.email,
            titulo: publicacao.titulo
          }).catch ((error) => {
            console.log(error.message);
        }) 
        
        */

    }
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