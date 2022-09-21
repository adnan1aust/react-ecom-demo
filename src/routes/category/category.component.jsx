import './category.styles.scss';
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
    const {category} = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    //Product will return undefined as category context is using an asnyc call, so first show nothing if no data, show the cards if data available
    useEffect(()=>{
        setProducts(categoriesMap[category]);
    },[category, categoriesMap]);

    return(
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {
                    products && products.map((product) => (<ProductCard key={product.id} product={product}/>))
                }
            </div>
        </>
    )

}

export default Category;