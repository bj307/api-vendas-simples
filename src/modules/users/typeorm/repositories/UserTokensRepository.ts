import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
export class UserTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  public async generate(userId: string): Promise<UserToken> {
    const userToken = this.create({
      userId,
    });

    await this.save(userToken);

    return userToken;
  }
}
