import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';
// DTO
interface Request {
  provider_id: string;
  date: Date;
}
// Dependency Inversion (SOLID)

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    // regra de negócio
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', 400);
    }
    // cria a instancia
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });
    // salva a instancia
    await appointmentsRepository.save(appointment);
    return appointment;
  }
}
export default CreateAppointmentService;
