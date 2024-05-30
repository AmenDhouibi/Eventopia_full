import { IsNotEmpty, IsNumber, IsString, Matches, MaxLength,MinLength } from "class-validator";


export class CreateUserDto {
    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    readonly password: string;

    @IsNumber()
    @IsNotEmpty()
    readonly age: number;

    @IsString()
    photo: string;

    @IsString()
    institution :string;

    @IsString()
    profession :string;

    @IsNumber()
    @MinLength(8)
    phonenumber : number ;

    
    
}