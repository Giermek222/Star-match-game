
import MathUtils from './MathUtils';

const StarDisplay = ({stars}:any) => {
    return (
    <>
        {MathUtils.range(1,stars).map(star_id => <div className="star" key={star_id} />)} 
    </>
    );
}

export default StarDisplay;