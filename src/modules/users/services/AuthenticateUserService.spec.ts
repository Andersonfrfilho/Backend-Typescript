import AppError from '@shared/errors/AppError';
import FakeUsersRespository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRespository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRespository();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    await fakeUsersRepository.create({
      name: 'Anderson Fernandes',
      email: 'andersonfrfilho@gmail.com',
      password: '123456',
    });
    const response = await authenticateUser.execute({
      email: 'andersonfrfilho@gmail.com',
      password: '123456',
    });
    expect(response).toHaveProperty('token');
  });
  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'andersonfrfilho@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to Authenticated from wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Anderson Fernandes',
      email: 'andersonfrfilho@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'andersonfrfilho@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
