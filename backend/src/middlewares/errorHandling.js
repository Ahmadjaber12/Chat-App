export const errorHandler = (err, req, res, next) => {
  console.error(err); // logs the full error

  let statusCode = err.statusCode|| 500;

  if (err.statusCode==400) statusCode = 400;

  if (err.name === 'ValidationError') {
    const messages = Object.keys(err.errors).map(field => ({
      field,
      message: err.errors[field].message
    }));
    console.log(messages);
    return res.status(400).json({ success: false, errors: messages });
  }
  res.status(statusCode).json({
    success: false,
    message:  err.errmsg || err.message
  });
};
export const notFound = (req, res) => {
  let statusCode = 404;
  {
    return res.status(statusCode).json({
      message: "Page Not Found",
    });
  }
};
