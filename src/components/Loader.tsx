import "./loader.css";

type LoaderProps = {
  fadeOut?: boolean;
};

export default function Loader({ fadeOut = false }: LoaderProps) {
  return (
    <div className={`fixed inset-0 bg-[#0f0f0f] flex flex-col items-center justify-center z-9999 transition-opacity duration-700 ease-out ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      <div className="flex items-center gap-3">
        <span className="w-5 h-5 rounded-full bg-orange-500 shadow-[0_0_20px_#ff8a00] animate-bounce [animation-delay:0s]"></span>

        <span className="w-5 h-5 rounded-full bg-orange-500 shadow-[0_0_20px_#ff8a00] animate-bounce [animation-delay:200ms]"></span>

        <span className="w-5 h-5 rounded-full bg-orange-500 shadow-[0_0_20px_#ff8a00] animate-bounce [animation-delay:400ms]"></span>
      </div>


      <p className="mt-6 text-gray-400 font-inter text-sm tracking-[8px]">
        LOADING
      </p>

    </div>
  );
}