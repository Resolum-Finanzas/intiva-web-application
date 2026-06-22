export type Resource<T> =
  | { status: 'initial' }
  | { status: 'loading'; data?: T }
  | { status: 'success'; data: T; message?: string }
  | { status: 'failure'; message: string; data?: T };