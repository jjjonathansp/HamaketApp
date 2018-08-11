export class AvatarModel{
    constructor(public imagen: String, public genero:String){}
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.imagen){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new AvatarModel(data.imagen,data.genero);
    }
}