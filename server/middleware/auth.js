import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.Authorization?.split(" ")[1];
    /**
     * we can have two types of tokens -
     * 1. customer created by us
     * 2. provided by Google auth
     *
     * The token provided by Google auth has the length greater than 500.
     * That is not the case when the token is created by us.
     */
    const isCustomToken = token?.length < 500;

    let decodedData;

    if (token && isCustomToken) {
      // decode the jwt using our own secret
      decodedData = jwt.verify(token, process.env.SECRET);

      req.userId = decodedData?.id;
    } else {
      // decode the jwt without a secret
      decodedData = jwt.verify(token);

      // 'sub' is the ID equivalent of google users
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.error(error);
  }
};

export default auth;
