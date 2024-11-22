export interface ModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  content: string;
}
