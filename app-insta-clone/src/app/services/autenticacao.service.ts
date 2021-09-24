import { Usuario } from "../acesso/usuario.model";
import * as firebaseAuth from "firebase/auth";

export class Autenticacao {
    public cadastrarUsuario(usuario: Usuario): void {

        console.log('User: ' + usuario.email);
        console.log('Senha: ' + usuario.senha)
        
        firebaseAuth.createUserWithEmailAndPassword(firebaseAuth.getAuth(), usuario.email, usuario.senha)
        .then((userCredential) => { 
            console.log(userCredential.user);
        })
        .catch ((error) => {
            console.log(error.message);
        }) 
    }
}