
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Set up session middleware
app.use(session({
  secret: 'Abdoer56jdgnslgsdfdfgt',  
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Load and shuffle products data from JSON files
const details = shuffle(JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'details.json'), 'utf-8')));
const shirtdetails = shuffle(JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'shirtdetails.json'), 'utf-8')));

// Routes
app.get('/', (req, res) => {
  const topDetails = details.slice(0, 12); 
  res.render('index', { details: topDetails, shirtdetails });
});


app.get('/shop', (req, res) => {
  res.render('shop', { details, shirtdetails });
});

// Routes for login and signup 
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  res.redirect('/');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  res.redirect('/');
});

// Cart Routes
app.get('/cart', (req, res) => {
  const cart = req.session.cart || [];
  res.render('cart', { cart });
});

app.post('/add-to-cart', (req, res) => {
  const productId = req.body.productId;
  const productType = req.body.productType;
  const size = req.body.size; 
  if (!size) {
    const product = details.find(p => p.id === productId);
    const featuredProducts = shuffle(details.filter(p => p.id !== productId)).slice(0, 8);
    return res.render('sproduct', { 
      product, 
      featuredProducts,
      sizeError: 'Select a size' 
    });
  }

  let product;
  if (productType === 'product') {
    product = details.find(p => p.id === productId);
  } else if (productType === 'shirt') {
    product = shirtdetails.find(p => p.id === productId);
  }


  if (product) {
    if (!req.session.cart) {
      req.session.cart = [];
    }
    const existingProduct = req.session.cart.find(item => item.id === product.id && item.size === size);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      product.size = size; 
      product.type = productType;
      req.session.cart.push(product);
    }
    res.redirect('/cart');
  } else {
    res.status(404).send('Product not found');
  }
});

app.post('/remove-from-cart', (req, res) => {
  const { productId, size } = req.body;
  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => !(item.id === productId && item.size === size));
  }
  res.redirect('/cart');
});

app.post('/update-cart', (req, res) => {
  const { productId, size, quantity } = req.body;
  if (req.session.cart) {
    const product = req.session.cart.find(item => item.id === productId && item.size === size);
    if (product && quantity > 0) {
      product.quantity = parseInt(quantity, 10);
    }
  }
  res.redirect('/cart');
});

app.get('/sproduct/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = details.find(p => p.id === productId);
  const featuredProducts = shuffle(details.filter(p => p.id !== productId)).slice(0, 8); 
  if (product) {
    res.render('sproduct', { product, featuredProducts });
  } else {
    res.status(404).send('Product not found');
  }
});

app.get('/shirtproduct/:id', (req, res) => {
  const productId = req.params.id;
  const shirt = shirtdetails.find(p => p.id === productId);
  const featuredShirts = shuffle(shirtdetails.filter(p => p.id !== productId)).slice(0, 4); 
  if (shirt) {
    res.render('shirtproduct', { shirt, featuredShirts });
  } else {
    res.status(404).send('Shirt not found');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
