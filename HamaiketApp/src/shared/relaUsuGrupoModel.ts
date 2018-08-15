export class RelaUsuGrupoModel{
    constructor(public key:String,public grupo: String,public usuario:String, public admin:boolean){}
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.nombreUsuario){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new RelaUsuGrupoModel(data.key,data.grupo,data.usuario, data.admin);
    }
    static fromFB(rela:any) {
        if(!rela.payload.doc.data().grupo) {
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new RelaUsuGrupoModel(rela.payload.doc._key.path.get(3),
        rela.payload.doc.data().grupo.toString(),
        rela.payload.doc.data().usuario,
        rela.payload.doc.data().admin);
    }
}