export class ReGrupoUsuModel{
    constructor(public id: string, public idUsuario:string, public idGrupo:string, public idRol:string){
        
    }
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.id){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new ReGrupoUsuModel(data.id,data.idUsuario, data.idGrupo, data.idRol);
    }
}