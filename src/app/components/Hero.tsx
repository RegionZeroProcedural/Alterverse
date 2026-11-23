import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";
import HeroCharacter from "./HeroCharacter";
import HeroActionCard from "./HeroActionCard";
import ThinDivider from "./ThinDivider";
import HeroEyebrow from "./HeroEyebrow";
import CharacterCarousel from "./CharacterCarousel";
import CharacterTag from "./CharacterTag";
import { characters } from "./CharacterCarousel";

export default function Hero() {

    return (
        <>
            <div className="absolute  pl-40 pt-45 w-full">
                <div className="absolute scale-200 translate-y-[-10rem] translate-x-[-40rem] inset-0 z-2 bg-[image:var(--heroShadow)] pointer-events-none" />
                <div className="absolute scale-200 translate-y-[-30rem] translate-x-[-65rem] inset-0 z-2 bg-[image:var(--heroShadow)] pointer-events-none" />
                <HeroEyebrow />
                <div className="text-[11rem] z-10 heroTitle relative overflow-visible w-[60dvw]">
                    BECOME<br/>THE LEGEND.
                </div>
                <div className="text-[1.7rem] z-10 relative heroSubtitle pt-6 translate-x-[-3.5rem]">
                    Discover extraordinary identites. Own their future.
                </div>
                <div className="flex flex-row gap-8">
                    <PrimaryBtn />
                    <SecondaryBtn />
                </div>
                <div className='max-w-[70dvw] relative translate-y-[-39.5rem] translate-x-[28.9rem]'>
                    <HeroCharacter />
                </div>
                <div className="absolute z-10 flex flex-row gap-4 translate-y-[-60rem]">
                    <HeroActionCard 
                        icon={1}
                        title='DISCOVER'
                        desc={<>Explore unique<br/>artist identities.</>}
                    />
                    <ThinDivider />
                    <HeroActionCard 
                        icon={2}
                        title='ACQUIRE'
                        desc={<>Bid, license, or<br/>own a character.</>}
                    />
                    <ThinDivider />
                    <HeroActionCard
                        icon={3} 
                        title='EVOLVE'
                        desc={<>Create, release, and<br/>build their legacy</>}
                    />
                </div>
                <div className="absolute scale-x-27 scale-y-100 translate-y-[-24rem] translate-x-[59.75rem] inset-0 z-2 bg-[image:var(--heroShadow)] pointer-events-none" />
                <div className="absolute right-5 top-1/2 -translate-y-[38rem] z-30">
                    <CharacterCarousel />
                </div>
                <CharacterTag character={characters[0]}/>
            </div>
        </>
    )
}