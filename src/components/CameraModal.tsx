import { useRef, useEffect } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

interface CameraModalProps {
    open: boolean;
    onClose: () => void;
}
export const CameraModal = ({ open, onClose }: CameraModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (open) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      });
    } else {
      // Apagar cámara
      const stream = videoRef.current?.srcObject;
      if (stream && (stream instanceof MediaStream)) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [open]);

  const handleCapture = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ backgroundColor: 'white', padding: 3, margin: 'auto', mt: '10%', width: 340 }}>
        <Typography variant="h6">Verificación facial</Typography>
        <video ref={videoRef} width="300" height="200" />
        <canvas ref={canvasRef} width="300" height="200" style={{ display: 'none' }} />
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleCapture}>
          Tomar Foto
        </Button>
      </Box>
    </Modal>
  );
};
