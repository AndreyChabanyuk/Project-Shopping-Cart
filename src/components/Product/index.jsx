import './style.scss'
import Count from '../Count'
import ButtonDelete from '../ButtonDelete'
import priceFormatter from '../utils/priceFormatter'


const Product = ({product}) => {
    const {img, title, price, priceTotal, count, id} = product;

    return (
    <section className="product"
    >
      <div className="product__img">
        <img src={`./img/products/${img}`} alt={title} />
      </div>
      <div className="product__title">{title}</div>
      <div className="product__count">
        <Count id={id}  count={count}/>
      </div>
      <div className="product__price">
        {priceFormatter.format(priceTotal)} руб.
        </div>
      <div className="product__controls">
        <ButtonDelete id={id} />
      </div>
    </section>
  );
};

export default Product;
