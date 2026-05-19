import Razorpay from "razorpay";

import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: "YOUR_RAZORPAY_KEY",

  key_secret:
    "YOUR_RAZORPAY_SECRET",
});

export async function POST() {
  try {
    const options = {
      amount: 50000,

      currency: "INR",

      receipt:
        "order_receipt_" +
        Date.now(),
    };

    const order =
      await razorpay.orders.create(
        options
      );

    return NextResponse.json({
      success: true,

      order,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,

      error: error.message,
    });
  }
}