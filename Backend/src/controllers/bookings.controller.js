import * as bookingService from "../services/bookings.service.js";

export async function createBooking(req, res) { /* already there */ }
export async function listBookings(req, res) {
  try {
    const result = await bookingService.listBookings();
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

