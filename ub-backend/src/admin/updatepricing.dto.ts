import { IsNumber, IsPositive, Max, Min } from "class-validator";


export class UpdatePricingDto {
    @IsNumber()
    @IsPositive()
    @Min(0)
    ratePerUnit: number;

    @IsNumber()
    @IsPositive()
    @Min(0)
    @Max(100)
    vatPercentage: number;

    @IsNumber()
    @IsPositive()
    @Min(0)
    serviceCharge: number;
}