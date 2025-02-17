import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(profile: any){
        const {id, emails, displayName } = profile;
        let user = await this.usersService.findOne(emails[0].value);

        if (!user) {
            user = await this.usersService.create({
                email: emails[0].value,
                name: displayName,
                role: 'renter'
            })
        }

        return {
            accessToken: this.jwtService.sign({id: user.id, email: user.email, role: user.role}),
            user
        };
    }
}