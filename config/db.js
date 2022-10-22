const mongoose = require('mongoose')

const connectDB = async () => {  //when you use mongoose you are working with promisses (async await vs .then -> up to you)
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,  //avoid warnings in the console
      useUnifiedTopology: true, //avoid warnings in the console
  })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDB
