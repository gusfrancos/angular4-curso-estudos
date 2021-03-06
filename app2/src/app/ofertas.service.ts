import { Injectable } from '@angular/core';
import { Oferta } from './shared/oferta.model'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { URL_API } from './app.api'
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'






@Injectable()
export class OfertasService {


    constructor(private http: HttpClient) { }

    public getOfertas(): Promise<Oferta[]> {
      return this.http.get<Oferta[]>(`${URL_API}/ofertas`)
      .toPromise()
        
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
      return this.http.get<Oferta[]>(`${URL_API}/ofertas?categoria=${categoria}`)
      .toPromise()
    }


    public getOfertasPorId(id: number): Promise<Oferta> {
      return this.http.get<Oferta>(`${URL_API}/ofertas?id=${id}`)
      .toPromise()
    }

    public getComoUsarOfertaPorId(id: number): Promise<String> {
      return this.http.get<String>(`${URL_API}/como-usar?id=${id}`)
      .toPromise()

    }

    public getOndeFicaOfertaPorId(id: number): Promise<String> {
      return this.http.get<String>(`${URL_API}/onde-fica?id=${id}`)
      .toPromise()

    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
      return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
      .retry(10)
      .map((resposta: any) => resposta)
      
    }

 
/*    public ofertas: Array<Oferta> = [
      {
          id: 1,
          categoria: "restaurante",
          titulo: "Super Burger",
          descricao_oferta: "Rodízio de Mini-hambúrger com opção de entrada.",
          anunciante: "Original Burger",
          valor: 29.90,
          destaque: true,
          imagens: [
              { url: "/assets/ofertas/1/img1.jpg" },
              { url: "/assets/ofertas/1/img2.jpg" },
              { url: "/assets/ofertas/1/img3.jpg" },
              { url: "/assets/ofertas/1/img4.jpg" }
          ]
      },
      {
          id: 2,
          categoria: "restaurante",
          titulo: "Cozinha Mexicana",
          descricao_oferta: "Almoço ou Jantar com Rodízio Mexicano delicioso.",
          anunciante: "Mexicana",
          valor: 32.90,
          destaque: true,
          imagens: [
              { url: "/assets/ofertas/2/img1.jpg" },
              { url: "/assets/ofertas/2/img2.jpg" },
              { url: "/assets/ofertas/2/img3.jpg" },
              { url: "/assets/ofertas/2/img4.jpg" }
          ]

      },
      {
          id: 4,
          categoria: "diversao",
          titulo: "Estância das águas",
          descricao_oferta: "Diversão garantida com piscinas, trilhas e muito mais.",
          anunciante: "Estância das águas",
          valor: 31.90,
          destaque: true,
          imagens: [
              { url: "/assets/ofertas/3/img1.jpg" },
              { url: "/assets/ofertas/3/img2.jpg" },
              { url: "/assets/ofertas/3/img3.jpg" },
              { url: "/assets/ofertas/3/img4.jpg" },
              { url: "/assets/ofertas/3/img5.jpg" },
              { url: "/assets/ofertas/3/img6.jpg" }
          ]
      }
  ]
  public getOfertas(): Array<Oferta> {
      return this.ofertas
  }
}



public getOfertas2(): Promise<Oferta[]> {
    return new Promise((resolve, reject) => {
      let deu_certo = true

      if(deu_certo) {
        setTimeout(() => resolve(this.ofertas ), 3000)
      } else {
        reject({ codigo_erro: 404, mensagem_erro: 'Servidor não encontrado XYZ'})
      }
    })
    .then(( ofertas: Oferta[]) => {
      // pode executar tratativas antes de retornar o resolve
      console.log('Primeiro then')
      return ofertas
    })
    .then(( ofertas: Oferta[]) => {
      console.log('segundo then')
      return new Promise((resolve2, reject2) => {
        setTimeout(() => { resolve2( ofertas )}, 4000)
      })
    })
    .then(( ofertas: Oferta[]) => {
      
      console.log('Terceiro then')
      return ofertas
    });
  } */
}