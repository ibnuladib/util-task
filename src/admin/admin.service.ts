import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "./admin.entity";
import { Pricing } from "src/pricing/pricing.entity";


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

    if (!admin || admin.pin !== pin) {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    return admin;
  }


  async createPricingConfig(
    ratePerUnit: number,
    vatPercentage: number,
    serviceCharge: number,
  ): Promise<Pricing> {
    // 1. Deactivate existing active config (if any)
    await this.pricingRepository.update(
      { isActive: true },
      { isActive: false },
    );

    // 2. Create new active config
    const pricing = this.pricingRepository.create({
      ratePerUnit,
      vatPercentage,
      serviceCharge,
      isActive: true,
    });

    return this.pricingRepository.save(pricing);
  }

  async getActivePricingConfig(): Promise<Pricing> {
    const config = await this.pricingRepository.findOne({
      where: { isActive: true },
    });

    if (!config) {
      throw new NotFoundException('No active pricing configuration found');
    }

    return config;
  }

}
