import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { genSalt, hash } from 'bcrypt'

import { User } from '@entities/user/user.entity'
import { UpdateUserDto } from '@entities/user/dto/UpdateUser.dto'


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
  }

  availableFields = [
    'email',
    'nameFirst',
    'nameLast',
    'birthDate',
    'gender',
  ]

  // Filter user fields
  private filterFields(body: { [k: string]: any }) {
    const filteredFields: { [k: string]: any } = {}

    Object.keys(body).forEach(field => {
      if (this.availableFields.includes(field)) {
        filteredFields[field] = body[field]
      }
    })

    return filteredFields
  }

  // Register new user
  public async createUser(userData: any) {
    const salt = await genSalt(10)

    const hashedPassword = await hash(userData.password, salt)

    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    })
    return await this.userRepository.save(newUser)
  }

  // Get user data by id
  public async getUserById(id: number) {
    return await this.userRepository.findOneBy({ id })
  }

  // Get all users
  public async getAllUsers() {
    return await this.userRepository.find({ order: { id: 'ASC' } })
  }

  // Update user
  public async updateUser(id: number, body: UpdateUserDto) {
    const fields = this.filterFields(body)

    return await this.userRepository.update({ id }, fields)
  }

  // Delete user
  public async deleteUser(id: number) {
    return await this.userRepository.delete({ id })
  }
}