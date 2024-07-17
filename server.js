const express = require('express');
const { engine } =  require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

//Setup Handlebars Engine and Views
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
