import './category-item.styles.scss';

const CategoryItem = ({category}) => {
    const {title, imageUrl} = category;
    console.log('category' + category.id, category)
    console.log('imgeurl', category.imageUrl)
    return(
    <div className="category-container">
        <div className="background-image" style={{backgroundImage: `url(${imageUrl})`}}/>
        <div className="category-body-container">
            <h1>{title}</h1>
            <p>Shop Now</p>
        </div>
    </div>
    )
}

export default CategoryItem;
