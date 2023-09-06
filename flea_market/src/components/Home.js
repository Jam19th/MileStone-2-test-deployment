import supabase from "../supabaseClient";
import { useEffect, useState } from "react";


const Home = () => {
    const [fetchError, setFetchError] = useState(null)
    const [ products, setProducts ] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            const {data, error} = await supabase
            .from('products')
            .select()

            if(error) {
                setFetchError('Could not fetch the products')
                setProducts(null)
                console.log(error)
            }
            if(data) {
                setProducts(data)
                setFetchError(null)
            }
        }

        fetchProducts()
    }, [])

    return (
        <div className="page home">
            <h2>Home</h2>
            {fetchError && (<p>{fetchError}</p>)}
            {products && (
                <div className="products">
                    {products.map(products => (
                        <p>{products.title}</p>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home