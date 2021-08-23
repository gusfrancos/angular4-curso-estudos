import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from './shared/oferta.model'

class CarrinhoService {
    public itens: ItemCarrinho[] = []


public exibirItens() : ItemCarrinho[] {
    return this.itens
}

public incluirItem(oferta: Oferta) {

    console.log("Oferta:" + oferta);
    let itemCarrinho: ItemCarrinho = new ItemCarrinho(
        oferta.id,
        oferta.imagens[0],
        oferta.titulo,oferta.descricao_oferta,
        oferta.valor,
        1
    )

    //o push inclui uma instancia de itemcarrinho dentro do array
    this.itens.push(itemCarrinho)
    
    console.log('item Carrinho:', itemCarrinho)


}

}

export { CarrinhoService }