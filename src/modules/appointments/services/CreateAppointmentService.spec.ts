import AppError from '@shared/errors/AppError';
import FakeAppointmentsRespository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRespository;
let createAppointment: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRespository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123456',
      provider_id: '12345674',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        date: expect.any(Date),
        provider_id: expect.any(String),
      }),
    );
  });
  it('should not be able to create two appointment on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointmentDate = new Date(2020, 4, 10, 13);
    const appointment = await createAppointment.execute({
      date: appointmentDate,
      user_id: '1234567',
      provider_id: '12345674',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        date: expect.any(Date),
        provider_id: expect.any(String),
      }),
    );
    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '12345',
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '123123',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: '123123',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment with same before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: '123123',
        provider_id: '1231237',
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: '123123',
        provider_id: '1231237',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
