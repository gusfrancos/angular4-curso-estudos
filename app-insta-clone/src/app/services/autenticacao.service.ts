import { Usuario } from "../acesso/usuario.model";
import * as firebase from "firebase/app";

export class Autenticacao {
    public cadastrarUsuario(usuario: Usuario): void {
        console.log('Chegamos até o serviço : ', usuario)
    }
}