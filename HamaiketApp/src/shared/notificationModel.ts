export class NotificationModel{
    constructor(public id: string, public message:string){
        
    }
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.id){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new NotificationModel(data.id,data.message);
    }
}