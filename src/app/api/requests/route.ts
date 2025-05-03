import { NextRequest, NextResponse } from 'next/server';

// This file is for redirecting to the main webhook route
export async function GET(request: NextRequest) {
  return Response.redirect(new URL('/api/webhook', request.url));
}

export async function POST(request: NextRequest) {
  return Response.redirect(new URL('/api/webhook', request.url));
} 