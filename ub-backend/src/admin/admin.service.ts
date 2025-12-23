import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "./admin.entity";
import { Pricing } from "src/pricing/pricing.entity";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        @InjectRepository(Pricing) private pricingRepository: Repository<Pricing>,
    ) { }

      async validateAdmin(username: string, pin: string): Promise<Admin> {
        const admin = await this.adminRepository.findOne({
        where: { username },
        });

        if (!admin) {
        throw new UnauthorizedException('Invalid admin credentials');
        }

        const Valid = await bcrypt.compare(pin, admin.pin);

        if (!Valid) {
            throw new UnauthorizedException('Invalid pin credentials');
        }

        return admin;
    }


    async upsertPricingConfig(
            ratePerUnit: number,
            vatPercentage: number,
            serviceCharge: number,
        ): Promise<Pricing> {
            const existingConfig = await this.pricingRepository.findOne({});

            if (!existingConfig) {
            // Create once
            const pricing = this.pricingRepository.create({
                ratePerUnit,
                vatPercentage,
                serviceCharge,
            });
            return this.pricingRepository.save(pricing);
            }

            // Update existing
            existingConfig.ratePerUnit = ratePerUnit;
            existingConfig.vatPercentage = vatPercentage;
            existingConfig.serviceCharge = serviceCharge;

            return this.pricingRepository.save(existingConfig);
    }

    async getPricingConfig(): Promise<Pricing> {
        const config = await this.pricingRepository.findOne({});

        if (!config) {
        throw new NotFoundException('Pricing configuration not set');
        }

        return config;
    }



}
