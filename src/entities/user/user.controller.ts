import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, Res, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Request, Response } from 'express'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/UpdateUser.dto'
import { CreateUserDto } from '@entities/user/dto/CreateUser.dto'


@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Get('/')
  async getAllUsers(
    @Res() res: Response,
  ) {
    const allUsers = await this.userService.getAllUsers()

    return res.send({
      status: 'ok',
      data: allUsers,
    })
  }

  @Get('/:id')
  async getUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const user = await this.userService.getUserById(id)

    return res.send({
      status: 'ok',
      data: user,
    })
  }

  @Post('/')
  @UseInterceptors(FileInterceptor(''))
  async createUser(
    @Body() body: CreateUserDto,
    @Res() res: Response,
  ) {
    await this.userService.createUser(body)
    return res.send({ status: 'ok' })
  }

  @Put('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
    @Res() res: Response,
  ) {
    await this.userService.updateUser(id, body)
    return res.send({ status: 'ok' })
  }

  // @Patch('/:id')
  // async partialUpdateUser(
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ) {}

  @Delete('/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    await this.userService.deleteUser(id)
    return res.send({ status: 'ok' })
  }
}
