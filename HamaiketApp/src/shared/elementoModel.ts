export class ElementoModel{
    constructor(public key:String,public nombre: String){}
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.nombre){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new ElementoModel(data.key,data.descripcion);
    }

    static fromFB(elemento:any) {
        if(!elemento.payload.doc.data().nombre) {
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new ElementoModel(elemento.payload.doc._key.path.get(1),
        elemento.payload.doc.data().nombre.toString());
    }
}