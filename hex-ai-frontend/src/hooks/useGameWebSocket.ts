import { useState, useCallback, useRef, useEffect } from 'react';

// Enum for WebSocket connection states
export enum WebSocketState {
  CONNECTING = 'CONNECTING',
  OPEN = 'OPEN',
  CLOSING = 'CLOSING',
  CLOSED = 'CLOSED',
  ERROR = 'ERROR',
}

// Interface for the hook's return value
interface UseGameWebSocketReturn {
  connectionState: WebSocketState;
  sendMessage: (payload: object) => void;
  connect: (url: string) => void;
  disconnect: () => void;
  lastMessage: any | null;
  error: Event | Error | null; // Allow Error type for creation failures
}

/**
 * Custom hook to manage a WebSocket connection.
 * @param onMessageCallback Optional callback function to handle incoming messages.
 */
export function useGameWebSocket(onMessageCallback?: (message: any) => void): UseGameWebSocketReturn {
  const [connectionState, setConnectionState] = useState<WebSocketState>(WebSocketState.CLOSED);
  const [lastMessage, setLastMessage] = useState<any | null>(null);
  const [error, setError] = useState<Event | Error | null>(null); // Allow Error type
  const ws = useRef<WebSocket | null>(null);

  // Function to connect to a WebSocket URL
  const connect = useCallback((url: string) => {
    // Prevent multiple connections if already open or connecting
    if (ws.current && (ws.current.readyState === WebSocket.OPEN || ws.current.readyState === WebSocket.CONNECTING)) {
      console.log(`WebSocket already ${ws.current.readyState === WebSocket.OPEN ? 'open' : 'connecting'}.`);
      return;
    }

    // Clean up previous connection if any (ensures disconnect logic runs)
    if (ws.current) {
       // Set state to CLOSING before explicitly closing
       setConnectionState(WebSocketState.CLOSING);
       ws.current.close();
       ws.current = null; // Clear ref immediately after calling close
       console.log("Cleaned up previous WebSocket connection before reconnecting.");
    }


    console.log(`Connecting to ${url}...`);
    setConnectionState(WebSocketState.CONNECTING);
    setError(null);
    setLastMessage(null);

    try {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log('WebSocket connection opened.');
        setConnectionState(WebSocketState.OPEN);
        setError(null);
      };

      ws.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('WebSocket message received:', message);
          setLastMessage(message);
          if (onMessageCallback) {
            onMessageCallback(message);
          }
        } catch (e) {
          console.error('Failed to parse WebSocket message:', e, 'Raw data:', event.data);
        }
      };

      ws.current.onerror = (event) => {
        console.error('WebSocket error:', event);
        // Check if connection is already closing/closed to avoid overwriting state
        if (connectionState !== WebSocketState.CLOSING && connectionState !== WebSocketState.CLOSED) {
             setConnectionState(WebSocketState.ERROR);
             setError(event);
        }
      };

      ws.current.onclose = (event) => {
        console.log(`WebSocket connection closed: Code=${event.code}, Reason=${event.reason}`);
        // Only update state if it wasn't an intentional close initiated by disconnect() or a reconnect attempt
         if (connectionState !== WebSocketState.CLOSING) {
             setConnectionState(WebSocketState.CLOSED);
             setError(null); // Clear error on close unless it was an error state already
         }
        // Check if ws.current still points to the closing socket before nulling
        // This check might be less critical now due to immediate nulling in disconnect/reconnect
        if (ws.current && ws.current.url === url) {
             ws.current = null;
        }
      };

    } catch (err) {
        console.error("Failed to create WebSocket:", err);
        setConnectionState(WebSocketState.ERROR);
        // Store the actual error object
        setError(err instanceof Error ? err : new Error('WebSocket creation failed'));
        ws.current = null;
    }
    // ** THE FIX IS HERE **
    // Removed `connectionState` from the dependency array.
    // `connect` should only be recreated if `onMessageCallback` changes.
  }, [onMessageCallback]); // <--- FIXED DEPENDENCY ARRAY

  // Function to disconnect the WebSocket
  const disconnect = useCallback(() => {
    if (ws.current) {
      console.log('Closing WebSocket connection intentionally...');
      setConnectionState(WebSocketState.CLOSING); // Set state *before* closing
      ws.current.close();
      ws.current = null; // Clear ref immediately
    }
  }, []); // No dependencies needed

  // Function to send a JSON message
  const sendMessage = useCallback((payload: object) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      try {
        const messageString = JSON.stringify(payload);
        console.log('Sending WebSocket message:', messageString);
        ws.current.send(messageString);
      } catch (e) {
        console.error('Failed to stringify or send WebSocket message:', e);
      }
    } else {
      console.warn(`Cannot send message: WebSocket is not open (State: ${ws.current?.readyState})`);
    }
  }, []); // No dependencies needed

   // Effect to disconnect on component unmount
   useEffect(() => {
    // Store the current WebSocket ref in a variable accessible by the cleanup function
    const currentWs = ws.current;
    return () => {
      // Use the captured ref in the cleanup
      if (currentWs) {
        console.log("Disconnecting WebSocket on component unmount");
        // No need to set state here as the component is unmounting
        currentWs.close();
      }
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount


  return { connectionState, sendMessage, connect, disconnect, lastMessage, error };
}
