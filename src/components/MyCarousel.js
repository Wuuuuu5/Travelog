import ReactMultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./MyCarousel.css";
import { Link } from "react-router-dom";
import slideanimation from "./Slideanimation";

function MyCarousel() {

  slideanimation(".carousel-wrapper .hidden");

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const imageStyle = {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    cursor: "pointer",
  };

  return (
    <>
      <div className="carousel-wrapper">
    <h2 className="hidden">You might like these</h2>
    <h3 className="hidden">More things to do in New Zealand</h3>
      </div>

      <div className="carousel-container">
        <ReactMultiCarousel
          swipeable
          draggable
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          keyBoardControl
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          <div className="carousel-card">
            <Link to="/services">
              <img src="images/img-1.jpg" alt="Slide 1" style={imageStyle} />
              <p className="carousel-text">Explore Auckland</p>
            </Link>
          </div>

          <div className="carousel-card">
            <Link to="/services">
              <img src="images/img-2.jpg" alt="Slide 2" style={imageStyle} />
              <p className="carousel-text">Visit Wellington</p>
            </Link>
          </div>

          <div className="carousel-card">
            <Link to="/services">
              <img src="images/img-3.jpg" alt="Slide 3" style={imageStyle} />
              <p className="carousel-text">Discover Queenstown</p>
            </Link>
          </div>

          <div className="carousel-card">
            <Link to="/services">
              <img src="images/img-4.jpg" alt="Slide 4" style={imageStyle} />
              <p className="carousel-text">Adventure in Rotorua</p>
            </Link>
          </div>

        </ReactMultiCarousel>
      </div>
    </>
  );
}

export default MyCarousel;