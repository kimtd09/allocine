import "./allocinecard.css";
import star from "./assets/svg/star-solid.svg";

export default function AllocineCard(props) {

    const imgurl = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";

    const _star = <img className="allocine-card-star" src={star} alt="star"></img>;
    const _star_gray = <img className="allocine-card-star-gray" src={star} alt="star"></img>;
    const _rating = <div className="allocine-card-desc-rating">{props.movie.vote_average}/10</div>;
    // console.log(props);

    function showModal(e) {
        props.modal.title = props.movie.title;
        props.modal.langage = props.movie.original_language;
        props.modal.img = imgurl + props.movie.backdrop_path;
        props.modal.note = props.movie.vote_average;
        props.modal.show = true;
        props.myfunc();
    }

    return (
        <div className="allocine-card" onClick={showModal}>
            <div className="allocine-card-left">
                <img className="allocine-backdrop-img" src={imgurl + props.movie.backdrop_path} alt={props.movie.original_title}></img>
                <img className="allocine-card-main-img" src={imgurl + props.movie.poster_path} alt={props.movie.original_title}></img>
            </div>
            <div className="allocine-card-right">
                <div className="allocine-card-header">
                    <h2>{props.movie.title}</h2>
                    <div className="allocine-card-desc">
                        <div className="allocine-card-desc-left">
                            <span>Titre original : {props.movie.original_title}</span>
                            <span>Sortie : {props.date}</span>
                        </div>
                        <div className="allocine-card-desc-right">
                            <div>
                                {starRating()}                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="allocine-card-overview">
                    <div>
                        {props.movie.overview}
                    </div>
                </div>
            </div>
        </div>
    );

    function starRating() {

        const note = Math.round(props.movie.vote_average / 2);
        let div_jsx;

        if(note === 1) {
            
            div_jsx = <div>{_star}{_star_gray}{_star_gray}{_star_gray}{_star_gray}{_rating}</div>;
        }
        else if ( note === 2) {
            div_jsx = <div>{_star}{_star}{_star_gray}{_star_gray}{_star_gray}{_rating}</div>;
        }
        else if (note === 3) {
            div_jsx = <div>{_star}{_star}{_star}{_star_gray}{_star_gray}{_rating}</div>;
        }
        else if(note === 4) {
            div_jsx = <div>{_star}{_star}{_star}{_star}{_star_gray}{_rating}</div>;
        }
        else if(note === 5) {
            div_jsx = <div>{_star}{_star}{_star}{_star}{_star}{_rating}</div>;
        }

        return <div>{div_jsx}</div>;
    }
}