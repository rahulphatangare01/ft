const app = require('./app');
const dotenv = require('dotenv');
const db = require('./models')
dotenv.config();



db.sequelize.sync({alter:true})
.then(()=>console.log("Database synced"))
.catch((error) => console.log("Error syncing db", error))
const port = process.env.PORT || 5001;


app.listen(port,()=>{
    console.log(`Server is running on PORT ${port}`)
})