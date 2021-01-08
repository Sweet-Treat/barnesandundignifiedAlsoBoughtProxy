const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');

app.use(cors());
// app.use(express.static(__dirname + '/../client/dist'));
app.use(express.static('client/dist'));


app.get('/products/:rootIsbn/alsoBought', (req, res) => {
  console.log(req.params.rootIsbn);
  axios.get(`http://54.183.241.255:3004/products/${req.params.rootIsbn}/alsoBought`)
  .then((response) => {
    res.status(200).send(response.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})



app.listen(port, () => {
  console.log(`Listening on EC2 instance port: ${port}`);
});
















// const httpProxy = require('http-proxy');
// const apiProxy = httpProxy.createProxyServer();

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