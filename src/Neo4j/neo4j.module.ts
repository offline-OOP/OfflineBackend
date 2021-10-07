/* eslint-disable prettier/prettier */
import { Global, Module, DynamicModule } from '@nestjs/common';
import * as Neode from 'neode';
import { neo4jConfigFactory } from './Configs/neo4j.config';
import { ConfigService } from '@nestjs/config';

interface Schema {
  [label: string]: Neode.SchemaObject;
}

@Global()
@Module({})
export class NeodeModule {
  static forRoot(): DynamicModule {
    return {
      module: NeodeModule,
      global: true,
      providers: [
        {
          provide: 'Connection',
          inject: [ConfigService],
          useFactory: async (config: ConfigService): Promise<Neode> => {
            const neo4jConfig = await neo4jConfigFactory(config);
            const connect: Neode = await new Neode(
              `bolt://${neo4jConfig.host}:${neo4jConfig.port}`,
              neo4jConfig.username,
              neo4jConfig.password,
            );
            return connect;
          },
        },
      ],
    };
  }

  static forFeature(schema: Schema): DynamicModule {
    return {
      module: NeodeModule,
      global: false,
      providers: [
        {
          provide: 'CONFIG',
          useValue: schema,
        },
        {
          provide: 'Connection',
          useFactory: async (
            schema: Schema,
            config: ConfigService,
          ): Promise<Neode> => {
            const neo4jConfig = await neo4jConfigFactory(config);
            const connect: Neode = new Neode(
              `bolt://${neo4jConfig.host}:${neo4jConfig.port}`,
              neo4jConfig.username,
              neo4jConfig.password,
            );

            // If schema already installed It handle warn
            try {
              await connect.with(schema);
              await connect.schema.install();
            } catch (error) {
              console.log(Object.keys(schema)[0]);
            } finally {
              return connect;
            }
          },
          inject: ['CONFIG', ConfigService],
        },
      ],
      exports: ['Connection'],
    };
  }
}
