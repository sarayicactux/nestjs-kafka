import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { KafkaModule } from '../kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
