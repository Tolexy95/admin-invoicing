import Image from 'next/image';


export default function SearchBox() {
    return (
        <div className="relative flex items-center w-[341px] h-[46px]">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-[11px] h-[11px]">
                <Image 
                src="/Search Icon.png"
                alt="search"
                 width={11} 
                 height={11} />
            </div>
            <input
                type="text"
                placeholder="Search"
                className="w-full h-[44px] pl-[42px] pr-4 rounded-lg border-none outline-none bg-white shadow-[0_4px_12px_rgba(0,0,0,0.04)]
                   focus:ring-2 focus:ring-primary focus:ring-opacity-30"
            />
        </div>
    );
}
