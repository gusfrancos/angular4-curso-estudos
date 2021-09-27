import { Usuario } from "../acesso/usuario.model";
import * as firebaseAuth from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";


export class Autenticacao {
    public cadastrarUsuario(usuario: Usuario): void {

        console.log('User: ' + usuario.email);
        console.log('Senha: ' + usuario.senha)
        var firebaseDB = getDatabase();
        var auth = firebaseAuth.getAuth();
        
        firebaseAuth.createUserWithEmailAndPassword(firebaseAuth.getAuth(), usuario.email, usuario.senha)
        .then((userCredential) => { 
           

            set(ref(firebaseDB,'usuario_detalhe/' + auth.currentUser?.uid ), {
                nome_completo: usuario.nome_completo,
                email: usuario.email,
                nome_usuario: usuario.nome_usuario
             })



        })
        .catch ((error) => {
            console.log(error.message);
        }) 
    }
}