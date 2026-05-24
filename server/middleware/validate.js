export default function validateBody(requiredFields) {
  return (req, res, next) => {
    for (const field of requiredFields) {
      if (!req.body || req.body[field] === undefined) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }
    next();
  };
}

