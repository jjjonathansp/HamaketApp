export class RelaPedidoUsuElementoModel{
    constructor(public key:String,public usuario: String,public pedido:String,public elemento: String){}
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.grupo){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new RelaPedidoUsuElementoModel(data.key,data.usuario,data.pedido,data.elemento);
    }
}