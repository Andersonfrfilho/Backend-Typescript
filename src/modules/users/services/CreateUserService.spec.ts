import AppError from '@shared/errors/AppError';
import FakeUsersRespository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRespository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRespository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'anderson',
      email: 'andersonfrfilho@gmail.com',
      password: '123456',
    });
    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
      }),
    );
  });
  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'anderson',
      email: 'andersonfrfilho@gmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'anderson',
        email: 'andersonfrfilho@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
