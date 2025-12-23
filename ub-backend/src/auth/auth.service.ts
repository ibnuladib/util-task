import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from './constants';


@Injectable()
export class AuthService {
    constructor(
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService,
    ) {}

    async login(username: string, pin: string): Promise<{ access_token: string }> {

        const admin = await this.adminService.validateAdmin(username, pin);

        if (!admin) {
        throw new UnauthorizedException('No Admin Found');
        }

        const payload = { sub: admin.id, username: admin.username };

            return {
                access_token: await this.jwtService.signAsync(payload, {
                    secret: jwtConstants.secret,
                    expiresIn: jwtConstants.expiresIn,
                }),
                };
            }
}
