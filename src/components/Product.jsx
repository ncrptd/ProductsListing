import { doc, runTransaction } from 'firebase/firestore'
import { db } from '../firebase';

function Product(props) {
    const { product } = props;

    const productRef = doc(db, 'products', product.id);

    const handleQuantity = async (type) => {

        try {
            await runTransaction(db, async (transaction) => {
                const productDoc = await transaction.get(productRef);
                if (!productDoc.exists()) {
                    throw 'Document does not exist'
                }
                if (type === 'dec' && product.quantity > 1) {
                    const decreasedQuantity = productDoc.data().quantity - 1;
                    transaction.update(productRef, { quantity: decreasedQuantity })
                } else if (type === 'inc') {
                    const increasedQuantity = productDoc.data().quantity + 1;
                    transaction.update(productRef, { quantity: increasedQuantity })
                }
            })

        } catch (error) {
            console.log(error)

        }
    }

    return (
        <div className="text-2xl mb-2 font-thick bg-gray-100 p-2 flex flex-col gap-2">
            <h2> Title: {product?.title}</h2>

            <div
            >Quantity : <button className='bg-blue-500 text-white px-2 py-0 rounded' onClick={() => handleQuantity('dec')}>-</button> <span>{product?.quantity}</span> <button className='bg-blue-500 text-white px-2 py-0 rounded' onClick={() => handleQuantity('inc')}>+</button></div>
        </div>
    )
}
export default Product