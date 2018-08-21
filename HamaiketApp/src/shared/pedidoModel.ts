export class PedidoModel{
    constructor(public key:String,public nombre:String,public grupo: String,public dd:Number, public mm: Number, public yyyy: Number, public activo:boolean){}
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.grupo){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new PedidoModel(data.key,data.nombre,data.grupo,data.dd, data.mm, data.yyyy, data.activo);
    }

    static fromFB(pedido:any) {
        if(!pedido.payload.doc.data().grupo) {
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new PedidoModel(pedido.payload.doc._key.path.get(1),
        pedido.payload.doc.data().nombre.toString(),
        pedido.payload.doc.data().grupo.toString(),
        pedido.payload.doc.data().dd,
        pedido.payload.doc.data().mm,
        pedido.payload.doc.data().yyyy,
        pedido.payload.doc.data().activo);
    }
}