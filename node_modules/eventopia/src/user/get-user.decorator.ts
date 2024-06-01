import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IUser } from "./user.model";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): IUser => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});