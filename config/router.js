const createError = require('http-errors');


function initRoute(app) {
    const AuthRoute = require('../Auth/auth.route');
    app.use('/auth', AuthRoute);

    const CompanyRoute = require('../companies/companies.route.js');
    app.use('/companies', CompanyRoute);

    const EmployeeRoute = require('../employee/employee.route.js');
    app.use('/employee', EmployeeRoute);

    app.use((req, res, next) => {
        next(createError(404, 'Not Found Route !!'))
    })

    app.use((error, req, res, next) => {
        res.status(error.status || 500)
        res.send({
            error: {
                status: error.status || 500,
                message: error.message
            }
        })
    })
}

module.exports = initRoute;
