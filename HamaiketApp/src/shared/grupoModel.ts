export class GrupoModel{
    constructor(public key:String,public nombre: String,public saldo: number, public clave:String, public admin:boolean){}
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.nombre){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new GrupoModel(data.key,data.nombre,data.saldo,data.clave, false);
    }

    static fromFB(grupo:any) {
        if(!grupo.payload.doc.data().nombre) {
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new GrupoModel(grupo.payload.doc._key.path.get(3),
        grupo.payload.doc.data().nombre.toString(),
        grupo.payload.doc.data().saldo,
        grupo.payload.doc.data().clave,
        false);
    }
}