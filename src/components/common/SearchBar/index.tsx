import React, {FunctionComponent, createRef, useState, useEffect} from 'react';
import {search_icon} from '../../../Assets/reservation';
import './searchBar.css';
import cancel from '../../../Assets/cancel.svg';

type Props = {
    value?: string,
    onfocus?: () => void,
    onblur?: () => void,
    onChange?: (value: string) => void,
    width?: string,
    placeholder?: string,

};

const SearchBar: FunctionComponent<Props> =
    ({
         value,
         onblur,
         onfocus,
         onChange,
         width,
         placeholder
     }) => {
        let textInput: any = null;
        const [initialValue, setValue] = useState(placeholder);

        useEffect(() => {
            setValue(value);
        }, []);

        return (
            <div className={'searchBar_parent'} style={{width: width}}>
                <img src={search_icon} className={'searchBar_icon'} alt={'search'}/>
                <input ref={(input) => {
                    textInput = input
                }}
                       onBlur={onblur} className={'searchBar_input'}
                       type={'text'} value={value}
                       onChange={event => onChange !== undefined ? onChange(event.target.value) : null}
                       onFocus={onfocus}/>
                {value !== initialValue && value?.length !== 0 ?
                    <img src={cancel} className={'cancel_icon'} alt={'search'} onClick={() => {
                        if (onChange) {
                            onChange('')
                        }
                        textInput.blur()
                    }
                    }/> : null}
            </div>
        );
    };

export default SearchBar;
