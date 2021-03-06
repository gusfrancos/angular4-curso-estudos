import { Usuario } from "../acesso/usuario.model";
import * as firebaseAuth from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable()
export class Autenticacao {

    public token_id!: string;

    constructor(private router: Router) {}

    public async autenticar(email: string, senha: string): Promise<void> {
        var auth = firebaseAuth.getAuth();
        console.log(email)
        await firebaseAuth.signInWithEmailAndPassword(auth, email, senha)
        .then((resposta: any) => {
            auth.currentUser?.getIdToken()
                .then((idToken) => {
                    this.token_id = idToken
                    localStorage.setItem('idToken', idToken)
                    this.router.navigate(['/home'])
                })
        })
        .catch((error: Error) => console.log(error + "  " + this.VerifyErroCode(error.name)))
        
    }

    public sair() : void {
        firebaseAuth.getAuth().signOut().then(() => {
            localStorage.removeItem('idToken');
            this.router.navigate(['/'])
        });
        
    }

    public autenticado() : boolean {
       /* if (this.token_id === undefined) {
            this.router.navigate(['/'])
        }*/
        return localStorage.getItem('idToken') !== null;
    }

    public cadastrarUsuario(usuario: Usuario): Promise<any> {

        var firebaseDB = getDatabase();
        var auth = firebaseAuth.getAuth();
               
        return firebaseAuth.createUserWithEmailAndPassword(firebaseAuth.getAuth(), usuario.email, usuario.senha)
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


    VerifyErroCode(errorCode: string): string {
        // fonte: https://firebase.google.com/docs/reference/js/firebase.auth.Auth
        // fonte: https://firebase.google.com/docs/auth/admin/errors?hl=pt-br
        switch (errorCode) {
            case 'auth/app-deleted':
                return 'O banco de dados n??o foi localizado.';
            case 'auth/expired-action-code':
                return 'O c??digo da a????o o ou link expirou.';
            case 'auth/invalid-action-code':
                return 'O c??digo da a????o ?? inv??lido. Isso pode acontecer se o c??digo estiver malformado ou j?? tiver sido usado.';
            case 'auth/user-disabled':
                return 'O usu??rio correspondente ?? credencial fornecida foi desativado.';
            case 'auth/user-not-found':
                return 'O usu??rio n??o correponde ?? nenhuma credencial.';
            case 'auth/weak-password':
                return 'A senha ?? muito fraca.';
            case 'auth/email-already-in-use':
                return 'J?? existi uma conta com o endere??o de email fornecido.';
            case 'auth/invalid-email':
                return 'O endere??o de e-mail n??o ?? v??lido.';
            case 'auth/operation-not-allowed':
                return 'O tipo de conta correspondente ?? esta credencial, ainda n??o encontra-se ativada.';
            case 'auth/account-exists-with-different-credential':
                return 'E-mail j?? associado a outra conta.';
            case 'auth/auth-domain-config-required':
                return 'A configura????o para autentica????o n??o foi fornecida.';
            case 'auth/credential-already-in-use':
                return 'J?? existe uma conta para esta credencial.';
            case 'auth/operation-not-supported-in-this-environment':
                return 'Esta opera????o n??o ?? suportada no ambiente que est?? sendo executada. Verifique se deve ser http ou https.';
            case 'auth/timeout':
                return 'Excedido o tempo de resposta. O dom??nio pode n??o estar autorizado para realizar opera????es.';
            case 'auth/missing-android-pkg-name':
                return 'Deve ser fornecido um nome de pacote para instala????o do aplicativo Android.';
            case 'auth/missing-continue-uri':
                return 'A pr??xima URL deve ser fornecida na solicita????o.';
            case 'auth/missing-ios-bundle-id':
                return 'Deve ser fornecido um nome de pacote para instala????o do aplicativo iOS.';
            case 'auth/invalid-continue-uri':
                return 'A pr??xima URL fornecida na solicita????o ?? inv??lida.';
            case 'auth/unauthorized-continue-uri':
                return 'O dom??nio da pr??xima URL n??o est?? na lista de autoriza????es.';
            case 'auth/invalid-dynamic-link-domain':
                return 'O dom??nio de link din??mico fornecido, n??o est?? autorizado ou configurado no projeto atual.';
            case 'auth/argument-error':
                return 'Verifique a configura????o de link para o aplicativo.';
            case 'auth/invalid-persistence-type':
                return 'O tipo especificado para a persist??ncia dos dados ?? inv??lido.';
            case 'auth/unsupported-persistence-type':
                return 'O ambiente atual n??o suportar o tipo especificado para persist??ncia dos dados.';
            case 'auth/invalid-credential':
                return 'A credencial expirou ou est?? mal formada.';
            case 'auth/wrong-password':
                return 'Senha incorreta.';
            case 'auth/invalid-verification-code':
                return 'O c??digo de verifica????o da credencial n??o ?? v??lido.';
            case 'auth/invalid-verification-id':
                return 'O ID de verifica????o da credencial n??o ?? v??lido.';
            case 'auth/custom-token-mismatch':
                return 'O token est?? diferente do padr??o solicitado.';
            case 'auth/invalid-custom-token':
                return 'O token fornecido n??o ?? v??lido.';
            case 'auth/captcha-check-failed':
                return 'O token de resposta do reCAPTCHA n??o ?? v??lido, expirou ou o dom??nio n??o ?? permitido.';
            case 'auth/invalid-phone-number':
                return 'O n??mero de telefone est?? em um formato inv??lido (padr??o E.164).';
            case 'auth/missing-phone-number':
                return 'O n??mero de telefone ?? requerido.';
            case 'auth/quota-exceeded':
                return 'A cota de SMS foi excedida.';
            case 'auth/cancelled-popup-request':
                return 'Somente uma solicita????o de janela pop-up ?? permitida de uma s?? vez.';
            case 'auth/popup-blocked':
                return 'A janela pop-up foi bloqueado pelo navegador.';
            case 'auth/popup-closed-by-user':
                return 'A janela pop-up foi fechada pelo usu??rio sem concluir o login no provedor.';
            case 'auth/unauthorized-domain':
                return 'O dom??nio do aplicativo n??o est?? autorizado para realizar opera????es.';
            case 'auth/invalid-user-token':
                return 'O usu??rio atual n??o foi identificado.';
            case 'auth/user-token-expired':
                return 'O token do usu??rio atual expirou.';
            case 'auth/null-user':
                return 'O usu??rio atual ?? nulo.';
            case 'auth/app-not-authorized':
                return 'Aplica????o n??o autorizada para autenticar com a chave informada.';
            case 'auth/invalid-api-key':
                return 'A chave da API fornecida ?? inv??lida.';
            case 'auth/network-request-failed':
                return 'Falha de conex??o com a rede.';
            case 'auth/requires-recent-login':
                return 'O ??ltimo hor??rio de acesso do usu??rio n??o atende ao limite de seguran??a.';
            case 'auth/too-many-requests':
                return 'As solicita????es foram bloqueadas devido a atividades incomuns. Tente novamente depois que algum tempo.';
            case 'auth/web-storage-unsupported':
                return 'O navegador n??o suporta armazenamento ou se o usu??rio desativou este recurso.';
            case 'auth/invalid-claims':
                return 'Os atributos de cadastro personalizado s??o inv??lidos.';
            case 'auth/claims-too-large':
                return 'O tamanho da requisi????o excede o tamanho m??ximo permitido de 1 Megabyte.';
            case 'auth/id-token-expired':
                return 'O token informado expirou.';
            case 'auth/id-token-revoked':
                return 'O token informado perdeu a validade.';
            case 'auth/invalid-argument':
                return 'Um argumento inv??lido foi fornecido a um m??todo.';
            case 'auth/invalid-creation-time':
                return 'O hor??rio da cria????o precisa ser uma data UTC v??lida.';
            case 'auth/invalid-disabled-field':
                return 'A propriedade para usu??rio desabilitado ?? inv??lida.';
            case 'auth/invalid-display-name':
                return 'O nome do usu??rio ?? inv??lido.';
            case 'auth/invalid-email-verified':
                return 'O e-mail ?? inv??lido.';
            case 'auth/invalid-hash-algorithm':
                return 'O algoritmo de HASH n??o ?? uma criptografia compat??vel.';
            case 'auth/invalid-hash-block-size':
                return 'O tamanho do bloco de HASH n??o ?? v??lido.';
            case 'auth/invalid-hash-derived-key-length':
                return 'O tamanho da chave derivada do HASH n??o ?? v??lido.';
            case 'auth/invalid-hash-key':
                return 'A chave de HASH precisa ter um buffer de byte v??lido.';
            case 'auth/invalid-hash-memory-cost':
                return 'O custo da mem??ria HASH n??o ?? v??lido.';
            case 'auth/invalid-hash-parallelization':
                return 'O carregamento em paralelo do HASH n??o ?? v??lido.';
            case 'auth/invalid-hash-rounds':
                return 'O arredondamento de HASH n??o ?? v??lido.';
            case 'auth/invalid-hash-salt-separator':
                return 'O campo do separador de SALT do algoritmo de gera????o de HASH precisa ser um buffer de byte v??lido.';
            case 'auth/invalid-id-token':
                return 'O c??digo do token informado n??o ?? v??lido.';
            case 'auth/invalid-last-sign-in-time':
                return 'O ??ltimo hor??rio de login precisa ser uma data UTC v??lida.';
            case 'auth/invalid-page-token':
                return 'A pr??xima URL fornecida na solicita????o ?? inv??lida.';
            case 'auth/invalid-password':
                return 'A senha ?? inv??lida, precisa ter pelo menos 6 caracteres.';
            case 'auth/invalid-password-hash':
                return 'O HASH da senha n??o ?? v??lida.';
            case 'auth/invalid-password-salt':
                return 'O SALT da senha n??o ?? v??lido.';
            case 'auth/invalid-photo-url':
                return 'A URL da foto de usu??rio ?? inv??lido.';
            case 'auth/invalid-provider-id':
                return 'O identificador de provedor n??o ?? compat??vel.';
            case 'auth/invalid-session-cookie-duration':
                return 'A dura????o do COOKIE da sess??o precisa ser um n??mero v??lido em milissegundos, entre 5 minutos e 2 semanas.';
            case 'auth/invalid-uid':
                return 'O identificador fornecido deve ter no m??ximo 128 caracteres.';
            case 'auth/invalid-user-import':
                return 'O registro do usu??rio a ser importado n??o ?? v??lido.';
            case 'auth/invalid-provider-data':
                return 'O provedor de dados n??o ?? v??lido.';
            case 'auth/maximum-user-count-exceeded':
                return 'O n??mero m??ximo permitido de usu??rios a serem importados foi excedido.';
            case 'auth/missing-hash-algorithm':
                return '?? necess??rio fornecer o algoritmo de gera????o de HASH e seus par??metros para importar usu??rios.';
            case 'auth/missing-uid':
                return 'Um identificador ?? necess??rio para a opera????o atual.';
            case 'auth/reserved-claims':
                return 'Uma ou mais propriedades personalizadas fornecidas usaram palavras reservadas.';
            case 'auth/session-cookie-revoked':
                return 'O COOKIE da sess??o perdeu a validade.';
            case 'auth/uid-alread-exists':
                return 'O indentificador fornecido j?? est?? em uso.';
            case 'auth/email-already-exists':
                return 'O e-mail fornecido j?? est?? em uso.';
            case 'auth/phone-number-already-exists':
                return 'O telefone fornecido j?? est?? em uso.';
            case 'auth/project-not-found':
                return 'Nenhum projeto foi encontrado.';
            case 'auth/insufficient-permission':
                return 'A credencial utilizada n??o tem permiss??o para acessar o recurso solicitado.';
            case 'auth/internal-error':
                return 'O servidor de autentica????o encontrou um erro inesperado ao tentar processar a solicita????o.';
            default:
                return "";
        }
    }


}