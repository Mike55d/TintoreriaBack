export type AssignUser = {
  user: number;
  email: string;
};

export enum Priority {
  'Bajo' = 1,
  'Medio',
  'Alto',
  'Critico'
}

export enum Type {
  'Indicente' = 1,
  'Solicitud'
}

export enum Impact {
  'Bajo' = 1,
  'Medio',
  'Alto',
  'Critico'
}

export enum Urgency {
  'Bajo' = 1,
  'Medio',
  'Alto',
  'Critico'
}

export enum Status {
  'En espera' = 1,
  'Resuelto',
}