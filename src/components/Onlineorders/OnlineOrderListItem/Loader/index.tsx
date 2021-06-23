import React, {FunctionComponent} from 'react';
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {loaderBaseColor, loaderHighlightColor} from "../../../../constants/data";
import './loader.css';

type Props = {
  widths: Array<String>
};

const Loader: FunctionComponent<Props> =
    ({
       widths
     }) => {
      const loaderHolder: any = [];
      widths.map((el, index) => {
            const widthSecondDiv = index === 0? '60%':'100%';

            loaderHolder.push(
                <div style={{width: `${el}`}}>
                  {index == 0 ? <div>
                    <Skeleton duration={3} width={'60%'} height={'90%'} circle={true}/>
                  </div> : null}
                  <div style={{width: widthSecondDiv}}>
                    <Skeleton duration={3} width={'100%'} height={'90%'}/>
                  </div>
                </div>
            )
          }
      );
      return (
          <SkeletonTheme color={loaderBaseColor} highlightColor={loaderHighlightColor}>
            <div className={'OnlineOrder_loader'}>
              {loaderHolder}
            </div>
          </SkeletonTheme>
      );
    };

export default Loader;
