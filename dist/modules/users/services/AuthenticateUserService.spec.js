"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let authenticateUser;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUserRepository.default();
    authenticateUser = new _AuthenticateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to authenticate', async () => {
    await fakeUsersRepository.create({
      name: 'Anderson Fernandes',
      email: 'andersonfrfilho@gmail.com',
      password: '123456'
    });
    const response = await authenticateUser.execute({
      email: 'andersonfrfilho@gmail.com',
      password: '123456'
    });
    expect(response).toHaveProperty('token');
  });
  it('should not be able to authenticate with non existing user', async () => {
    await expect(authenticateUser.execute({
      email: 'andersonfrfilho@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to Authenticated from wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Anderson Fernandes',
      email: 'andersonfrfilho@gmail.com',
      password: '123456'
    });
    await expect(authenticateUser.execute({
      email: 'andersonfrfilho@gmail.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});