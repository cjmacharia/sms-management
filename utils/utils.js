export const validate = (data) => {
  let name = data.name || data.body;
  return new Promise((resolve, reject) => {
    name = name.replace(/^\s+/g, '');
    if(!name)  {
      return reject ('this cannot be an empty string');
    }
      const re = /^([A-Za-z]+\s)*[A-Za-z]+$/;
			const validName = name.match(re);
			if (!validName) {
				return reject ('the name can not contain a number');
			}	
    return resolve(data);
  });
};

export const verifyId = (id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      return (id);
    } else {
       throw new TypeError();
    }
};