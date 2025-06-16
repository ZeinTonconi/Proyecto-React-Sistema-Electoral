import { useRef, useEffect } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import { t } from 'i18next';

interface CameraModalProps {
  open: boolean;
  onClose: () => void;
  onCapture: (base64Image: string) => void;
}

export const CameraModal = ({ open, onClose, onCapture }: CameraModalProps) => {
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
  const video = videoRef.current;
  const canvas = canvasRef.current;
  if (video && canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageBase64 = canvas.toDataURL('image/png');
      onCapture(imageBase64);
    }
  }
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
          <Typography variant="h6">{t("cameraModal.title")}</Typography>
          <video ref={videoRef} width="300" height="200" />
          <canvas ref={canvasRef} width="300" height="200" style={{ display: 'none' }} />
          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleCapture}>
            {t("cameraModal.captureButton")}
          </Button>
        </Box>
      </Modal>
  );
};
