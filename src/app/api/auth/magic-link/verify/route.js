import { NextRequest, NextResponse } from "next/server";
import Cryptr from "cryptr";
import Env from "@/config/env";
import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";

connect();

export async function POST(request) {
  const payload = await request.json();

  // Decrypt the email
  const crypt = new Cryptr(Env.SECRET_KEY);
  const email = crypt.decrypt(payload.email);

  // Fetch user with this email and token
  const user = await User.findOne({
    email: email,
    magic_link_token: payload.token,
  });

  if (!user) {
    return NextResponse.json({
      status: 400,
      message: "Magic link is not valid.",
    });
  }

  // Check that the link is not older than 15 minutes
  const fifteenMinAgo = new Date();
  fifteenMinAgo.setMinutes(fifteenMinAgo.getMinutes() - 15);

  if (user.magic_link_sent_at <= fifteenMinAgo) {
    return NextResponse.json({
      status: 400,
      message: "Magic link has expired. Please try to send a new link.",
    });
  }

  // Reset old magic link fields
  user.magic_link_token = null;
  user.magic_link_sent_at = null;
  await user.save();

  return NextResponse.json({
    status: 200,
    message: "Link is valid.",
    email: email,
  });
}
