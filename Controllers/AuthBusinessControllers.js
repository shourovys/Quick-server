const authController = {};
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Business = require('../Models/BusinessModel');

// eslint-disable-next-line no-useless-escape
const reg_exp_for_email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

authController.businessSineUp = async (req, res) => {
  try {
    const {
      businessName,
      city,
      address,
      postalCode,
      fastName,
      lastName,
      number,
      email,
      password,
      confirmPassword,
      deliveryService,
    } = req.body;

    if (!reg_exp_for_email.test(String(email).toLowerCase())) {
      return res.status(400).json({ message: 'please enter a valid email address' });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: 'The password need to be at least 6 characters long.',
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Enter the save password twice for verification.' });
    }
    const existingBusiness = await Business.findOne({ email }, { email: 1 });
    if (existingBusiness) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newBusiness = new Business({
      businessName,
      city,
      address,
      postalCode,
      fastName,
      lastName,
      number,
      email,
      password: hashPassword,
      deliveryService,
    });

    await newBusiness.save();

    // const token = jwt.sign({ id: saveUser._id }, process.env.JWT_PASSWORD);
    return res.send({
      message: 'Congratulation, your Business account successfully created.',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
authController.businessLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Not all field have been entered' });
    }
    if (!reg_exp_for_email.test(String(email).toLowerCase())) {
      return res.status(400).json({ message: 'please enter a valid email address' });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: 'The password need to be at least 6 characters long.',
      });
    }
    const business = await Business.findOne(
      { email },
      {
        businessName: 1,
        fastName: 1,
        lastName: 1,
        password: 1,
        isActiveByAdmin: 1,
        number: 1,
        email: 1,
      }
    );
    if (!business) {
      return res.status(400).json({ message: 'No account with this email has been registers' });
    }

    const matchPassword = await bcrypt.compare(password, business.password);
    if (!matchPassword) {
      return res.status(400).json({ message: 'password incerate' });
    }

    if (!business.isActiveByAdmin) {
      return res.send({
        message: 'Your account under review. plz call us',
        isActiveByAdmin: business.isActiveByAdmin,
      });
    }
    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ id: business._id }, process.env.JWT_PASSWORD);
    return res.send({
      authorized: token,
      id: business._id,
      businessName: business.businessName,
      name: `${business.fastName} ${business.lastName}`,
      isActiveByAdmin: business.isActiveByAdmin,
      phone: business.number,
      email: business.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

authController.businessDelete = async (req, res) => {
  try {
    await Business.findByIdAndDelete(req.userId);
    return res.send({ message: 'Your account successfully deleted' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

authController.isBusinessEmailAvailable = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Business.findOne({ email }, { email: 1 });
    if (user) {
      return res.send(true);
    }
    return res.send(false);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

authController.businessTokenIsValid = async (req, res) => {
  try {
    const authToken = req.header('authToken');
    if (!authToken) {
      return res.send(false);
    }
    const verifiedToken = jwt.verify(authToken, process.env.JWT_PASSWORD);
    if (!verifiedToken) {
      return res.send(false);
    }
    const user = await Business.findById(verifiedToken.id);
    if (!user) {
      return res.send(false);
    }
    return res.send(true);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = authController;
