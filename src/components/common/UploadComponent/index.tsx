import React, {FunctionComponent, useState, useEffect} from 'react';
import './uploadDocument.css';
import {upload_logo} from "../../../Assets/AllItems";
// @ts-ignore
import Resizer from 'react-image-file-resizer';

type Props = {
    inModal: boolean,
    onSelectImage: (image: string | ArrayBuffer | null) => void,
    image?: string,
    size?: number,
};

const UploadComponent: FunctionComponent<Props> =
    ({inModal, onSelectImage, image = upload_logo, size = 50}) => {
        const [pic, setPic] = useState(image);
        const style = inModal ? 'upload_component_Modal' : null;
        const [width, setWidth] = useState(size);
        const onChange = async (event: any) => {
            Resizer.imageFileResizer(
                event.target.files[0],
                300,
                280,
                'JPEG',
                100,
                0,
                (uri: any) => {
                    console.log('resized image', uri);
                    setWidth(270);
                    onSelectImage(uri);
                    setPic(uri);
                },
                'base64'
            );
        };

        useEffect(() => {
            if(inModal){
                setWidth(230);
            }
        }, []);

        return <div className={'upload_component ' + style}>
            <text>
                Upload new document
            </text>
            <div>
                <div>
                    <input
                        type="file"
                        name="itemImage"
                        className="custom-file-input"
                        onChange={event => onChange(event)}/>
                    <img src={pic} alt={'upload'} style={{width: `80%`, height: `70%`}}/>
                    <text>Drag your image or <a>Upload Manually</a></text>
                </div>
            </div>
        </div>;
    };

export default UploadComponent;
