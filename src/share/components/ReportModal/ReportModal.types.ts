export interface ReportModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  type: "post" | "comment";
  sendReport: (reason: string) => void;
}
