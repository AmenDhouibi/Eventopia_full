import { IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength, IsOptional } from 'class-validator';


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
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    age: number;

    @IsOptional()
    @IsString()
    photo: string;

    @IsOptional()
    @IsString()
    institution :string;

    @IsOptional()
    @IsString()
    profession :string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    phonenumber : string ;

    
    
}