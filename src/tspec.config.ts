// src/tspec.config.ts - Updated for your existing codebase
import { Tspec } from 'tspec';
import { envConfig } from './config';

const tspecOptions: Tspec.GenerateParams = {
   specPathGlobs: [
      'src/modules/**/*.tspec.ts',
      'src/modules/**/*.schema.ts',
      'src/types/**/*.ts',
   ],
   tsconfigPath: './tsconfig.json',
   specVersion: 3,
   openapi: {
      title: 'Access Layer Server API',
      version: '1.0.0',
      description:
         'API documentation for Access Layer, the off-chain backend for a Stellar-native creator keys marketplace.',
      servers: [
         {
            url: `http://localhost:${envConfig.PORT}`,
            description: 'Development server',
         },
         {
            url: envConfig.BACKEND_URL,
            description: 'Production server',
         },
      ],

      securityDefinitions: {
         bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Enter the session token received after login',
         },
      },
   },
};

export default tspecOptions;
