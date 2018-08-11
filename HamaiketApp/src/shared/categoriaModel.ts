export class CategoriaModel{
    constructor(public nombre: String, public imagen:String){}
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.nombre){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new CategoriaModel(data.nombre,data.imagen);
    }
}