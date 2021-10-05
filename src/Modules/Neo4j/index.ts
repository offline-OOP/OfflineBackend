/* eslint-disable prettier/prettier */
import { Global, Module, DynamicModule } from '@nestjs/common';
import { fromEnv } from 'neode';
import Neode from 'neode';

export interface IConnection {
  host: string;
  username: string;
  password: string;
  port: number;
}

interface Schema {
  [label: string]: Neode.SchemaObject;
}

@Global()
@Module({})
export class NeodeModule {
  static forRoot(connection?: IConnection): DynamicModule {
    if (!connection) {
      return {
        module: NeodeModule,
        global: true,
        providers: [
          {
            provide: 'Connection',
            useFactory: async (): Promise<Neode> => {
              const connect: Neode = await fromEnv();
              return connect;
            },
          },
        ],
        exports: ['Connection'],
      };
    }
    return {
      module: NeodeModule,
      global: true,
      providers: [
        {
          provide: 'Connection',
          useFactory: async (): Promise<Neode> => {
            const connect: Neode = await new Neode(
              `${connection.host}:${connection.port}`,
              connection.username,
              connection.password,
            );
            return connect;
          },
        },
      ],
    };
  }

  static forFeature(schema: Schema, connection?: IConnection): DynamicModule {
    // Check if connection its from env or provided config
    if (!connection) {
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
            useFactory: async (): Promise<Neode> => {
              const connect = await fromEnv().with(schema);

              // If schema already installed It handle warn
              try {
                await connect.schema.install();
              } catch (error) {
                console.log(Object.keys(schema)[0]);
              } finally {
                return connect;
              }
            },
            inject: ['CONFIG'],
          },
        ],
        exports: ['Connection'],
      };
    }
    // Create e new connection from URI
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
          useFactory: async (): Promise<Neode> => {
            const connect = await new Neode(
              `${connection.host}:${connection.port}`,
              connection.username,
              connection.password,
            ).with(schema);
            // If schema already installed It handle warn
            try {
              await connect.schema.install();
            } catch (error) {
              console.log(Object.keys(schema)[0]);
            } finally {
              return connect;
            }
          },
          inject: ['CONFIG'],
        },
      ],
      exports: ['Connection'],
    };
  }
}
