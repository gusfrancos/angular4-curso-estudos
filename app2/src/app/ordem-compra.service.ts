import { Injectable } from '@angular/core'
import { Pedido } from './shared/pedido.model'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { URL_API } from './app.api'
import { Observable } from 'rxjs';
import { RequestOptions } from '@angular/http';



@Injectable()
export class OrdemCompraService {

    constructor(private http: HttpClient) {}

    public efetivarComprar(pedido: Pedido): Observable<any>{
        /*let headers = new Headers();
         headers.set('Content-type', 'application/json;')
         */

         const headers = {'Content-type': 'application/json'}
         const body = JSON.stringify(pedido)
         //console.log("CorpoHtml:" + body)
         return this.http.post(`${URL_API}/pedidos`, body, {'headers': headers});
           


        /*return this.http.post(
            `${URL_API}/pedidos`, 
            JSON.stringify(pedido),
            )
            .map((resposta: Response) => console.log(resposta) )*/
            
    }
}