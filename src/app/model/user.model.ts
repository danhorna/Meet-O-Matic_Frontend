import { Userevent } from '../openapi';

export class UserModel implements Userevent {
    
    name: string;
    email: string;
    id?: string;

    constructor(){

    }

    setName(n){
        this.name = n;
    }
    setEmail(e){
        this.email = e;
    }

    setId(i){
        this.id = i;
    }
}