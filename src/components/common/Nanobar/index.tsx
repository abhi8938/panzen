import React, {FunctionComponent, useState, useEffect} from 'react';
import './nanobar.css'
//@ts-ignore
import LoadingBar from "react-top-loading-bar";

type Props = {
    widthPercent?: number,
    loading: boolean
}
const Nanobar: FunctionComponent<Props> =
    ({
         widthPercent = 0,
         loading

     }) => {
        const [percent, setPercent] = useState(widthPercent);
        useEffect(() => {
            if (loading) {
               setPercent(10);
               setPercent(40);
               setPercent(80);
               setPercent(100);
            }
        }, [loading]);


        return <LoadingBar
            progress={percent}
            height={3}
            color="red"
            onLoaderFinished={() => setPercent(0)}
        />
    };

export default Nanobar;

