import './style.scss'
import priceFormatter from '../utils/priceFormatter'

const Footer = ({total}) => {
    const {count, price } = total; 
    
  return (
    <footer className="cart-footer">
      <div className="cart-footer__count">{count} единицы</div>
      <div className="cart-footer__price">{priceFormatter.format(price)} руб.</div>
    </footer>
  );
};

export default Footer;
