import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    // async validateUser(profile: any){
    //     const {id, emails, displayName } = profile;
    //     let user = await this.usersService.findOne(emails[0].value);

    //     if (!user) {
    //         user = await this.usersService.create({
    //             email: emails[0].value,
    //             name: displayName,
    //             role: 'renter'
    //         })
    //     }

    //     return {
    //         accessToken: this.jwtService.sign({id: user.id, email: user.email, role: user.role}),
    //         user
    //     };
    // }

    async validateUser(googleUser: CreateUserDto) {
        const user = await this.usersService.findByEmail(googleUser.email);

        if(user) return user;
        return await this.usersService.create(googleUser)
    }

    async login(userOrId: number | User) {

        let user: User;

        if(typeof userOrId === 'number') {
            const userId = userOrId;
            console.log("User data for the login function are: ", userId);

            if(!userId) {
                throw new Error("User ID actually is missing or not found")
            }
    
            const foundUser = await this.usersService.findOne(userId);
            if(!foundUser){
                throw new Error("User not found")
            }
            user = foundUser;
        }else {
            user = userOrId;
        }
      
       
      

        const payload = {id: user.id, email: user.email, role: user.role};
        const accessToken = this.jwtService.sign(payload, {expiresIn: "15m"});
        const refreshToken = this.jwtService.sign(payload, { expiresIn: "7d"});

        await this.usersService.saveRefreshToken(user.id, refreshToken);

        return { accessToken, refreshToken, user}
    }

    async refreshToken(token: string) {
        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.usersService.findOne(decoded.id);

            if (!user) throw new UnauthorizedException("Invalid token");

            return this.login(user);
        } catch (error) {
            throw new UnauthorizedException("Invalid refresh token");
        }
    }
}