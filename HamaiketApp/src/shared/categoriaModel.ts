export class CategoriaModel{
    constructor(public key:String,public nombre: String, public imagen:String, public collections:Array<String>){}
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.nombre){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new CategoriaModel(data.key,data.nombre,data.imagen, data.collections);
    }

    static fromFB(categoria:any) {
        if(!categoria.payload.doc.data().nombre) {
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new CategoriaModel(categoria.payload.doc._key.path.get(1),
        categoria.payload.doc.data().nombre.toString(),
        categoria.payload.doc.data().imagen,
        categoria.payload.doc.data().collections);
    }
}