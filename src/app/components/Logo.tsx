import Image from "next/image"
import logo from "../../../public/ALTERVERSE Logo.png"

export default function Logo() {
    return (
        <>
            <Image src={logo} alt='Alterverse Logo' width={400} className="mr-72 translate-y-[-1.5rem]"/>
        </>
    )
}