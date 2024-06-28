export interface Task {
  [x: string]: string | boolean;
  id: string;
  title: string;
  status: boolean;
  description: string;
}
