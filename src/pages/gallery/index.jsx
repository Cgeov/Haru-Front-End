import Layout from "../layout";
import React, { useState, useEffect } from "react";
import react from "react";

export default function Gallery(){
    const [flowers, setFlowers] = useState(null);
    const [loading, setLoading] = useState(true);
    const body = {
        collection: "products",
    };
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("GET", "POST", "OPTIONS");

    useEffect(() => {
        fetch("http://localhost:5000/service/getCollection", {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            collection: "products",
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setFlowers(data);
            setLoading(false);
            console.log(data);
          })
          .catch((error) => {
            setLoading(false);
          });
      }, []);
    
    return(
    <Layout>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="grid gap-4">
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_e5dbdb980d654b4eaa7cace9d08ec396~mv2.jpg/v1/fill/w_500,h_600,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9807d4_e5dbdb980d654b4eaa7cace9d08ec396~mv2.jpg" alt=""/>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_85ee71bb95c94fa2b665175b949d85a8~mv2.jpg/v1/fill/w_500,h_450,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9807d4_85ee71bb95c94fa2b665175b949d85a8~mv2.jpg" alt=""/>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_9e720061bdd749c2ba51b424a2375530~mv2.png/v1/fill/w_500,h_850,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9807d4_9e720061bdd749c2ba51b424a2375530~mv2.png" alt=""/>
            </div>
        </div>
        <div className="grid gap-4">
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_0237ac22219346d1a1d7a2a430727d92~mv2.png/v1/fill/w_450,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9807d4_0237ac22219346d1a1d7a2a430727d92~mv2.png" alt=""/>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_66a50d40ec014dbf9da79281ec88900d~mv2.png/v1/fill/w_450,h_650,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9807d4_66a50d40ec014dbf9da79281ec88900d~mv2.png" alt=""/>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_d1afe291c8504727ab860afea46371b7~mv2.jpg/v1/fill/w_450,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9807d4_d1afe291c8504727ab860afea46371b7~mv2.jpg" alt=""/>
            </div>
        </div>
        <div className="grid gap-4">
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_e1b7944152954a5883a312f18209f7ac~mv2.jpg/v1/fill/w_450,h_450,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9807d4_e1b7944152954a5883a312f18209f7ac~mv2.jpg" alt=""/>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_3492dd3fcac44b1799e55e3ff283fb57~mv2.png/v1/fill/w_450,h_900,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9807d4_3492dd3fcac44b1799e55e3ff283fb57~mv2.png" alt=""/>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_e20e72823d154779b5db9c54645834d2~mv2.jpg/v1/fill/w_450,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9807d4_e20e72823d154779b5db9c54645834d2~mv2.jpg" alt=""/>
            </div>
        </div>
        <div className="grid gap-4">
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_2c7e5daa800a4431904675ac9a1bb5b7~mv2.png/v1/fill/w_500,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9807d4_2c7e5daa800a4431904675ac9a1bb5b7~mv2.png" alt=""/>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_772f665fde8d4532a7a2e4075c4245b7~mv2.png/v1/fill/w_450,h_650,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9807d4_772f665fde8d4532a7a2e4075c4245b7~mv2.png" alt=""/>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_70b8a4e9209a4172916676aded8d2177~mv2.png/v1/fill/w_450,h_550,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9807d4_70b8a4e9209a4172916676aded8d2177~mv2.png" alt=""/>
            </div>
        </div>









        <div className="grid gap-4">
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_9470748b1c2842d1a1b3f57c990d82c4~mv2.jpg/v1/fill/w_500,h_600,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9807d4_9470748b1c2842d1a1b3f57c990d82c4~mv2.jpg" alt=""/>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_0012237bf0154328bfa1bbb1ce969e6a~mv2.jpg/v1/fill/w_500,h_450,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9807d4_0012237bf0154328bfa1bbb1ce969e6a~mv2.jpg" alt=""/>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_6eba284c22044b1bb5bc8eb04a5cb4d7~mv2.png/v1/fill/w_500,h_850,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9807d4_6eba284c22044b1bb5bc8eb04a5cb4d7~mv2.png" alt=""/>
            </div>
        </div>
        <div className="grid gap-4">
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_95ac20bc7d3745aeab60cf16cf0dfd17~mv2.png/v1/fill/w_450,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9807d4_95ac20bc7d3745aeab60cf16cf0dfd17~mv2.png" alt=""/>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_b454d8794732434485c85fac0fe78425~mv2.jpg/v1/fill/w_450,h_650,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9807d4_b454d8794732434485c85fac0fe78425~mv2.jpg" alt=""/>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_859e6902639e423b8e2ef0931ef30755~mv2.png/v1/fill/w_450,h_500,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9807d4_859e6902639e423b8e2ef0931ef30755~mv2.png" alt=""/>
            </div>
        </div>
        <div className="grid gap-4">
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_5655b20fcec24be286c3fc352cd72509~mv2.png/v1/fill/w_450,h_450,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9807d4_5655b20fcec24be286c3fc352cd72509~mv2.png" alt=""/>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_d2ed334bad314140a6eea6ea8ec62a6f~mv2.jpeg/v1/fill/w_450,h_900,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9807d4_d2ed334bad314140a6eea6ea8ec62a6f~mv2.jpeg" alt=""/>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_4dcb49a83aa14b9aa9efd5b1c15c48b5~mv2.jpg/v1/fill/w_450,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9807d4_4dcb49a83aa14b9aa9efd5b1c15c48b5~mv2.jpg" alt=""/>
            </div>
        </div>
        <div className="grid gap-4">
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_e4aeb295802e4b55b903e965dddd785a~mv2.jpg/v1/fill/w_500,h_600,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9807d4_e4aeb295802e4b55b903e965dddd785a~mv2.jpg" alt=""/>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_2876fdaa2197464d9e5bfbc341cf9ee2~mv2.png/v1/fill/w_450,h_650,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9807d4_2876fdaa2197464d9e5bfbc341cf9ee2~mv2.png" alt=""/>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://static.wixstatic.com/media/9807d4_02ed2a267ea2444a98f92490245d064e~mv2.jpg/v1/fill/w_450,h_550,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9807d4_02ed2a267ea2444a98f92490245d064e~mv2.jpg" alt=""/>
            </div>
        </div>
        </div>
        
    </Layout>
    )
}