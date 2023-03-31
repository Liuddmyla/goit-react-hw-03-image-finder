import { RotatingLines } from 'react-loader-spinner';

export const Loader = () => {
    return (
        <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="500"
            visible={true}
       />     
    )
}

