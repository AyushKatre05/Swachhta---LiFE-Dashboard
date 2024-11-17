import { Alert } from "@/models/alert";
import { User } from "@/models/User";
import { connect } from "@/database/mongo.config";

// Create an alert
export const POST = async (req) => {
  try {
    await connect(); // Connect to the database

    // Parse the incoming request
    const { message, area, details, assignedTo } = await req.json();

    // Validate input data
    if (!message || !area || !details || !assignedTo) {
      return new Response(
        JSON.stringify({ error: "All fields (message, area, details, assignedTo) are required." }),
        { status: 400 }
      );
    }

    // Verify that the assigned user exists
    const user = await User.findById(assignedTo);
    if (!user) {
      return new Response(JSON.stringify({ error: "Assigned user not found." }), { status: 404 });
    }

    // Create and save the new alert
    const alert = new Alert({
      message,
      area,
      details,
      assignedTo,
      status: "Pending", // Default status
      issuedDate: new Date(), // Automatically add issued date
    });

    await alert.save();

    // Return success response
    return new Response(
      JSON.stringify({ success: true, alert }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating alert:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create alert." }),
      { status: 500 }
    );
  }
};

// Get all alerts
export const GET = async (req) => {
    try {
      await connect(); // Connect to the database
  
      const { assignedTo } = req.url.split('?assignedTo=')[1]; // Get assignedTo from query
  
      // If assignedTo is provided, filter alerts by the assigned user
      let alerts;
      if (assignedTo) {
        alerts = await Alert.find({ assignedTo }).populate("assignedTo", "name email");
      } else {
        // Otherwise, fetch all alerts
        alerts = await Alert.find().populate("assignedTo", "name email");
      }
  
      // Return success response
      return new Response(
        JSON.stringify({ success: true, alerts }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching alerts:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch alerts." }),
        { status: 500 }
      );
    }
  };
