export interface Alert {
  message: string | null;
  severity: 'success' | 'error' | null;
  title: string | null;
}
