export interface ServerError extends Error {
  response: {
    data: {
      message: string;
    };
  };
}
