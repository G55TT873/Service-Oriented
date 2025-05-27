import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, email, password } = createUserDto;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hashedPassword = await bcrypt.hash(password, 10);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = new this.userModel({ name, email, password: hashedPassword });
    return user.save();
  }

  async login(loginDto: LoginDto) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { token };
  }

  async getUser(id: string) {
    return this.userModel.findById(id);
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    return this.userModel.findByIdAndUpdate(id, updateRoleDto, { new: true });
  }
}
