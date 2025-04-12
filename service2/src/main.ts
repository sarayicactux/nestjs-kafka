import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'token',
          brokers: ['localhost:9092'],
          retry: {
            initialRetryTime: 100,
            retries: 8,
          },
        },
        consumer: {
          groupId: 'token-consumer',
          sessionTimeout: 30000,
          heartbeatInterval: 3000,
          rebalanceTimeout: 60000,
          maxBytesPerPartition: 10485760, // 10MB
        },
        producer: {
          createPartitioner: Partitioners.LegacyPartitioner,
        },
      },
    },
  );

  try {
    await app.listen();
    console.log('Microservice is listening');
  } catch (error) {
    console.error('Failed to start the microservice:', error);
  }
}
bootstrap();
