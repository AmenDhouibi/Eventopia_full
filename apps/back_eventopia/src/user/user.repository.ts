import { Injectable } from "@nestjs/common";
import UserModel, { IUser } from "src/user/user.model";

@Injectable()
export class UserRepository {


    async Getuser(id: string) :Promise<IUser> {
        const user = await UserModel.findOne({ _id: id});
        return user;
    }
    
    async getUserByUsername(username: string): Promise<IUser> {
      const user = await UserModel.findOne({ username });
      return user;
  }

    async deleteUser(email: string): Promise<boolean> {
        try {
          const user = await UserModel.findOne({ email });
  
          if (!user) {
            return false;
          }
    
          // Delete the user
          await UserModel.deleteOne({ email });
          return true;
        } catch (error) {
          console.error('Error deleting user:', error);
          throw error;
        }
      }

}