export class UsuarioModel{
    constructor(public nombreUsuario: String,public nombre: String,public apellido1: String,public apellido2: String,public password: String){
        
    }
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.nombreUsuario){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new UsuarioModel(data.nombreUsuario,data.nombre,data.apellido1,data.apellido2,data.password);
    }
}