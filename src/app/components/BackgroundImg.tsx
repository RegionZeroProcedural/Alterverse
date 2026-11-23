import Image from 'next/image'
import neonMoon from '../../../public/NeonMoon.png'

export default function BackgroundImage() {
    return(
        <>
            <section className='hero z-0 relative'>
                <Image
                    src={neonMoon}
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className='background'
                />
            </section>
        </>
    )
}