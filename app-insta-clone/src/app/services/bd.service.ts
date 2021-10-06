import * as firebaseAuth from "firebase/auth";
import { getDatabase, push, ref } from "firebase/database";
import { getStorage } from "firebase/storage"
import * as firebase from "firebase/app";

export class Bd {
    public publicar(publicacao: any): void {
        var firebaseDB = getDatabase();
        var auth = firebaseAuth.getAuth();
        var storage = getStorage()
        

        

        
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