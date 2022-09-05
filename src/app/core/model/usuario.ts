import { Permissao } from "./permissao";

export class Usuario{

    public username: string;
    public password: string;
    public token: string;
    public permission: string;

    constructor(  username?: string, password?: string, token?: string, permission?: string){

        this.username = <string> username,
        this.password = <string> password,
        this.token = <string> token,
        this.permission =  <string> permission
    }

}