
export function handleValidate(scheme) {

  return (req, res, next) => {

    let result = scheme.validate(req.body);

    (result.error)
      ? next(result.error)
      : next();
  };
};