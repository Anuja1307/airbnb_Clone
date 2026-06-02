const {check, validationResult} = require('express-validator');
const User = require('../models/user');
const bcrypt=require('bcryptjs');

exports.getLogin=(req,res,next)=>{
  
  res.render('auth/login',{pageTitle:'Login',isLoggedIn:req.isLoggedIn,errorMessage: [],
    oldInput: {},user:{}})
}

exports.postLogin=async (req,res,next)=>{
  const {email,password}=req.body;
  const user=await User.findOne({email});
  console.log(user)

  if(!user){
    return res.status(422).render('auth/login', {
            pageTitle: 'Login',
            isLoggedIn: false,
            errorMessage:[{msg:'User not available'}],
            oldInput: {
                email:email
            },
            user:{}
        });

  }

  const isMatch=await bcrypt.compare(password,user.password);

  if(!isMatch){
     return res.status(422).render('auth/login', {
            pageTitle: 'Login',
            isLoggedIn: false,
            errorMessage:[{msg:'Incorrect Password'}],
            oldInput: {
                email:email
            },user:{}
        });

  }

req.session.isLoggedIn = true
req.session.userId = user._id.toString() 

req.session.save(err => {
    if(err) console.log(err);
    console.log("Saved session:", req.session)
    res.redirect('/');
});
}

exports.postLogout=(req,res,next)=>{
  req.session.destroy(()=>{
      res.redirect('/')
  })
}

exports.getSignUp=(req,res,nex)=>{
  
  res.render('auth/SignUp',{pageTitle:'Sign Up',isLoggedIn:req.isLoggedIn,errorMessage:[],oldInput:{
    firstname:'',lastname:'',email:'',password:'',userType:'',
  },user:{}
})

}

exports.postSignUp=[
  check('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({min: 2})
    .withMessage('First name must be at least 2 characters'),
  
  check('LastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({min: 2})
    .withMessage('Last name must be at least 2 characters'),
  
  check('username')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters'),
  
  check('confirmPassword')
    .notEmpty()
    .withMessage('Please confirm your password')
    .custom((value, {req}) => {
      if(value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  
  check('userType')
    .notEmpty()
    .withMessage('Please select a user type')
    .isIn(['guest', 'host'])
    .withMessage('Invalid user type'),
  
  check('check')
    .custom((value) => {
      if(!value) {
        throw new Error('You must agree to the terms and conditions');
      }
      return true;
    }),
  
(req, res, next) => {
    const error = validationResult(req);
    
    if(!error.isEmpty()) {
        return res.status(422).render('auth/SignUp', {
            pageTitle: 'Sign Up',
            isLoggedIn: false,
            errorMessage: error.array(),
            oldInput: {
                firstName: req.body.firstName,
                LastName: req.body.LastName,
                username: req.body.username,
                userType: req.body.userType
            },user:{}
        });
    }

    const {firstName, LastName, username, userType} = req.body;

   bcrypt.hash(req.body.password,12)
  .then(hashedPassword => {

    const user = new User({
      firstName: firstName,
      lastName: LastName,
      email: username,
      password: hashedPassword,
      userType: userType
    });

    return user.save();

  })
  .then((user) => {
    req.session.isLoggedIn = true;
    req.session.userId = user._id.toString();
    req.session.save(err => {
      if(err) {
        console.log('Session save error:', err);
      }
      res.redirect('/');
    });
  })
  .catch(err => {
    console.log('Error saving user:', err);

    return res.status(500).render('auth/SignUp', {
      pageTitle: 'Sign Up',
      isLoggedIn: false,
      errorMessage: [{ msg: 'Error creating account. Please try again.' }],
      oldInput: {
        firstName: req.body.firstName,
        LastName: req.body.LastName,
        username: req.body.username,
        userType: req.body.userType
      },user:{}
    });
  });

}
];