import { Alert } from '@/models/alert'; // Import the Alert model
import { User } from '@/models/User'; // Import the User model
import { connect } from '@/database/mongo.config'; // Ensure database connection is managed

export default async function handler(req, res) {
  // Ensure only POST requests are processed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST instead.' });
  }

  // Parse and validate request body
  const { userId, message } = req.body;
  if (!userId || !message) {
    return res.status(400).json({ error: 'User ID and message are required.' });
  }

  try {
    // Establish database connection
    await connect();

    // Fetch the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Validate if the user is a "Postmaster"
    if (user.role !== 'Postmaster') {
      return res.status(403).json({ error: 'User is not authorized as a Postmaster.' });
    }

    // Create a new alert assigned to the user
    const alert = new Alert({
      message,               // The message content
      assignedTo: userId,    // Associate the alert with the user
      status: 'Pending',     // Default status
      issuedDate: new Date() // Current date
    });

    // Save the alert in the database
    await alert.save();

    // Optional: Add notification logic here (e.g., send an email or push notification)

    // Respond with success and the newly created alert
    return res.status(201).json({ success: true, alert });
  } catch (error) {
    console.error('Error creating alert:', error);
    return res.status(500).json({ error: 'Internal server error. Failed to send alert.' });
  }
}
