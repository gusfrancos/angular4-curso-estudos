import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model';
import '../util/rxjs-extensions'


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})

export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  //public ofertas2: Oferta[]
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private OfertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap((termo: string) => {

        if(termo.trim() === ''){
          return Observable.of<Oferta[]>([])
        }

        return this.OfertasService.pesquisaOfertas(termo)
      })
      .catch((err: any) => {
        console.log(err)
        return Observable.of<Oferta[]>([])
      })

   /*  this.ofertas.subscribe((ofertas: Oferta[]) => {
      this.ofertas2 = ofertas
    }); */
  }

  // public pesquisa(event: Event): void {
  //  console.log((<HTMLInputElement>event.target).value)
  //}

  /* public pesquisa(termoDaBusca: string): void {
    this.ofertas = this.OfertasService.pesquisaOfertas(termoDaBusca)
    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas)
      ,(erro: any) => console.log('Erro status: ', erro.status)
    )
  } */

public pesquisa(termoDaBusca: string): void {
  this.subjectPesquisa.next(termoDaBusca);    
}

public limpaPesquisa(): void {
  this.subjectPesquisa.next('')
}

}
