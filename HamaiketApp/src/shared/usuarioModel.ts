export class UsuarioModel{
    constructor(public id: string,public nombre: string,public apellido1: string,public apellido2: string, public mail:string, public password: string, public idGrupo:string){
        
    }
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.id){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new UsuarioModel(data.id,data.nombre,data.apellido1,data.apellido2,data.mail, data.password, data.idGrupo);
    }
}