import crypto from "node:crypto";
export class RefreshTokenHasher{
    constructor(
        private readonly secret: string
    ){}
    hash(token:string){
        return crypto.createHmac("sha256", this.secret).update(token).digest("hex");
    }
}