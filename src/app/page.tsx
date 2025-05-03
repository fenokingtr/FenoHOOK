"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";

interface RequestData {
  id: string;
  method: string;
  timestamp: string;
  ip: string;
  headers: Record<string, string>;
  content: any;
}

export default function Home() {
  const [webhookUrl, setWebhookUrl] = useState<string>("");
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(true);

  useEffect(() => {
    // Set the fixed webhook URL
    if (!webhookUrl && typeof window !== 'undefined') {
      setWebhookUrl(`${window.location.origin}/api/webhook`);
    }
    
    // Set a polling interval to fetch requests
    const interval = setInterval(() => {
      fetchRequests();
    }, 5000);
    
    // Fetch requests immediately on first load
    fetchRequests();
    
    return () => clearInterval(interval);
  }, [webhookUrl]);

  // Function to fetch requests from the API
  const fetchRequests = async () => {
    if (!webhookUrl) return;
    
    try {
      setLoading(true);
      // Add a special header to indicate we want to fetch stored requests
      const response = await fetch('/api/webhook', {
        headers: {
          'X-Get-Requests': 'true'
        }
      });
      
      const data = await response.json();
      
      if (data.success && data.requests) {
        setRequests(data.requests);
        if (data.requests.length > 0 && isNewUser) {
          setIsNewUser(false);
        }
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(webhookUrl);
    toast.success('URL copied to clipboard!');
  };

  const clearRequests = async () => {
    try {
      setLoading(true);
      // Add a special header to indicate we want to clear stored requests
      await fetch('/api/webhook', {
        headers: {
          'X-Clear-Requests': 'true'
        }
      });
      
      setRequests([]);
      setSelectedRequest(null);
      toast.info('Requests cleared!');
    } catch (error) {
      console.error('Error clearing requests:', error);
      toast.error('Failed to clear requests');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestClick = (request: RequestData) => {
    setSelectedRequest(request);
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      
      {/* Header */}
      <header className="bg-[#0e0e10] text-white p-4 shadow-md border-b border-[#171717]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="FenoHook Logo" 
              width={40} 
              height={40} 
              className="mr-2"
            />
            <h1 className="text-2xl font-bold">
              Feno<span className="text-[#dc2626]">HOOK</span>
            </h1>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => clearRequests()}
              className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-4 py-2 rounded transition-colors"
            >
              Clear Requests
            </button>
            <a href="#pricing" className="px-4 py-2 hover:text-[#dc2626] transition-colors">Pricing</a>
            <a href="#docs" className="px-4 py-2 hover:text-[#dc2626] transition-colors">Documentation</a>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* URL Section */}
        <div className="lg:col-span-3 bg-[#171717] p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Your Webhook URL</h2>
          <div className="flex items-center">
            <input 
              type="text" 
              value={webhookUrl} 
              readOnly 
              className="flex-grow px-4 py-2 border border-[#2d2d2d] rounded-l focus:outline-none bg-[#0e0e10] text-white"
            />
            <button 
              onClick={copyToClipboard}
              className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-4 py-2 rounded-r transition-colors"
            >
              Copy
            </button>
          </div>
          {isNewUser && (
            <p className="mt-4 text-gray-400">
              Send HTTP requests to this URL and they will appear here instantly for inspection.
            </p>
          )}
        </div>
        
        {/* Requests List */}
        <div className="bg-[#171717] p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Requests ({requests.length})</h2>
            {loading && <span className="text-[#dc2626] text-sm">Refreshing...</span>}
          </div>
          
          {requests.length === 0 ? (
            <div className="border border-dashed border-[#2d2d2d] rounded p-8 text-center">
              <p className="text-gray-400">No requests received yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Send a request to your URL to see it appear here
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[#2d2d2d]">
              {requests.map((request) => (
                <li 
                  key={request.id}
                  onClick={() => handleRequestClick(request)}
                  className={`py-3 px-2 cursor-pointer hover:bg-[#242424] rounded ${selectedRequest?.id === request.id ? 'bg-[#242424]' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      request.method === 'GET' ? 'bg-green-700 text-white' : 
                      request.method === 'POST' ? 'bg-[#dc2626] text-white' : 
                      'bg-purple-700 text-white'
                    }`}>
                      {request.method}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(request.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    IP: {request.ip}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Request Details */}
        <div className="lg:col-span-2 bg-[#171717] p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Request Details</h2>
          {selectedRequest ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-400">Method</p>
                  <p className="font-mono">{selectedRequest.method}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Timestamp</p>
                  <p className="font-mono">{new Date(selectedRequest.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">IP Address</p>
                  <p className="font-mono">{selectedRequest.ip}</p>
                </div>
              </div>
              
              {/* Headers */}
              <div>
                <p className="text-sm font-medium text-gray-400 mb-2">Headers</p>
                <pre className="bg-[#0e0e10] p-3 rounded-md font-mono text-sm overflow-x-auto h-32 overflow-y-auto">
                  {JSON.stringify(selectedRequest.headers, null, 2)}
                </pre>
              </div>
              
              {/* Content */}
              <div>
                <p className="text-sm font-medium text-gray-400 mb-2">Content</p>
                <pre className="bg-[#0e0e10] p-3 rounded-md font-mono text-sm overflow-x-auto h-64 overflow-y-auto">
                  {JSON.stringify(selectedRequest.content, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-[#2d2d2d] rounded p-12 text-center">
              <p className="text-gray-400">Select a request to view details</p>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-12 bg-[#171717] p-6">
        <div className="container mx-auto text-center text-gray-400">
          <p>© 2024 FenoHook - All rights reserved</p>
          <div className="mt-2 space-x-4">
            <a href="#terms" className="hover:text-[#dc2626] transition-colors">Terms</a>
            <a href="#privacy" className="hover:text-[#dc2626] transition-colors">Privacy</a>
            <a href="#contact" className="hover:text-[#dc2626] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
