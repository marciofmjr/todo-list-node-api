import app from './core/app'

const PORT = process.env.PORT || 3020

app.listen(PORT, () => {
  console.log(`🚀 Server ready on PORT: ${PORT}`)
})
