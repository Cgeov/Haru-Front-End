import {BiLogoFacebookSquare} from "react-icons/bi"
import {FaTwitterSquare,FaInstagramSquare} from "react-icons/fa"

export default function Footer(){
    return(
        <div className="mt-20">
            <div className="h-[1px] w-[90%] mx-auto text-center py-[2px] rounded-md	bg-primary my-2"></div>
            <div className="flex flex-row gap-10 justify-center my-[20px]">
                <BiLogoFacebookSquare size={40} className="text-primary cursor-pointer"></BiLogoFacebookSquare>
                <FaInstagramSquare  size={40}  className="text-primary cursor-pointer"></FaInstagramSquare>
                <FaTwitterSquare  size={40}  className="text-primary cursor-pointer"></FaTwitterSquare>
            </div>
            <div className="text-primary text-center font-medium mb-[20px] text-lg">
                Copyright © {new Date().getFullYear()} All rights reserved | UDB
            </div>
        </div>
    )
}