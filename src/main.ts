import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//The basic code needed just to start your app.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port =  process.env.PORT || 3000
  

  //Add CORS config
  app.enableCors({
    origin: ['http://localhost:9000',
             'https://quasar-frontend.onrender.com'
    ], // Your Quasar app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, 
  })
  // await app.listen(process.env.PORT ?? 3000);
  await app.listen(port)
}
bootstrap();
