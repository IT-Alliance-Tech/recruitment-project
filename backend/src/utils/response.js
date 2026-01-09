export const successResponse = (res, data) => {
  res.status(200).json(data);
};

export const errorResponse = (res, message) => {
  res.status(500).json({ message });
};
