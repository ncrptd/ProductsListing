
function Product(props) {
    const { product } = props;
    return (
        <div className="text-xl mb-2 font-semibold">
            <h2> Title: {product?.title}</h2>
            <p
            >Quantity: {product?.quantity}</p>
        </div>
    )
}
export default Product