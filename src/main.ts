import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//The basic code needed just to start your app.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  //Add CORS config
  app.enableCors({
    origin: 'http://localhost:9000', // Your Quasar app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, 
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
