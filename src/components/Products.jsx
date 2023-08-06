import { useState } from "react"
import {
    collection,
    limit,
    onSnapshot,
    orderBy,
    query,
    where
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
    const getQuantityQueryFunc = (quantity) => {
        try {
            const q = query(productsRef, where('quantity', '>', quantity));

            onSnapshot(q, (querySnapshot) => {
                const products = [];
                querySnapshot.forEach((doc) => {
                    products.push({ ...doc.data(), id: doc.id })
                })
                setProducts(products)
            })
        } catch (error) {
            console.log(error)

        }
    }

    const getLastThreeProducts = () => {
        try {
            const q = query(productsRef, orderBy('title', 'desc'), limit(3));
            onSnapshot(q, (querySnapshot) => {
                const products = [];
                querySnapshot.forEach((doc) => {
                    products.push({ ...doc.data(), id: doc.id })
                })
                setProducts(products)
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="p-2">
            <div className="flex gap-2">   <button className="bg-gray-400 p-2  rounded text-white" onClick={getProducts}>Get All Products</button>
                <button className="bg-gray-400 p-2  rounded text-white" onClick={() => getQuantityQueryFunc(5)}>Query products with a quantity greater than 5</button>
                <button className="bg-gray-400 p-2  rounded text-white" onClick={getLastThreeProducts}>Query Last 3 Products in Desc Order</button>
            </div>

            <div className="p-4">
                <h1 className='font-bold text-2xl mb-4  text-center'>Products List</h1>
                {products.map((product) => <Product key={product?.id} product={product} />)}
            </div>

        </div>
    )
}
export default Products