import AppError from '@shared/errors/AppError';
import FakeAppointmentsRespository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRespository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const appointment = await createAppointment.execute({
      date: new Date(),
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
    const fakeAppointmentsRepository = new FakeAppointmentsRespository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const appointmentDate = new Date(2020, 4, 10, 11);
    const appointment = await createAppointment.execute({
      date: appointmentDate,
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
    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '12345674',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
