export default function SecondaryBtn() {
    return(
    <>
        <button className=" flex
                            flex-row
                            items-center
                            w-95
                            h-17
                            pl-13
                            mt-10
                            gap-5
                            relative
                            z-10
                            rounded-xl
                            heroSecondaryBtn
                            border-[0.125rem]
                            border-[var(--primaryBtnBorder)]
                            shadow-[0_0_1.25rem_var(--primaryBtnGlow)]
                            transition-all
                            duration-300
                            hover:-translate-y-[0.5rem]
                            cursor-pointer" >

            <div className="text-[1.15rem] font-bold text-gray-300 scale-y-95 text-shadow-[0_0_1.125rem_var(--primaryBtnGlow)]">
                EXPLORE THE EXCHANGE
            </div>
            <div className="text-[2.5rem] translate-y-[-0.3rem] text-gray-300 scale-x-70 text-shadow-[0_0_1.125rem_var(--primaryBtnGlow)]">→</div>
        </button>
    </>
    )
}