import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
  ApiHeader,
} from '@nestjs/swagger';

import { UserService } from './user.service';

//DTOs
import { UserDto, UserLoginDto, CreateUserDto } from '../../DTO/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // login ************************************
  @ApiOperation({
    summary: ' login  ',
  })
  @ApiOkResponse({
    description: 'user login successful',
    type: UserDto,
  })
  @ApiBody({
    type: UserLoginDto,
    description: 'User Login Dto',
  })
  @ApiNotFoundResponse({ description: 'user not found' })
  @ApiInternalServerErrorResponse({
    description: 'login faild',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: UserLoginDto): Promise<UserDto> {
    try {
      const user = await this.userService.login(loginDto);
      return user;
    } catch (err) {
      throw err;
    }
  }
  // register ************************************
  @ApiOperation({
    summary: ' register  ',
  })
  @ApiOkResponse({
    description: 'register user successful',
    type: UserDto,
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Create User Dto',
  })
  @ApiInternalServerErrorResponse({
    description: 'register user faild',
  })
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const user = await this.userService.register(createUserDto);
      return user;
    } catch (err) {
      throw err;
    }
  }
  // get user ************************************
  @ApiOperation({
    summary: ' get user  ',
  })
  @ApiOkResponse({
    description: 'get user successful',
    type: UserDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'register user faild',
  })
  @ApiHeader({
    name: 'token',
  })
  @Get('')
  @HttpCode(HttpStatus.OK)
  async getUser(@Headers() headers): Promise<UserDto> {
    try {
      const user = await this.userService.getUser(headers?.token);
      return user;
    } catch (err) {
      throw err;
    }
  }
}
