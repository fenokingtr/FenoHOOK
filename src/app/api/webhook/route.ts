import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// This is a simulation of a database - in a real phishing site, this would be stored in a database
// Using a module-level variable for simplicity
let requestsStore: any[] = [];

export async function GET(request: NextRequest) {
  // Check for the X-Get-Requests header to determine if this is a request for stored requests
  if (request.headers.get('X-Get-Requests') === 'true') {
    return getStoredRequests();
  }
  
  // If X-Clear-Requests header is present, clear the requests
  if (request.headers.get('X-Clear-Requests') === 'true') {
    requestsStore = [];
    return NextResponse.json({
      success: true,
      message: 'All requests cleared'
    });
  }
  
  // Otherwise, handle as a regular webhook request
  const ip = request.headers.get('x-forwarded-for') || 'Unknown';
  
  console.log(`Received GET request on webhook`);
  
  const requestData = {
    id: uuidv4(),
    method: 'GET',
    timestamp: new Date().toISOString(),
    ip: ip,
    headers: Object.fromEntries(request.headers.entries()),
    content: null
  };
  
  // Store the request
  requestsStore.push(requestData);

  return NextResponse.json({
    success: true,
    message: 'Webhook received',
    method: 'GET',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'Unknown';
  
  let body;
  try {
    body = await request.json();
  } catch (error) {
    body = 'Could not parse JSON body';
  }
  
  console.log(`Received POST request on webhook`);
  
  const requestData = {
    id: uuidv4(),
    method: 'POST',
    timestamp: new Date().toISOString(),
    ip: ip,
    headers: Object.fromEntries(request.headers.entries()),
    content: body
  };
  
  // Store the request
  requestsStore.push(requestData);

  return NextResponse.json({
    success: true,
    message: 'Webhook received',
    method: 'POST',
    timestamp: new Date().toISOString()
  });
}

// Support for other HTTP methods
export async function PUT(request: NextRequest) {
  return handleRequest(request, 'PUT');
}

export async function PATCH(request: NextRequest) {
  return handleRequest(request, 'PATCH');
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request, 'DELETE');
}

async function handleRequest(request: NextRequest, method: string) {
  const ip = request.headers.get('x-forwarded-for') || 'Unknown';
  
  let body;
  try {
    body = await request.json();
  } catch (error) {
    body = 'Could not parse JSON body';
  }
  
  console.log(`Received ${method} request on webhook`);
  
  const requestData = {
    id: uuidv4(),
    method: method,
    timestamp: new Date().toISOString(),
    ip: ip,
    headers: Object.fromEntries(request.headers.entries()),
    content: body
  };
  
  // Store the request
  requestsStore.push(requestData);

  return NextResponse.json({
    success: true,
    message: 'Webhook received',
    method: method,
    timestamp: new Date().toISOString()
  });
}

// Function to return stored requests
function getStoredRequests() {
  // If there are no requests, generate some fake data
  if (requestsStore.length === 0) {
    // For demonstration purposes, generate some fake data
    return NextResponse.json({
      success: true,
      requests: [
        {
          id: '1',
          method: 'POST',
          timestamp: new Date(Date.now() - 10000).toISOString(),
          ip: '192.168.1.1',
          headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'content-type': 'application/json'
          },
          content: {
            username: 'demo_user',
            password: 'password123',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
          }
        },
        {
          id: '2',
          method: 'GET',
          timestamp: new Date().toISOString(),
          ip: '192.168.1.100',
          headers: {
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3)',
            'accept': 'application/json'
          },
          content: null
        }
      ]
    });
  }

  return NextResponse.json({
    success: true,
    requests: requestsStore
  });
} 