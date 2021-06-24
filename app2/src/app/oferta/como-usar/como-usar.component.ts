import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../../ofertas.service'

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [ OfertasService ]
})
export class ComoUsarComponent implements OnInit {

  public retorno: any

  constructor(private route: ActivatedRoute, private OfertasService: OfertasService) { }

  ngOnInit(): void {
    this.OfertasService.getComoUsarOfertaPorId(this.route.parent.snapshot.params['id'])
    .then(( retorno: any ) => {
        this.retorno = retorno
    }).catch((param: any) => (console.log(param)))

  }

}
