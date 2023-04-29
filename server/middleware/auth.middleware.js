const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // const token = req.headers.authorization => Bearer ognkbtonmrhpnokmnpokmn
    const token = req.headers.authorization.split(" ")[1]; // ognkbtonmrhpnokmnpokmn

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data = tokenService.validateAccess(token); // провалидирован и распарсен. В объекте data есть _id того человека, у которого сейчас сессия 

    // Если токен не корректный, то пользователь не будет авторизован.
    if (!data) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // модификация, которая будет видна в других методах
    req.user = data; // свойство user будет соответствовать тем данным, которые пришли из токена

    next(); // чтобы цепочка остальных middleware выполнялась
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
