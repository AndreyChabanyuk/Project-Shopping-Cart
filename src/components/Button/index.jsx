import './style.scss'

const btn = (e)=>{
        const x = e.pageX - e.target.offsetLeft
        const y = e.pageY - e.target.offsetTop
        e.target.style.setProperty('--x', `${ x }px`)
        e.target.style.setProperty('--y', `${ y }px`) 
}


const Button = ({title,onClick}) => {
    return ( 
    <button className = 'btn-add' 
    onClick={onClick}
    onMouseMove={btn}>
        <span>{title}</span>
    </button> );
}
 
export default Button

