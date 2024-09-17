import Express from "express"
import MedicineRoute from "./router/medicineRoute"

const app = Express()

app.use(Express.json())

app.use('/medicine', MedicineRoute)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server berlari di jalan ${PORT}`)
})
