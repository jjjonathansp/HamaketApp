export class LoginModel{
    constructor(public email: String,public password: String){}
    
    static fromJSON(data: any){
        //console.log(data.picture);
        if(!data.email){
            throw(new Error("Estructura de JSON incorrecta"));
        }
        return new LoginModel(data.email,data.password);
    }
}