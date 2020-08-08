const http = require('./app');
const port = process.env.PORT || 5000;


http.listen(port, () => {
    console.log(`Server started on ${port}`);
});