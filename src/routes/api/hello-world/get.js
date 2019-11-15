export default {
    handler: (request) => {
        const { payload: {input} } = request 
        
        return true
    },
    method: 'POST',
    path: '/api/expression'
};
