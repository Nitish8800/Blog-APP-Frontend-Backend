"use client";
import { NextResponse } from "next/server";
import { useCookies } from "react-cookie";

export function authMiddleware(handler) {
  return async (req) => {
    // Skip middleware for routes that don't require authentication
    if (req.pathname === "/login" || req.pathname === "/signup") {
      return handler(req);
    }

    // Authenticate the token from cookies
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;

    if (!token) {
      // Token is missing, redirect to login page or perform other actions
      return NextResponse.redirect("/login");
    }

    // Continue to the protected route
    return handler(req);
  };
}
