import Slider from "react-slick"
import './styleCarousel.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoMdCloseCircleOutline } from "react-icons/io";


const CarouselCard = ({imgCarousel, setDisplayCarousel}) => {       
    var settings = {
        dots: true,
        infinite: true,
        speed: 250,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };    
    return(
        <div className='containerCarousel'>                        
            <Slider {...settings} className='carousel'>   
                            
                {
                    imgCarousel.map((img, index)=>(      
                        <div className='contentCarousel'>
                            <img src={img.url} alt='Imagem' key={index}/>  
                            <IoMdCloseCircleOutline className='icon' onClick={()=>setDisplayCarousel(false)}/>
                        </div>                  
                    ))
                }
            </Slider>
        </div>
    )
    
}


export default CarouselCard