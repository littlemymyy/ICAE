import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const test = () => {
    const canvasRef = useRef(null);
    const socketRef = useRef();
    useEffect(() => {
        // Connect to the WebSocket server
        socketRef.current = io('http://localhost:9000');
    
        // Listen for cursor movements from other users
        socketRef.current.on('mousemove', (data) => {
          drawCursor(data);
        });
    
        // Cleanup on unmount
        return () => {
          socketRef.current.disconnect();
        };
      }, []);

      const handleMouseMove = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
    
        // Emit the cursor position to the server
        socketRef.current.emit('mousemove', { x, y });
      };

      const drawCursor = (data) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
    
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(data.x, data.y, 10, 0, 2 * Math.PI);
        context.fillStyle = 'red';
        context.fill();
        context.stroke();
      };
  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black' }}
        onMouseMove={handleMouseMove}
      ></canvas>
    </div>
  )
}

export default test


