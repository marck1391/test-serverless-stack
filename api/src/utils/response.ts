export const successResponse = (data: any, statusCode = 200) => ({
  statusCode,
  body: JSON.stringify(data),
});

export const errorResponse = (message: string, statusCode = 400) => ({
  statusCode,
  body: JSON.stringify({ error: message }),
});
