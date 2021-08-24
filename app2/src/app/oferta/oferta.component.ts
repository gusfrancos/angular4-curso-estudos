import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'
import { CarrinhoService } from '../carrinho.service'
import 'rxjs/Rx'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta

  constructor(private route: ActivatedRoute, 
    private OfertasService: OfertasService, 
    private carrinhoService: CarrinhoService) { }

  ngOnDestroy(): void {
   
  }


public adicionarItemCarrinho(): void {
  //console.log(this.oferta[0])
  //console.log("oferta:Component:adicionarItemCarrinho:" + this.oferta[0].id)
  this.carrinhoService.incluirItem(this.oferta[0]);
  
  console.log(this.carrinhoService.exibirItens());
}




  ngOnInit(): void {
    
    this.OfertasService.getOfertasPorId(this.route.snapshot.params['id'])
    .then(( oferta: Oferta ) => {
        this.oferta = oferta
    }).catch((param: any) => (console.log(param)))

    //console.log("oferta:Component:ngOnInit:" + this.oferta.id + " / " + this.oferta.titulo + " / " )

    //console.log('Oferta - Array de itens do carrinho:' + this.carrinhoService.exibirItens())

    /* 
    ///
    ngOnInit(): void {

      this.route.params.subscribe((parametros: Params ) => {
        this.OfertasService.getOfertasPorId(this.route.snapshot.params[parametros.id])
        .then(( oferta: Oferta ) => {
            this.oferta = oferta
        }).catch((param: any) => (console.log(param)))
  
      }) */

        
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
