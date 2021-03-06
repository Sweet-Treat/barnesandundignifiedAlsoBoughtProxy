const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const axios = require('axios').default;

app.use(cors());
app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// EC2 IPs (in order of appearance on browser)
const itemSelectionIP = 'http://18.188.228.195:3001';
const alsoBoughtIP = 'http://54.176.137.254:3004';
const productDetailsIP = 'http://3.16.221.35:5001';
const reviewsIP = 'http://3.140.58.207:8000';

/**** Item Selection Service API Calls ****/
app.get('/product/:isbn/formats', (req, res) => {
  axios.get(`${itemSelectionIP}/product/${req.params.isbn}/formats`)
  .then((result) => {
    res.status(200).send(result.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

/**** Also Bought Service API Call ****/
app.get('/products/:rootIsbn/alsoBought', (req, res) => {
  axios.get(`${alsoBoughtIP}/products/${req.params.rootIsbn}/alsoBought`)
  .then((result) => {
    res.status(200).send(result.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

/**** Product and Author Service API Calls****/
app.get('/products/:isbn13', (req, res) => {
  axios.get(`${productDetailsIP}/products/${req.params.isbn13}`)
  .then((result) => {
    res.status(200).send(result.data);
  })
  .catch((err) => {
    console.log('PRODUCTS ERR:', err);
    res.status(500).send(err);
  })
})

app.get('/publisher', (req, res) => {
  axios.get(`${productDetailsIP}/publisher`)
  .then((result) => {
    res.status(200).send(result.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.get('/series', (req, res) => {
  axios.get(`${productDetailsIP}/series`)
  .then((result) => {
    res.status(200).send(result.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.get('/category/:bookCategory', (req, res) => {
  axios.get(`${productDetailsIP}/category/${req.params.bookCategory}`)
  .then((result) => {
    res.status(200).send(result.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.get('/author/:author', (req, res) => {
  axios.get(`${productDetailsIP}/author/${req.params.author}`)
  .then((result) => {
    res.status(200).send(result.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

/**** Reviews Service API Calls ****/
app.get('/books/:identifier/reviews', (req, res) => {
  axios.get(`${reviewsIP}/books/${req.params.identifier}/reviews`)
  .then((result) => {
    res.status(200).send(result.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.get('/books/:identifier/reviews/summary', (req, res) => {
  axios.get(`${reviewsIP}/books/${req.params.identifier}/reviews/summary`)
  .then((result) => {
    res.status(200).send(result.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.put('/books/:identifier/review/:id', (req, res) => {
  axios.get(`${reviewsIP}/books/${req.params.identifier}/review/${req.params.id}`, req.body)
  .then((result) => {
    res.status(200).send(result.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});