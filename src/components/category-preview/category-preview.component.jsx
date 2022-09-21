import ProductCard from '../product-card/product-card.component'
import './category-preview.styles.scss';
import { Link } from "react-router-dom";

const CategoryPreview = ({title, products}) => {
    return(
        <div className='category-preview-container'>
            <h2>
                <Link className="logo-container" to={title}>{title}</Link>
            </h2>
            <div className='preview'>
                {
                    products.filter((_, idx) => idx < 4).map((product)=> <ProductCard key={product.id} product={product}></ProductCard>)
                }
            </div>
        </div>
    )
}

export default CategoryPreview;