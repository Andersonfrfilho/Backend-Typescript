import AppError from '@shared/errors/AppError';
import FakeUsersRespository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const appointment = await createUser.execute({
      name: 'anderson',
      email: 'andersonfrfilho@gmail.com',
      password: '123456',
    });
    expect(appointment).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
      }),
    );
  });
  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    await createUser.execute({
      name: 'anderson',
      email: 'andersonfrfilho@gmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'anderson',
        email: 'andersonfrfilho@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
