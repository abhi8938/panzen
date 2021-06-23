import React from "react";

type CustomTextInputProps = {
    title?: string;
    value: string | undefined;
    onChange: (event: any) => void;
    type: string;
    style?: string;
    titleStyle?: string;
    spanStyle?: string;
    inputStyle?: string;
    onfocus: () => void;
    onblur: () => void;
    logo?: any;
    dropDown?:boolean
    disable?:boolean

};

export const CustomTextInput = ({
                                    title,
                                    value,
                                    onChange,
                                    type,
                                    style,
                                    titleStyle,
                                    spanStyle,
                                    inputStyle,
                                    onfocus,
                                    onblur,
                                    logo,
    disable
                                }: CustomTextInputProps) => {
    return (
        <div className={style}>
            {title == undefined ? null : <text className={titleStyle}>{title}</text>}
            <div>
                {logo !== undefined ? <img src={logo}/> : null}
                {<input onBlur={onblur} className={inputStyle} type={type} value={value} onChange={onChange}
                       onFocus={onfocus} disabled={disable}/>}
            </div>
            <span className={spanStyle}/>
        </div>
    );
};
