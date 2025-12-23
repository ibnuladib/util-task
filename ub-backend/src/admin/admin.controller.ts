import { Body, Get, Put, Post, Controller, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("util")
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    
    // @Post('login')
    // async login(
    //     @Body("username") username: string,
    //     @Body("pin") pin: string,
    // ) {
    //     const admin = await this.adminService.validateAdmin(username, pin);
        
    //     return { message: "Login successful", adminId: admin.id };
    // }

    @UseGuards(AuthGuard)
    @Put('updatepricing')
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

    @Get('getpricing')
    async getPricing() {
        const pricing = await this.adminService.getPricingConfig();
        return pricing;
    }

    @Post("calculate")
    async calculateBill(
        @Body("units") units: number,
    )
    {
        const pricing = await this.adminService.getPricingConfig();
        console.log(pricing);

        const ratePerUnit = Number(pricing.ratePerUnit);
        const vatPercentage = Number(pricing.vatPercentage);
        const serviceCharge = Number(pricing.serviceCharge);

        const base = units * ratePerUnit;
        const vatAmount = base * (vatPercentage / 100);
        const totalAmount = base + vatAmount + serviceCharge;

        return {
            units,
            ratePerUnit,
            base,
            vatPercentage,
            vatAmount,
            serviceCharge,
            totalAmount
        };
    }


}