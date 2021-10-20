import style from './style.module.css';
import cn from 'classnames';

const Input = ({value, label, type = 'text', name, onChange}) => {
    return (
        
        <div className={style.root}>
            <input 
            type={type} 
            name={name}
            value={value}
            className={cn(style.input, {[style.valid] : value.length > 0}) }
            label={label}
            onChange={onChange}
            required
              />
              <span className={style.highlight}></span>
            
            <span className={style.bar}></span>
            <label className={style.label}>{label}</label>
            
        </div>

    )
}

export default Input