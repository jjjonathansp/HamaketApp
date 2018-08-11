export class RelaUsuGrupoModel{
    constructor(public grupo: string,public usuario:string, public admin:boolean){}
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.nombreUsuario){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new RelaUsuGrupoModel(data.nombreUsuario,data.saldo, data.admin);
    }
}