import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";
import { Autenticacao } from '../services/autenticacao.service';
import { Bd } from '../services/bd.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  closeResult: string | undefined;

  constructor(private autenticacao: Autenticacao, private modalService: NgbModal, private bd: Bd) {}

  ngOnInit(): void {
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
    this.bd.publicar()
  }

}
