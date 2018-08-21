export class UsuarioModel{
    
    constructor(public key:String, public nombreUsuario: String,public saldo: number, public imagen:String, public email:String,public admin:boolean){}
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.nombreUsuario){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new UsuarioModel(data.key,data.nombreUsuario,data.saldo, data.imagen,data.email,false);
    }
    static fromFB(usuario:any) {
        if(usuario[0].payload.doc.data().nombreUsuario==undefined || usuario[0].payload.doc.data().nombreUsuario==null || usuario[0].payload.doc.data().nombreUsuario=="") {
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new UsuarioModel(usuario[0].payload.doc._key.path.get(1),
        usuario[0].payload.doc.data().nombreUsuario.toString(),
        usuario[0].payload.doc.data().saldo,
        usuario[0].payload.doc.data().imagen.toString(),
        usuario[0].payload.doc.data().email.toString(),false);
    }

    static fromFBFull(usuario:any) {
        if(usuario.payload.doc.data().nombreUsuario==undefined || usuario.payload.doc.data().nombreUsuario==null || usuario.payload.doc.data().nombreUsuario=="") {
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new UsuarioModel(usuario.payload.doc._key.path.get(1),
        usuario.payload.doc.data().nombreUsuario.toString(),
        usuario.payload.doc.data().saldo,
        usuario.payload.doc.data().imagen.toString(),
        usuario.payload.doc.data().email.toString(),
        false);
    }
}