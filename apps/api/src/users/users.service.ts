import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { MESSAGES } from "../core/constants";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(MESSAGES.notFound.user);

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.queryOneByEmail(email);
    if (!user) throw new NotFoundException(MESSAGES.notFound.user);

    return user;
  }

  queryOneByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);
    if (!user) throw new NotFoundException(MESSAGES.notFound.user);

    return user;
  }

  remove(id: string) {
    return this.userModel.findByIdAndRemove(id).exec();
  }
}
