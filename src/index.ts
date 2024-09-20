import Express from "express"
import MedicineRoute from "./router/medicineRoute"
import AdminRoute from "./router/adminRoute"

const app = Express()

app.use(Express.json())

app.use('/medicine', MedicineRoute)
app.use(`/admin`, AdminRoute)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server berlari di jalan ${PORT}`)
})
