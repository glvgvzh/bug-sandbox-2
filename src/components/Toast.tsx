import { CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

type ToastProps = {
  message: string;
  onClose: () => void;
};

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    window.setTimeout(onClose, 2800);
  }, [message, onClose]);

  return (
    <div className="toast" role="status">
      <CheckCircle2 size={19} />
      {message}
    </div>
  );
}
