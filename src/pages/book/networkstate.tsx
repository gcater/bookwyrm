export default function NetworkState() {
  return (
    <div className="m-0 flex flex-grow flex-col p-0 sm:ml-[90px] sm:pl-[250px] sm:pr-[10px]">
      <div className="hidden w-full flex-col border-b border-gray-300 pb-6 sm:flex">
        <div className="font-suisse mb-3 text-lg font-bold text-gray-700">
          Description
        </div>
        <div className="text-gray-700">
          Technology has enabled us to start new companies, new communities, and
          new currencies. But can we use it to start new cities, or even new
          countries? This book explains how to build the successor to the nation
          state, a concept we call the network state.
        </div>
      </div>

      <div className="pointer-events-auto flex w-full flex-col last:pb-16">
        <div className="flex w-full flex-col rounded-xl border border-gray-300">
          <div className="border-b border-gray-300 last:border-none">
            {/* <Link href="/index">
              <Link href="/index"> */}
            <div className="font-suisse mb-4 mt-[18px] flex cursor-pointer text-[15px] font-bold leading-6 text-black no-underline sm:text-lg">
              1. Quickstart
              <div className="clear-button-styles ml-3 box-content h-6 rounded-full border border-solid border-gray-300 p-0 hover:bg-gray-50"></div>
            </div>
            {/* </Link> */}
            <div className="font-inter m-0 box-border flex w-full cursor-pointer flex-row items-center px-3 py-2 text-sm text-black no-underline first:rounded-t-xl last:rounded-b-xl hover:bg-gray-50 active:bg-gray-100">
              <div className="clear-button-styles mr-4 rounded-full border border-solid border-gray-300 p-0"></div>
              Preamble
            </div>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
