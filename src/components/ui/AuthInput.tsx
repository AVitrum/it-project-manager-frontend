import { Input } from "../../types/others";


export function AuthInput({
    type,
    id,
    ref,
    value,
    onChange,
    autoComplete,
    required,
    label,
    Icon,
    iconColor,
    iconHeight,
    iconWidth
}: Input) {
    return (
        <div className="input-box">
            {Icon && (
                <span className="icon">
                    <Icon color={iconColor} height={iconHeight} width={iconWidth} />
                </span>
            )}
            <input
                type={type}
                id={id}
                ref={ref}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                required={required}
            />
            <label>{label}</label>
        </div>
    );
}
