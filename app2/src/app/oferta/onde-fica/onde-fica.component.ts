import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [ OfertasService ]
})
export class OndeFicaComponent implements OnInit {

  public retorno: any

  constructor(private route: ActivatedRoute, private OfertasService: OfertasService) { }

  ngOnInit(): void {
    this.OfertasService.getOndeFicaOfertaPorId(this.route.parent.snapshot.params['id'])
    .then(( retorno: any ) => {
        this.retorno = retorno
    }).catch((param: any) => (console.log(param)))
  }

}
