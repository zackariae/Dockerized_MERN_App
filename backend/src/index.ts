import express from 'express';

const app = express();
app.get('/', ()=>{
    
})
app.listen(4004, ()=>{
    console.log('server is running on port 4004');
});