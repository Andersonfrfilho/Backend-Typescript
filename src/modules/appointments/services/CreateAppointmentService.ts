import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
// DTO
interface IRequest {
  provider_id: string;
  date: Date;
}
// Dependency Inversion (SOLID)
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    // regra de negócio
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', 400);
    }
    // cria a instancia
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });
    // salva a instancia
    return appointment;
  }
}
export default CreateAppointmentService;
