import { useState, useEffect } from "react"
import {
    collection,
    onSnapshot
} from 'firebase/firestore'
import { db } from "../firebase";
import Product from "./Product";

function Products() {
    const [products, setProducts] = useState([]);

    const productsRef = collection(db, 'products');

    const getProducts = async () => {
        try {
            onSnapshot(productsRef, (snapshot) => {
                let products = []
                snapshot.forEach((doc) => {
                    products.push({ ...doc.data(), id: doc.id })
                })
                setProducts(products)
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            {products.map((product) => <Product key={product?.id} product={product} />)}
        </div>
    )
}
export default Products