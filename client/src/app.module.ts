import { Module } from '@nestjs/common';
import { UserModule } from './application/user/user.module';
import { KafkaModule } from './kafka.module';

@Module({
  imports: [KafkaModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
