import React, { useState, useEffect } from "react";
import axios from "axios";
import AllocineCard from "./AllocineCard";
import "./allocine.css";
import logo from "./assets/allocine.png"
import chevron_left from "./assets/svg/chevron_left.svg";
import chevron_right from "./assets/svg/chevron_right.svg";
import double_arrow_left from "./assets/svg/double_arrow_left.svg";
import double_arrow_right from "./assets/svg/double_arrow_right.svg";
import gotop from "./assets/svg/north.svg";
import close from "./assets/svg/close.svg";

export default function AlloCine() {

    document.title = "Allocine";

    const url_upcoming = "https://api-allocine.herokuapp.com/api/movies/upcoming";
    const url_toprated = "https://api-allocine.herokuapp.com/api/movies/top_rated";
    const url_popular = "https://api-allocine.herokuapp.com/api/movies/popular";

    const [data, setData] = useState(null);
    const [pageCount, setPage] = useState(1);
    const [url, setUrl] = useState(url_popular);
    const modalItem = useState({ title: "test_spiderman", langage: "fr", note: "3.5", img: "", link: "" })[0];
    const [showModal, setShowModal] = useState(false);
    const [showGoToTop, setShowGoToTop] = useState(false);

    const fetchData = async (param) => {
        const response = await axios.get(param);
        setData(response.data.results);
    }

    function changeUrl(e) {
        // console.log(e.target.dataset.url);
        setUrl(e.target.dataset.url);
        setPage(1);
    }

    useEffect(() => {
        try {
            fetchData(url + "?p=" + pageCount);
        } catch (error) {
            console.log("network error: " + error);
        }
    }, [url, pageCount])

    function changePage(e) {
        const i = pageCount + Number(e.target.dataset.increment);

        if (i <= 0) {
            setPage(1);
        }
        else {
            setPage(i);
        }
    }

    function myfunc() {
        // console.log(modalItem);
        setShowModal(!showModal);
    }

    useEffect(() => {
        window.addEventListener("scroll", scrollCheck);
    },[])

    function scrollCheck(e) {
        const _currentScroll = document.documentElement.scrollTop;
        // console.log(_currentScroll);
        setShowGoToTop( () => _currentScroll > 600 ? true : false );
        // document.getElementById("go_to_top").classList.toggle("toggleGoTop", _currentScroll > 600 );
    }

    return (
        <div className="allocine-container">
            <div className="allocine-header">
                <div><img src={logo} alt="Allocine"></img></div><h1>Allocin&Eacute;</h1>
            </div>

            <div className="allocine-nav">
                <nav>
                    <ul className="allocine-nav-top">
                        <li style={{ backgroundColor: "white" }}>films</li>
                        <li>Séries</li>
                        <li>Trailers</li>
                        <li>Streaming</li>
                        <li>News</li>
                    </ul>
                    <ul className="allocine-nav-mid">
                        <li
                            className={url === url_popular ? "allocine-urlselected" : ""}
                            onClick={changeUrl} data-url={url_popular}>Populaire</li>
                        <li className={url === url_upcoming ? "allocine-urlselected" : ""}
                            onClick={changeUrl} data-url={url_upcoming}>Nouveautés</li>
                        <li
                            className={url === url_toprated ? "allocine-urlselected" : ""}
                            onClick={changeUrl} data-url={url_toprated}>Top Rating</li>
                    </ul>
                </nav>

                {pageNavigation()}
            </div>

            <div className="allocine-movies-container">
                {
                    data === null ? "" :

                        data.map(element => {
                            const [year, month, day] = element.release_date.split("-");
                            const date = day + "." + month + "." + year;
                            return <AllocineCard movie={element} date={date} modal={modalItem} myfunc={myfunc} />
                        })
                }
            </div>

            {pageNavigation()}
            {goTop()}
            {modal()}
        </div>
    );

    function modal() {
        return <div className={showModal === false ? "hidden" : "allocine-modal-container"}>
            <div className="allocine-modal">
                <div className="allocine-modal-close"><img src={close} alt="close" onClick={myfunc}></img></div>
                <h2>{modalItem.title}</h2>
                <div>Langage : {modalItem.langage}</div>
                <div>Note moyenne : {modalItem.note}</div>
                <div className="allocine-modal-imgcontainer"><img src={modalItem.img} alt={modalItem.title}></img></div>
                <div className="allocine-modal-link">Voir les séances disponibles</div>
            </div>
        </div>
    }

    function pageNavigation() {
        return <div className="allocine-nav-pages">
            <img src={double_arrow_left} alt="-10pages" className="allocine-nav-pages-chevron" onClick={changePage} data-increment="-10"></img>
            <img src={chevron_left} alt="-1page" className="allocine-nav-pages-chevron" onClick={changePage} data-increment="-1"></img>
            <span>{pageCount}</span>
            <img src={chevron_right} alt="+1page" className="allocine-nav-pages-chevron" onClick={changePage} data-increment="1"></img>
            <img src={double_arrow_right} alt="+10pages" className="allocine-nav-pages-chevron" onClick={changePage} data-increment="10"></img>
        </div>;
    }

    function goToTop(e) {
        document.documentElement.scrollTo(0, 0);
    }

    function goTop() {
        return <div className="allocine-gotop-container" style={{display: showGoToTop ? "flex" : "none" }}>
            <div className="allocine-gotop" onClick={goToTop}>
                <img src={gotop} alt="go to top"></img>
            </div>
        </div>;
    }
}