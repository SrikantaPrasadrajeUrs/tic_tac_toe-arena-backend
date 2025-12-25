import { PasswordHasher } from "../../application/ports/PasswordHasher";
import bcrypt from "bcrypt";

export class ByCryptHasher implements PasswordHasher{
    hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
    
}