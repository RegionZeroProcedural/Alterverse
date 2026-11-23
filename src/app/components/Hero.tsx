import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";
import HeroCharacter from "./HeroCharacter";
import HeroActionCard from "./HeroActionCard";
import HeroEyebrow from "./HeroEyebrow";
import CharacterCarousel from "./CharacterCarousel";
import CharacterTag from "./CharacterTag";
import { characters } from "./CharacterCarousel";

export default function Hero() {

    return (
        <>
            <section className="heroContent overflow-visible" aria-label="Discover Alterverse">
                <div className="heroCopy">
                    <HeroEyebrow />
                    <h1 className="heroTitle">
                        BECOME<br/>THE LEGEND.
                    </h1>
                    <p className="heroSubtitle">
                        Discover extraordinary identites. Own their future.
                    </p>
                    <div className="heroButtons flex flex-row gap-8">
                        <PrimaryBtn />
                        <SecondaryBtn />
                    </div>
                    <div className="heroFeatures">
                        <HeroActionCard
                            icon={1}
                            title='DISCOVER'
                            desc={<>Explore unique<br/>{" "}artist identities.</>}
                        />
                        <HeroActionCard
                            icon={2}
                            title='ACQUIRE'
                            desc={<>Bid, license, or<br/>{" "}own a character.</>}
                        />
                        <HeroActionCard
                            icon={3}
                            title='EVOLVE'
                            desc={<>Create, release, and<br/>{" "}build their legacy</>}
                        />
                    </div>
                </div>
                <div className="heroArtwork">
                    <HeroCharacter />
                </div>
                <div className="heroSelector">
                    <CharacterCarousel />
                </div>
                <CharacterTag character={characters[0]}/>
            </section>
        </>
    )
}
