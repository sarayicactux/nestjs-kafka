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
          clientId: 'user-service',
          brokers: ['localhost:9092'],
          retry: {
            initialRetryTime: 100,
            retries: 8,
          },
        },
        consumer: {
          groupId: 'user-consumer',
          allowAutoTopicCreation: true,
          sessionTimeout: 30000,
          heartbeatInterval: 3000,
        },
        producer: {
          createPartitioner: Partitioners.LegacyPartitioner,
        },
        subscribe: {
          fromBeginning: true,
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
