export class UsuarioModel{
    constructor(public nombre: String, public imagen:String){}
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.nombreUsuario){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new UsuarioModel(data.nombreUsuario,data.saldo);
    }
}