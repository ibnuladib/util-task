import { Injectable, OnModuleInit } from "@nestjs/common";
import { Admin } from "./admin.entity";
import { Pricing } from "src/pricing/pricing.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminSeedService implements OnModuleInit {
    constructor(
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        @InjectRepository(Pricing) private pricingRepository: Repository<Pricing>,
    ) {}

    async onModuleInit() {
        const existingAdmin = await this.adminRepository.findOne({ where: { username: 'admin' } });

        if (!existingAdmin) {
            const username = process.env.ADMIN_USERNAME;
            const pin = process.env.ADMIN_PIN;

            if (!username || !pin) {
                console.log("Admin credentials not found in .env");
            } else {
                const salt = await bcrypt.genSalt();
                const hashPin = await bcrypt.hash(pin, salt);
                const admin = this.adminRepository.create({ username, pin: hashPin });
                await this.adminRepository.save(admin);
                console.log("Default admin created.");
            }
        } else {
            console.log("Admin already exists, skipping admin seed.");
        }

        const existingPricing = await this.pricingRepository.findOne({ where: {} });
        if (!existingPricing) {
            const pricing = this.pricingRepository.create({
                ratePerUnit: 0,
                vatPercentage: 0,
                serviceCharge: 0,
            });
            await this.pricingRepository.save(pricing);
            console.log("Default pricing row created.");
        } else {
            console.log("Pricing already exists, skipping pricing seed.");
        }
    }
}
