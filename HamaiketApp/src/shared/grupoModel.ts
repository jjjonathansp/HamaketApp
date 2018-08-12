export class GrupoModel{
    constructor(public key:String,public nombre: String,public saldo: number, public clave:string){}
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.nombre){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new GrupoModel(data.key,data.nombre,data.saldo,data.clave);
    }
}