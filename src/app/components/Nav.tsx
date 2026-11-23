import Link from "next/link"

export default function Nav() {
    return (
        <>
        <div className="h-5 gap-16 pt-6 flex flex-row">
            <NavElement name = 'Discover' route = '/discover'/>
            <NavElement name = 'Auctions' route = '/auctions'/>
            <NavElement name = 'Exchange' route = '/exchange'/>
            <NavElement name = 'Studio' route = '/studio'/>
            <NavElement name = 'Creators' route = '/creators' />
        </div>
        </>
    )
}

interface NavElementProps {
    name: string,
    route: string
}

function NavElement({ name, route }: NavElementProps) {
    return(
        <>
            <div className="text-[1.4rem] text-gray-100 font-200  hover:translate-y-[-0.2rem] duration-300">
                <Link href={route} className="duration-300 hover:text-[#8274e0]">{name}</Link>
            </div>
        </>
    )
}