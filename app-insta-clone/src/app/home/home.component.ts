import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";
import { Autenticacao } from '../services/autenticacao.service';
import { Bd } from '../services/bd.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms'
import * as firebaseAuth from "firebase/auth";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public  email: string | undefined;
  public imagem: any



  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  closeResult: string | undefined;

   constructor(private autenticacao: Autenticacao, private modalService: NgbModal, private bd: Bd) {}

  ngOnInit(): void {
    firebaseAuth.getAuth().onAuthStateChanged((user) => {
      
      this.email = user?.email === null ? '' : user?.email;
    })
  }

  public sair() : void {
    this.autenticacao.sair();
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  public publicar(): void {
    console.log('Publicando post...')
    console.log(this.imagem[0])

    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })
  }

  public preparaImagemUpload(event: Event): void {
    console.log('preparando imagem....')
    console.log((<HTMLInputElement>event.target).files)
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
