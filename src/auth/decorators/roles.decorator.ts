import { SetMetadata } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';


export enum Role{
  User = 'user',
  SuperAdmin = 'superadmin'
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);