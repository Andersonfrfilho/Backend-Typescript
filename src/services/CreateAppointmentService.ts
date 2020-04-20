import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
// DTO
interface Request {
  provider: string;
  date: Date;
}
// Dependency Inversion (SOLID)

class CreateAppointmentService {
  public async execute({ date, provider }: Request): Promise<Appointment> {
    // regra de negócio
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }
    // cria a instancia
    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });
    // salva a instancia
    await appointmentsRepository.save(appointment);
    return appointment;
  }
}
export default CreateAppointmentService;
