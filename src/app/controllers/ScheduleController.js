import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleProvider {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const schedules = await Appointment.findAll({
      where: { provider_id: req.userId, canceled_at: null },
      order: ['date'],
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    return res.json(schedules);
  }
}

export default new ScheduleProvider();
