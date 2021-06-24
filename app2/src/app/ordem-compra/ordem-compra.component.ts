import { Component, OnInit } from '@angular/core';
import { isNumeric } from 'rxjs/internal-compatibility';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number


  //pedido
  public pedido: Pedido = new Pedido('','','','');
  
  public endereco: string = ''
  public numero: string = ''
  public complemento: string = ''
  public formaPagamento: string = ''


  //controles de validação dos campos
  public enderecoValido: boolean
  public numeroValido: boolean
  public complementoValido: boolean
  public formaPagamentoValido: boolean

  //estado primitivo dos campos (pristine)
  public enderecoEstadoPrimitivo: boolean = true
  public numeroEstadoPrimitivo: boolean = true
  public complementoEstadoPrimitivo: boolean = true
  public formaPagamentoEstadoPrimitivo: boolean = true


  //Controlar botão confirmar compra
  public formEstado: string = 'disabled'

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit(): void {
    
  }

  public atualizaEndereco(endereco: string): void {
    this.endereco = endereco
    this.enderecoEstadoPrimitivo = false
    //se a string for maior que 3
    if(this.endereco.length > 3) {
      this.enderecoValido = true
    } else {
      this.enderecoValido = false
    }

    this.habilitarForm();
  }

  public atualizaComplemento(complemento: string): void {
    this.complemento = complemento
    this.complementoEstadoPrimitivo = false

    if(this.complemento.length > 0) {
      this.complementoValido = true
    }
  }

  public atualizaNumero(numero: string): void {
    this.numero = numero
    this.numeroEstadoPrimitivo = false

    if(this.numero.length >= 1 && isNumeric(numero)) {
      this.numeroValido = true
    } else {
      this.numero ='';
      this.numeroValido = false
    }

    this.habilitarForm();
  }
 
  public atualizaFormaPagamento(formaPagamento: string): void {
    console.log(formaPagamento)
    this.formaPagamento = formaPagamento
    this.formaPagamentoEstadoPrimitivo = false
    
    if(this.formaPagamento.length >= 1) {
      this.formaPagamentoValido = true
    } else {
      this.formaPagamentoValido = false
    }

    this.habilitarForm();
  }

  public confirmaCompra(): void {
    this.pedido.endereco = this.endereco;
    this.pedido.complemento = this.complemento;
    this.pedido.numero = this.numero;
    this.pedido.formaPagamento = this.formaPagamento;

    console.log(this.pedido)
    this.ordemCompraService.efetivarComprar(this.pedido)
    .subscribe((resposta: any) => {
      this.idPedidoCompra = resposta.id
    });
  }

  public habilitarForm(): void {
    if (this.enderecoValido === true &&  this.numeroValido === true && this.formaPagamentoValido === true){
     this.formEstado = '' 
    } else {
      this.formEstado = 'disabled'
    }
  }

}
