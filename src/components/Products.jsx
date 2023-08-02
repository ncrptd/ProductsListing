import { useState, useEffect } from "react"
import {
    collection,
    onSnapshot
} from 'firebase/firestore'
import { db } from "../firebase";

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
            <ul>
                {products.map((product) => <li key={product?.id}>
                    <h2>Title: {product?.title}</h2>
                    <p>Quantity: {product?.quantity}</p>
                </li>)}
            </ul>
        </div>
    )
}
export default Products