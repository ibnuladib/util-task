import { Body, Get, Put, Post, Controller } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("util")
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    
    @Post('login')
    async login(
        @Body("username") username: string,
        @Body("pin") pin: string,
    ) {
        const admin = await this.adminService.validateAdmin(username, pin);
        
        return { message: "Login successful", adminId: admin.id };
    }


    @Put('pricing')
    async updatePricing(
        @Body("ratePerUnit") ratePerUnit: number,
        @Body("vatPercentage") vatPercentage: number,
        @Body("serviceCharge") serviceCharge: number,
    ) {
        const pricing = await this.adminService.upsertPricingConfig(
            ratePerUnit,
            vatPercentage,
            serviceCharge,
        ); 

        return {
            message: "Pricing configuration updated successfully",
            pricing
        };
    }

    @Get('pricing')
    async getPricing() {
        const pricing = await this.adminService.getPricingConfig();
        return pricing;
    }

    @Post("calculate")
    async calculateBill(
        @Body("units") units: number,
    ) {
        const pricing = await this.adminService.getPricingConfig();
        const base = units * pricing.ratePerUnit;
        const vatAmount = base* (pricing.vatPercentage/ 100);
        const totalAmount = base + vatAmount + pricing.serviceCharge; 
        return {
            units,
            ratePerUnit: pricing.ratePerUnit,
            base,
            vatPercentage: pricing.vatPercentage,
            vatAmount,
            serviceCharge: pricing.serviceCharge,
            totalAmount,
        };
    }

}