import React from 'react';

type CustomButtonProps = {
    title: string,
    style: string
    onclick: (event: any) => any,
    disable?: boolean
}


export const CustomButton = ({title, style, onclick, disable}: CustomButtonProps) => {

    return (
        <button disabled={disable} className={style} onClick={onclick}>{title}</button>
    )
}
