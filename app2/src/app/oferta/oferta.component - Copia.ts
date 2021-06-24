import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Observable, Observer, Subscription } from 'rxjs';
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'
import 'rxjs/Rx'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta
  private tempoObservableSubscription: Subscription
  private meuObservable: Subscription

  constructor(private route: ActivatedRoute, private OfertasService: OfertasService) { }

  ngOnDestroy(): void {
    this.tempoObservableSubscription.unsubscribe()
    this.meuObservable.unsubscribe()
  }

  ngOnInit(): void {
    //this.route.snapshot.params['id']
    
    //this.route.params.subscribe((parametro: any) => { 
    //  console.log(parametro);
    //})

    this.OfertasService.getOfertasPorId(this.route.snapshot.params['id'])
    .then(( oferta: Oferta ) => {
        this.oferta = oferta
    }).catch((param: any) => (console.log(param)))

    let tempo = Observable.interval(5000)
    this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => {
      console.log(intervalo)
    })

    //observable (observável)
    let meuObservable =  new Observable(observer => {
        observer.next(1)
        observer.next(2)
        observer.next(3)
        observer.error('Algum erro foi encontrado')
    })

    //observable (observador)
    this.meuObservable = meuObservable.subscribe(
      (resultado: BigInteger) => console.log(resultado)
    )



    
    // /* Ficará observando a alteração do id recebido vindo da url,
    // sem precisar utilizar o snapshot.params['id'] pois nele é 
    // uma foto, e em subscribe ficará observando a mudança, caso
    // ocorra erro, a funcao erro será chamada. E, caso
    // ocorra sucesso, será executada a funcao de sucesso */
    //this.route.params.subscribe(
     //(parametro: any) => { console.log(parametro)},
     //(erro: any) => console.log(erro),
     //() => console.log('Processamento foi classificado como concluído')
     //)
  }




}
