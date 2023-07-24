export interface TaskProps {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface TodosProps {
  id: string;
  title: string;
  isCompleted: boolean;
  onCheckTaskIsComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}
