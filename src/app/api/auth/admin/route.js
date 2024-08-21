import { NextResponse } from "next/server";
import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

// Ensure the database connection is established
connect();

export async function POST(request) {
  // Generate salt and hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync("ak1818", salt);

  // Create a new admin user
  await User.create({
    email: "ayush@gmail.com",
    password: hashedPassword,
    name: "Admin",
    role: "Admin",
  });

  // Return a success response
  return NextResponse.json({
    status: 200,
    message: "Admin created successfully",
  });
}
