import { IUser } from 'interfaces/models/user';
import { IUserToken } from 'interfaces/tokens/user';
import * as db from 'db';

import * as service from './profile';

describe('app/services/profile', () => {
  let connection: ReturnType<typeof db.connect>;
  const userToken: IUserToken = {
    id: 1,
    email: 'danielprado.ad@gmail.com',
    firstName: 'test',
    lastName: 'test',
    roles: []
  };

  const user: IUser = {
    email: 'danielprado.ad@gmail.com',
    firstName: 'test',
    lastName: 'test',
    roles: []
  };

  beforeAll(async () => connection = await db.connectAndMigrate());
  afterAll(async () => await connection.destroy());

  it('should update user profile', async () => {
    const promise = service.save(user, userToken);
    expect(promise).toResolve();
    const result = await promise;

    expect(result).not.toBeUndefined();
    expect(result.firstName).toEqual(user.firstName);
    expect(result.lastName).toEqual(user.lastName);
    expect(result.email).toEqual(user.email);
  });

});