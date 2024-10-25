import cron from 'node-cron';
import { updatePassedReservations } from '../models/reservationModel.js';

const setupReservationCron = () => {
    cron.schedule('0 1 * * *', async () => {
        console.log('Running cron job for past reservations...');
        try {
            const updatedReservations = await updatePassedReservations();
            console.log(`${updatedReservations.length} reservations updated.`)
        } catch (error) {
            console.error('Error updating past reservations:', error);
        }
    });
};

export default setupReservationCron;