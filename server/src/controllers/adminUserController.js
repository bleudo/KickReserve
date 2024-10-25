import * as adminUserService from '../services/adminUserService.js';

//NO USERS WITH THE SAME USERNAME CAN EXIST */
export const registerAdminUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newAdminUser = await adminUserService.registerAdminUser(username, password);
        res.status(201).json({
            success: true,
            message: 'Admin user created successfully',
            user: newAdminUser
        });
    } catch (error) {
        console.error('Error registering admin:', error);
        if (error.code === '23505') {
            return res.status(400).json({
                success: false,
                error: 'Username already exists'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Error creating new admin',
            details: error.message
        });
    }
};

export const authenticateAdminUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const adminUser = await adminUserService.authenticateAdminUser(username, password);
        if (adminUser) {
            res.status(200).json({ success: true, user: adminUser });
        } else {
            res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ success: false, error: 'Error authenticating the admin user' });
    }
};

export const getReservationsByDateAdmin = async (req, res) => {
    const { date } = req.params;
    try {
        const reservationDates = await adminUserService.getReservationsByDateAdmin(date);
        res.status(200).json(reservationDates);
    } catch (error) {
        console.error('Error sending date', error);
        res.status(500).json({ error: 'Error getting reservations by date' });
    }
};

export const updateReservationAdmin = async (req, res) => {
    const { reservation_id } = req.params;
    const { date, start_time } = req.body;
    try {
        const updatedReservation = await adminUserService.updateReservationAdmin(date, start_time, reservation_id);
        res.status(200).json(updatedReservation);
    } catch (error) {
        console.error('Error sending data to update reservation', error);
        res.status(500).json({ error: 'Error updating the reservation' });
    }
};

export const getAvailableHoursAdmin = async (req, res) => {
    const { field_id, date } = req.params;
    try {
        const hours = await adminUserService.getAvailableHoursAdmin(field_id, date);
        res.status(200).json(hours);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting available hours' });
    }
};
