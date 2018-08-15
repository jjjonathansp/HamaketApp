export class UsuarioModel{
    
    constructor(public key:String, public nombreUsuario: String,public saldo: number, public imagen:String, public email:String){}
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.nombreUsuario){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new UsuarioModel(data.key,data.nombreUsuario,data.saldo, data.imagen,data.email);
    }
    static fromFB(usuario:any) {
        if(!usuario[0].payload.doc.data().nombreUsuario) {
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new UsuarioModel(usuario[0].payload.doc._key.path.get(3),
        usuario[0].payload.doc.data().nombreUsuario.toString(),
        usuario[0].payload.doc.data().saldo,
        usuario[0].payload.doc.data().imagen.toString(),
        usuario[0].payload.doc.data().email.toString());
    }
}