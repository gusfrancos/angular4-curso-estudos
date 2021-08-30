import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from './shared/oferta.model'

class CarrinhoService {
    public itens: ItemCarrinho[] = []


public exibirItens() : ItemCarrinho[] {
    return this.itens
}

public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
    //verificar se o item em questão jáa não existe no array
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id) 

    //o push inclui uma instancia de itemcarrinho dentro do array
    if(itemCarrinhoEncontrado) {
        itemCarrinhoEncontrado.quantidade += 1
    }
    console.log('Adicionei a quantidade para:', itemCarrinho)
}


public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {
    //verificar se o item em questão jáa não existe no array
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id) 

    //o push inclui uma instancia de itemcarrinho dentro do array
    if(itemCarrinhoEncontrado) {
        itemCarrinhoEncontrado.quantidade -= 1

        if(itemCarrinhoEncontrado.quantidade === 0) {
            this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado),1)    
        }
    }
    console.log('Diminui quantidade para:', itemCarrinho)
}

public limparCarrinho(): void {
    this.itens = [];
}



public incluirItem(oferta: Oferta) {

    console.log("Oferta:" + oferta);
    let itemCarrinho: ItemCarrinho = new ItemCarrinho(
        oferta.id,
        oferta.imagens[0],
        oferta.titulo,
        oferta.descricao_oferta,
        oferta.valor,
        1
    )

    //verificar se o item em questão jáa não existe no array
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id) 

    //o push inclui uma instancia de itemcarrinho dentro do array
    if(itemCarrinhoEncontrado === undefined) {
        this.itens.push(itemCarrinho)
    } else {
        itemCarrinhoEncontrado.quantidade += 1
    }
    
    console.log('item Carrinho:', itemCarrinho)


}


public totalCarrinhoCompras(): number {
    
    let total: number = 0

    this.itens.map((item: ItemCarrinho) => {
        total =+ (item.valor * item.quantidade)
    })
      
    return total
}


}

export { CarrinhoService }