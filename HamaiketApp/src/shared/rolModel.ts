export class RolModel{
    constructor(public id: string, public rol:string, public descripcion:string){
        
    }
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.id){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new RolModel(data.id, data.rol, data.descripcion);
    }
}