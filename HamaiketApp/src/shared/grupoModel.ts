export class GrupoModel{
    constructor(public id: string, public nombre:string,public bote:number){
        
    }
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.id){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new GrupoModel(data.id,data.nombre, data.bote);
    }
}