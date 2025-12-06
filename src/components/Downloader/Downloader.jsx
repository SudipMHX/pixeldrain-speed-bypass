import { useEffect, useState } from "react";
import { MdContentPaste, MdDownload } from "react-icons/md";

const Downloader = () => {
  const bypassURL = "https://pixeldrain.com/api/file";
  const [downloadLink, setDownloadLink] = useState("");
  const [url, setUrl] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [linkMessage, setLinkMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSpeedBypass = () => {
  setErrorMessage("");
  setLinkMessage("");
  setDownloadLink("");
  setIsLoading(true);

  // Support for all official PixelDrain domains & formats
  const pixelDrainRegex =
    /^https?:\/\/(www\.)?(pixeldrain\.com|pixeldra\.in)\/(u|l|file|api\/file)\/([a-zA-Z0-9]+)/;

  if (!url.trim()) {
    setIsLoading(false);
    return setErrorMessage("URL Is Empty");
  }

  const match = url.match(pixelDrainRegex);

  if (match) {
    const id = match[4]; // extracted ID

    setTimeout(() => {
      setLinkMessage("Download Link Is Ready");
      setDownloadLink(`${bypassURL}/${id}?download`);
      setIsLoading(false);
    }, 2000);
  } else {
    setIsLoading(false);
    setErrorMessage("Please Paste A Valid PixelDrain URL");
  }
};
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      document
        .getElementById("filled-basic-label")
        .setAttribute("data-shrink", "true");
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  useEffect(() => {
    let checkStatus = true;

    const detectDevTools = () => {
      if (checkStatus) return;

      const style =
        "background-color: red; color: white; font-size: 1rem; padding: 0.5rem";
      console.log("%cJust Close Developer Tools🤪", style);
      // debugger;
      setTimeout(detectDevTools, 100);
    };
    detectDevTools();

    return () => {
      checkStatus = true;
    };
  }, []);
  return (
    <>
      <div className='w-4/5 mx-auto'>
        {errorMessage && (
          <p className='bg-red-500 text-white p-1 font-semibold text-center rounded relative select-none'>
            {errorMessage}
            <span
              onClick={() => setErrorMessage("")}
              className='absolute -top-3 -right-2 bg-red-400 w-7 h-7 rounded-full cursor-pointer'>
              ╳
            </span>
          </p>
        )}
      </div>
      <div className='flex justify-center flex-col md:flex-row mb-0 gap-2 px-5'>
        <div className='flex items-center relative'>
          <label className='input validator w-full md:w-96 h-12 !outline-0'>
            <svg
              className='h-[1em] opacity-50'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'>
              <g
                strokeLinejoin='round'
                strokeLinecap='round'
                strokeWidth='2.5'
                fill='none'
                stroke='currentColor'>
                <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'></path>
                <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'></path>
              </g>
            </svg>
            <input
              type='url'
              required
              placeholder='https://'
              //   value='https://'
              //   pattern='^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              title='Must be valid URL'
            />
          </label>
          <span
            className='text-2xl absolute right-3 top-1/2 -translate-y-1/2'
            onClick={handlePaste}>
            <MdContentPaste />
          </span>
          {/* <p className='validator-hint'>Must be valid URL</p> */}
        </div>
        <button
          className='btn btn-outline bg-red-600 text-white border-0 h-12'
          onClick={handleSpeedBypass}>
          Speed Unlock
          {isLoading && (
            <>
              ing<span className='loading loading-bars '></span>
            </>
          )}
        </button>
      </div>
      <div className='w-full text-center px-5'>
        {linkMessage && (
          <p className='bg-base-200 p-1 md:px-20 rounded my-2 font-semibold'>
            {linkMessage}
          </p>
        )}
        {downloadLink && (
          <button className='btn btn-wide'>
            <span className='text-2xl'>
              <MdDownload />
            </span>
            <a href={downloadLink} className='!no-underline' target='_blank'>
              Download
            </a>
          </button>
        )}
      </div>
    </>
  );
};

export default Downloader;
