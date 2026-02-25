import React, { useRef, useState } from 'react';
import { Camera, RefreshCw } from 'lucide-react';

const AttendanceCamera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setStatus('error');
      setMessage('Could not access camera');
    }
  };

  const capture = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setStatus('processing');
    const context = canvasRef.current.getContext('2d');
    if (context) {
      context.drawImage(videoRef.current, 0, 0, 640, 480);
      const imageData = canvasRef.current.toDataURL('image/jpeg');

      try {
        const response = await fetch('/api/v1/attendance/mark', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            image_data: imageData,
            event_type: 'clock_in' // or toggle
          })
        });

        const result = await response.json();
        if (result.status === 'marked') {
          setStatus('success');
          setMessage(`Attendance marked for ${result.employee_name}`);
        } else {
          setStatus('error');
          setMessage(result.message || 'Recognition failed');
        }
      } catch (err) {
        setStatus('error');
        setMessage('Server error');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Camera className="w-6 h-6 mr-2 text-primary-600" />
        Facial Attendance
      </h3>

      <div className="relative w-full max-w-md aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
        {!isCapturing ? (
          <button
            onClick={startCamera}
            className="absolute inset-0 flex flex-col items-center justify-center text-white hover:bg-gray-800 transition-colors"
          >
            <Camera className="w-12 h-12 mb-2" />
            <span>Start Camera</span>
          </button>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        )}
        <canvas ref={canvasRef} width="640" height="480" className="hidden" />
      </div>

      {isCapturing && status !== 'processing' && (
        <button
          onClick={capture}
          className="bg-primary-600 text-white px-8 py-2 rounded-full font-bold hover:bg-primary-700 transition-colors"
        >
          Check In / Out
        </button>
      )}

      {status === 'processing' && (
        <div className="flex items-center text-primary-600 font-medium">
          <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
          Processing...
        </div>
      )}

      {message && (
        <p className={`mt-4 font-medium ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AttendanceCamera;
