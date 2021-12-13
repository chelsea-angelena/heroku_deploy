import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const SwaggerModuleOptions = (app) => {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Image App Api')
    .setDescription(
      'API for image recognition app. Handles request from front end React-Natve application to/from Clarifai API and Plantid Api',
    )
    .setVersion('2.0')
    .build();

  const Document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, Document);
};
