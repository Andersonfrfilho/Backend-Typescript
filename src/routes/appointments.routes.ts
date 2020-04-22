import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
// SoC:Separation of Concerts (Separação de procupações)
// DTO - Data transfer object
const appointsmentsRouter = Router();
appointsmentsRouter.use(ensureAuthenticated);
appointsmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});
appointsmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  // transformer data
  const parsedDate = parseISO(date);
  const createAppointment = new CreateAppointmentService();
  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });
  return response.json(appointment);
});

export default appointsmentsRouter;
