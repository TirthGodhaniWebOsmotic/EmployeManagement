const successResponse = (response, data, status) => {
    return response?.status(status || 200).json({status: "SUCCESS", data: data})
}

const errorResponse = (response, status, message) => {
    return response?.status(status || 500).json({
        status: "Error",
        message: message || 'Something went wrong. Please try again later.'
    })
}
module.exports = {successResponse, errorResponse};
