module.exports = [
    {
        path: '/*',
        httpMethod: 'GET',
        middleware: [function(req, res) {
            res.render('index');
        }]
    }
];