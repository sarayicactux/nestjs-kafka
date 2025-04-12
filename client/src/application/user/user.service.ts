import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import Result from '../../interfaces/result.interface';
//DTOs
import {
  UserDto,
  UserLoginDto,
  CreateUserDto,
  userObj,
} from '../../DTO/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('TOKEN_SERVICE') private readonly tokenClient: ClientKafka,
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}
  async onModuleInit() {
    this.userClient.subscribeToResponseOf('login_user');
    this.userClient.subscribeToResponseOf('register_user');
    this.userClient.subscribeToResponseOf('get_user');

    await Promise.all([this.userClient.connect(), this.tokenClient.connect()]);
  }
  // login ***************************************************
  async login(userLoginDto: UserLoginDto): Promise<UserDto> {
    const result: Result = await this.userClient
      .send('login_user', userLoginDto)
      .toPromise();
    if (result.status === 200) {
      return userObj(result.data);
    } else {
      throw new HttpException(
        {
          status: result.status,
          error: result.error,
        },
        result.status,
      );
    }
  }
  // register ***************************************************
  async register(createUserDto: CreateUserDto): Promise<UserDto> {
    const result: Result = await this.userClient
      .send('register_user', createUserDto)
      .toPromise();

    if (result.status === 200) {
      return userObj(result.data);
    } else {
      throw new HttpException(
        {
          status: result.status,
          error: result.error,
        },
        result.status,
      );
    }
  }
  // get user ***************************************************
  async getUser(token: string): Promise<UserDto> {
    if (!token) {
      throw new HttpException(
        {
          status: 403,
          error: 'invalid token',
        },
        403,
      );
    }
    const result: Result = await this.userClient
      .send('get_user', token)
      .toPromise();
    if (result.status === 200) {
      return userObj(result.data);
    } else {
      throw new HttpException(
        {
          status: result.status,
          error: result.error,
        },
        result.status,
      );
    }
  }
}
