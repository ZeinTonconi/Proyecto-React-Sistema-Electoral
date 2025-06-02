import { useRef, useEffect } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

interface CameraModalProps {
  open: boolean;
  onClose: () => void;
}
export const CameraModal = ({ open, onClose }: CameraModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (open) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      });
    } else {
      stopCamera();
    }
  }, [open]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleCapture = () => {
    stopCamera();
    onClose();
  };

  return (
      <Modal open={open} onClose={onClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 380,
          bgcolor: 'white',
          p: 3,
          borderRadius: 2,
          textAlign: 'center'
        }}>
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
