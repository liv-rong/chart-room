import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor() {
    super({
      log: [
        {
          emit: 'stdout',
          level: 'query',
        },
      ],
    });
  }
}
