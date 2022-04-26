const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const Product = require("./models/product")             //   ./  refers to current directory

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy"]; //for the category selector

app.use(express.static('public'))




mongoose.connect("mongodb://localhost:27017/farmStand")
    .then(() => {
        console.log("MongoDB Connection Success :)");
    })
    .catch(err => {
        console.log("MongoDB Connection Failure :(")
        console.log(err);
    })



app.set("view engine", "ejs");      //set ejs to be the view engine
app.set("views", path.join(__dirname, "views"));    //set the views folder location!


app.listen(3000, () => {
    console.log("Listening on port 3000 :)")
})

// app.get("/products", async (req, res) => {
//     const products = await Product.find({})      //query your Product model information from the database

//     res.render("products/index", { products, categories });     //pass the database data to the EJS
// })

app.get("/products", async (req, res) => {
    const { category } = req.query;
    if (category === "all") {
        res.redirect("/products");
    }
    else if (category) {
        const products = await Product.find({ category: category })
        res.render("products/index", { products, categories })
    } else {
        const products = await Product.find({})      //query your Product model information from the database
        res.render("products/index", { products, categories, category });     //pass the database data to the EJS
    }
})

app.get("/products/new", (req, res) => {
    res.render("products/new", { categories });
})

app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    res.render("products/show", { product });
})

app.post("/products", async (req, res) => {
    const { name, price, category } = req.body;
    const newProduct = new Product({ name, price: parseInt(price), category });
    await newProduct.save()
    res.redirect("/products")
})

app.get("/products/:id/edit", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product });
})

app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true });       //dont need to save, save is default
    console.log(product)
    res.redirect("/products")
})

app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products')
})