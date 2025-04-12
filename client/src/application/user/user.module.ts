import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { KafkaModule } from '../../kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
