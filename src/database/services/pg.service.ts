import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import User from '../entities/user.entity';
import RefreshToken from '../entities/refresh-tokens.entity';

@Injectable()
export default class PgService {
  constructor(
    @InjectEntityManager() public readonly em: EntityManager,
    @InjectRepository(User) public readonly users: Repository<User>,
    @InjectRepository(RefreshToken) public readonly refreshTokens: Repository<RefreshToken>,
  ) {
  }
}