const AppError = require("./../utilities/AppError");
const User = require("./../models/userModel");
const Code = require("./../models/codeModel");
const { catchErrorAsync } = require("./../utilities/catchError");
const Email = require("./../utilities/mail");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const saveCookie = (id, req, res) => {
  res.cookie("code", token, {
    maxAge: process.env.CODE_COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
  });
};

const createToken = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET_KEY, {
    expiresIn: 600,
  });
  n;
};
const sign_up = catchErrorAsync(async (req, res, next) => {
  const randomCode = Math.round(Math.random() * 900000 + 100000);
  let token;
  if (req.body.email) {
    const user = {
      email: req.body.email,
    };
    await new Email(user, randomCode).sendCode();

    const hasEmail = await Code.findOne({ email_or_phone: user.email });
    if (hasEmail) {
      token = createToken(CodeSave._id);

      await Code.findByIdAndUpdate(
        hasEmail._id,
        {
          code: randomCode,
          expired_date: Number(Date.now()) + 10 * 60 * 1000,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      // await Code.create({
      //   email_or_phone: user.email,
      //   code: randomCode,
      // });
    } else {
      const CodeSave = await Code.create({
        email_or_phone: user.email,
        code: randomCode,
      });
      token = createToken(CodeSave._id);
    }
    saveCookie(token, res);
    res.status(200).json({
      status: "succces",
      message: "emailga kod jonatildi",
    });
  }

  req.email = req.body.email;
  next();
});

const verifyCode = catchErrorAsync(async (req, res, next) => {
  const getCodeEmail = await jwt.verify(
    req.cookies.code,
    process.env.JWT_SECRET_KEY
  );
  const user = await Code.findOne({ email_or_phone: req.email });

  if (!user) {
    return next(new AppError("bunday user mavjud emas", 400));
  }
  if (!(user.code == req.body.code && user.expired_date > Date.now())) {
    return next(
      new AppError("Bu kodning muddati o'tgan yoki user codi xato", 400)
    );
  }

  await Code.findByIdAndUpdate(
    getCodeEmail.id,
    {
      verified: true,
    },
    { new: true }
  );
  res.status(200).json({
    status: "succces",
    message: "kod tug'ri kiritildi",
  });
});
const registerData = catchErrorAsync(async (req, res, next) => {
  const code = await jwt.verify(req.cookies.code, process.env.JWT_SECRET_KEY);
  const userEmail = await Code.findById(code.id);
  if (!userEmail.verified) {
    return next(new AppError("Kodni tasdiqlamagansz"), 400);
  }
  const cheskEmail = userEmail.email_or_phone.includes("@");
  const datas = {
    account_id: req.body.account_id,
    full_name: req.body.full_name,
    birth_date: req.body.birth_date,
    photo: req.body.photo,
    phone: cheskEmail ? "".email_or_phone : "",
    email: cheskEmail ? userEmail.email_or_phone : "",
    password: req.body.password,
    password_confirm: req.body.password_confirm,
    phone_active: email_or_phone ? false : true,
    email_active: email_or_phone ? true : false,
  };
});
module.exports = { sign_up, verifyCode, registerData };
