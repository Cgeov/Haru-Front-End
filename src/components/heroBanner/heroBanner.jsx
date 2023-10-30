import { Slide } from "react-slideshow-image";

const images = [
    "https://firebasestorage.googleapis.com/v0/b/haru-c4c01.appspot.com/o/banners%2F1.png?alt=media&token=f0a702ed-7015-4f37-936a-9ab84f461ce5&_gl=1*91y67c*_ga*NTMwODYzNjQ4LjE2OTc0NzM2MzE.*_ga_CW55HF8NVT*MTY5ODYxNzc0NC42MC4xLjE2OTg2MzAwMDAuMS4wLjA.",
    "https://firebasestorage.googleapis.com/v0/b/haru-c4c01.appspot.com/o/banners%2F2.png?alt=media&token=4bde7c4e-8b53-40d1-949e-e028ed198d17&_gl=1*gqpr1o*_ga*NTMwODYzNjQ4LjE2OTc0NzM2MzE.*_ga_CW55HF8NVT*MTY5ODYxNzc0NC42MC4xLjE2OTg2MzAwMzIuMjkuMC4w",
    "https://firebasestorage.googleapis.com/v0/b/haru-c4c01.appspot.com/o/banners%2F3.png?alt=media&token=18aa2988-88eb-4801-abfa-d2864583c82a&_gl=1*1jx256x*_ga*NTMwODYzNjQ4LjE2OTc0NzM2MzE.*_ga_CW55HF8NVT*MTY5ODYxNzc0NC42MC4xLjE2OTg2MzAwNDIuMTkuMC4w",
    "https://firebasestorage.googleapis.com/v0/b/haru-c4c01.appspot.com/o/banners%2F4.png?alt=media&token=a9da0a5f-de9c-448e-b544-d4d852570060&_gl=1*1lsgaza*_ga*NTMwODYzNjQ4LjE2OTc0NzM2MzE.*_ga_CW55HF8NVT*MTY5ODYxNzc0NC42MC4xLjE2OTg2MzAwNTguMy4wLjA.",
    "https://firebasestorage.googleapis.com/v0/b/haru-c4c01.appspot.com/o/banners%2F5.png?alt=media&token=e19fb63b-a32d-4ab8-8b99-4792af5c3542&_gl=1*86atkr*_ga*NTMwODYzNjQ4LjE2OTc0NzM2MzE.*_ga_CW55HF8NVT*MTY5ODYxNzc0NC42MC4xLjE2OTg2MzAwNzEuNjAuMC4w"
]

export default function HeroBanner(){
    return(
        <div className="">
            <Slide infinite={true} canSwipe={false} arrows={false} autoplay={true} pauseOnHover={true} easing={"linear"} transitionDuration={1000} duration={5000}>
                <img width={'100%'} src={images[0]}></img>
                <img width={'100%'} src={images[1]}></img>
                <img width={'100%'} src={images[2]}></img>
                <img width={'100%'} src={images[3]}></img>
                <img width={'100%'} src={images[4]}></img>
            </Slide>
        </div>
    )
}