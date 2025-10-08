import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsuarioModule } from 'src/referencias/referencias.module';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  static forfeature(arg0: (typeof UsuarioModule)[]): import("@nestjs/common").Type<any> | import("@nestjs/common").DynamicModule | Promise<import("@nestjs/common").DynamicModule> | import("@nestjs/common").ForwardReference<any> {
    throw new Error('Method not implemented.');
  }
  static forFeature(arg0: UsuarioModule[], arg1: undefined[], arg2: undefined[]): import("@nestjs/common").Type<any> | import("@nestjs/common").DynamicModule | Promise<import("@nestjs/common").DynamicModule> | import("@nestjs/common").ForwardReference<any> {
    throw new Error('Method not implemented.');
  }
} // A palavra 'export' é crucial