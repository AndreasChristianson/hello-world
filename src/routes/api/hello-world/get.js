export default {
    handler: (request) => {
        console.log(request.payload);

        return {
            message: 'hiya!'
        };
    },
    method: 'POST',
    path: '/api/hello-world'
};
