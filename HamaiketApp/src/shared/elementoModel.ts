export class ElementoModel{
    constructor(public id: string, public nombre:string, public idTipo:string){
        
    }
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.id){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new ElementoModel(data.id,data.nombre,data.idTipo);
    }
}