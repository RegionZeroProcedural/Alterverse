import Link from "next/link"

interface navProps {
    ariaLabel?: string;
    onNavigate?: () => void;
}

export default function Nav({ariaLabel = "Main navigation", onNavigate}: navProps) {
    return (
        <>
        <nav aria-label={ariaLabel} className="siteNav">
            <NavElement name = 'Discover' route = '/discover' onNavigate={onNavigate}/>
            <NavElement name = 'Auctions' route = '/auctions' onNavigate={onNavigate}/>
            <NavElement name = 'Exchange' route = '/exchange' onNavigate={onNavigate}/>
            <NavElement name = 'Studio' route = '/studio' onNavigate={onNavigate}/>
            <NavElement name = 'Creators' route = '/creators' onNavigate={onNavigate} />
        </nav>
        </>
    )
}

interface NavElementProps {
    name: string,
    route: string,
    onNavigate?: () => void
}

function NavElement({ name, route, onNavigate }: NavElementProps) {
    return(
        <>
            <div className="text-[1.4rem] text-gray-100 font-200  hover:translate-y-[-0.2rem] duration-300">
                <Link href={route} onClick={onNavigate} className="duration-300 hover:text-[#8274e0]">{name}</Link>
            </div>
        </>
    )
}
