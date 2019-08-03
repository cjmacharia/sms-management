export const creationSuccess = (ctx, data) => {
  ctx.body = {
    data: data,
    message: 'successfully created'};
    ctx.status = 201;
};
export const updateSuccess = (ctx, data) => {
  ctx.body = {
    data: data,
    message: 'successfully updated'};
    ctx.status = 200;
};
export const DeleteSuccess = (ctx) => {
  ctx.body = {
    message: 'successfully deleted the contact'};
    ctx.status = 200;
};
export const retrivalSuccessful = (ctx, data) => {
  ctx.body = {
    data: data
  };
    ctx.status = 200;
};
export const validationError = (res, err) => {
  res.body = {
    message: err.message,
  };
  res.status = 403;
};

export const RegisterContact = (res) => {
  res.body = {
    message: 'Please register the contacts first'
  };
  res.status = 403;
};
export const NotFound = (res) => {
  res.body = {
    message: 'Nothing was  found',
  };
  res.status = 404;
};

export const contactDetailsError = (res, err) => {
  res.body = {
    message: err,
  };
  res.status = 400;
};

export const serverError = (res) => {
res.body  = {
  message: 'an error occured'
};
res.status = 500;
};
export const invalidIdError = (res) => {
  res.body  = {
    message: 'Invalid Id'
  };
  res.status = 404;
  };