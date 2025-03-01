const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  res
    .status(err.status || 500)
    .json({ success: false, message: err.message || "서버 오류 발생" });
};

module.exports = errorHandler;
