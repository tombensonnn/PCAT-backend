const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const app = express();
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');


// connect DB
mongoose.connect('mongodb://localhost/pcat-db', { // eğer veritabanı varsa bağlanır yoksa oluşturur.
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('DB CONNECTED');
}).catch((error) => {
  console.log(error);
})
// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // url'deki datayı okumamızı sağlar
app.use(express.json()); // url'deki datayı json formatına çevirir.
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// ROUTES

// Photo Routes
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);



// Page Routes
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);





const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Sunucu çalıştırıldı. Port: ${port}`);
});
