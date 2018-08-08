export class TipoModel{
    constructor(public id: string, public descripcion:string){
        
    }
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.id){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new TipoModel(data.id,data.descripcion);
    }
}