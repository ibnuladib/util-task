import { Body, Get, Put, Post, Controller, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AuthGuard } from "src/auth/auth.guard";
import { UpdatePricingDto } from "./updatepricing.dto";
import { CalculateBillDto } from "./calculatebill.dto";

@Controller("util")
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    

    @UseGuards(AuthGuard)
    @Put('updatepricing')
    @UsePipes(new ValidationPipe())
    async updatePricing(
        @Body() dto: UpdatePricingDto,
    ) {
        const { ratePerUnit, vatPercentage, serviceCharge } = dto;
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
    @UsePipes(new ValidationPipe())
    async calculateBill(
            // @Body("units") units: number,
            @Body() dto: CalculateBillDto
    )
    {
        const { units } = dto;
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