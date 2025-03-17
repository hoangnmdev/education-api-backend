/* istanbul ignore file */
import { NestFactory } from '@nestjs/core';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import validationOptions from './utils/validation.error';
import { ValidationPipe } from '@nestjs/common';
import { DATABASE_CONNECTED_MESSAGE } from './constants';

(async function () {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  const dataSource = app.get<DataSource>(getDataSourceToken());

  if (!dataSource.isInitialized) {
    try {
      await dataSource.initialize();
      console.log(DATABASE_CONNECTED_MESSAGE.CONNECTED);
    } catch (error) {
      console.error(DATABASE_CONNECTED_MESSAGE.FAILED, error);
    }
  } else {
    console.log(DATABASE_CONNECTED_MESSAGE.CONNECTED);
  }

  await app.listen(3000);
})().catch((error) => {
  console.error(error);
});
