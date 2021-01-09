const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');

app.use(cors());
app.use(express.static('client/dist'));

// EC2 IPs (in order of appearance on browser)
const itemSelectionIP = 'http://18.188.228.195:3001';
const alsoBoughtIP = 'http://54.183.241.255:3004';
const productDetailsIP = 'http://3.16.221.35:5001';
const reviewsIP = 'http://3.140.58.207:8000';

/**** Item Selection Service API Calls ****/
app.get('/product/:isbn/formats', (req, res) => {//
  axios.get(`${itemSelectionIP}/product/${req.params.isbn}/formats`)//
  .then((res) => {
    res.status(200).send(res.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

/**** Also Bought Service API Call ****/
app.get('/products/:rootIsbn/alsoBought', (req, res) => {
  // console.log(req.params.rootIsbn);
  axios.get(`${alsoBoughtIP}/products/${req.params.rootIsbn}/alsoBought`)
  .then((res) => {
    res.status(200).send(res.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

/**** Product and Author Service API Calls****/
app.get('/products/:isbn', (req, res) => {//
  axios.get(`${productDetailsIP}/products/${req.params.isbn}`)//
  .then((res) => {
    res.status(200).send(res.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.get('/publisher', (req, res) => {
  axios.get(`${productDetailsIP}/publisher`)
  .then((res) => {
    res.status(200).send(res.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.get('/series', (req, res) => {
  axios.get(`${productDetailsIP}/series`)
  .then((res) => {
    res.status(200).send(res.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.get('/category/:bookCategory', (req, res) => {
  axios.get(`${productDetailsIP}/category/${req.params.bookCategory}`)
  .then((res) => {
    res.status(200).send(res.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.get('/author/:author', (req, res) => {
  axios.get(`${productDetailsIP}/author/${req.params.author}`)
  .then((res) => {
    res.status(200).send(res.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

/**** Reviews Service API Calls ****/
app.get('/books/:identifier/reviews', (req, res) => {
  axios.get(`${reviewsIP}/books/${req.params.identifier}/reviews`)
  .then((res) => {
    res.status(200).send(res.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.get('/books/:identifier/reviews/summary', (req, res) => {
  axios.get(`${reviewsIP}/books/${req.params.identifier}/reviews/summary`)
  .then((res) => {
    res.status(200).send(res.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.put('/books/:identifier/review/:id', (req, res) => {
  axios.get(`${reviewsIP}/books/${req.params.identifier}/review/${req.params.id}`, req.body)
  .then((res) => {
    res.status(200).send(res.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.listen(port, () => {
  console.log(`Listening on EC2 instance port ${port}`);
});
















// const httpProxy = require('http-proxy');
// const apiProxy = httpProxy.createProxyServer();

// app.use(express.static(__dirname + '/../client/dist')); // previously used w/ localhost proxy

// let serverOne   = 'http://localhost:3001';
// let serverTwo   = 'http://localhost:5001';
// let serverThree = 'http://localhost:3004';
// let serverFour  = 'http://localhost:8000';

// app.use(express.json());
// app.use(express.urlencoded({extended: false}));

// app.get('/', (req, res) => {
//   res.send('Server running')
// })

// app.all("/product/9780765326386/formats", (req, res) => {
//   console.log('connected to server one');
//   apiProxy.web(req, ers, {target: serverOne});
// })

// app.all("/products/9780765326386/alsoBought", (req, res) => {
//   console.log('connected to server one');
//   apiProxy.web(req, ers, {target: serverTwo});
// })

// app.all("/products/9780765326386", (req, res) => {
//   console.log('connected to server one');
//   apiProxy.web(req, ers, {target: serverThree});
// })

// app.all("/books/9780765326386/reviews", (req, res) => {
//   console.log('connected to server one');
//   apiProxy.web(req, ers, {target: serverFour});
// })