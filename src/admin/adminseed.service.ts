import { Inject, OnModuleInit } from "@nestjs/common";
import { Admin } from "./admin.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

export class AdminSeedService implements OnModuleInit{
    constructor(
        @InjectRepository(Admin) private adminRepository: Repository<Admin>
    ) {}

    async onModuleInit() {
        const existingAdmin = await this.adminRepository.findOne({ where: { username: 'admin' } });

        if(existingAdmin) {
            return;
        }

        const username = process.env.ADMIN_USERNAME;
        const pin = process.env.ADMIN_PIN;

        if(!username || !pin) {
            return console.log(process.env.ADMIN_USERNAME);
        }
        
        const salt = await bcrypt.genSalt();
        const hashPin = await bcrypt.hash(pin, salt);
        const admin = this.adminRepository.create({
            username,
            pin: hashPin,
        });
        await this.adminRepository.save(admin);
        console.log("default admin created.");
    }
}