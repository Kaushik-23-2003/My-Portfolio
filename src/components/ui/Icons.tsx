import Image from "next/image";

const Github = () => (
  <Image
    src="https://img.icons8.com/?size=100&id=62856&format=png&color=ffffff"
    alt="GitHub Icon"
    width={32}
    height={32}
    unoptimized
  />
);

const ExternalLink = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-external-link size-8"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
};

const XMark = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-x"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const ArrowUpRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-arrow-up-right"
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const PlusIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);

const MinusIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
  </svg>
);



const Instagram = () => (
  <Image
    src="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000"
    alt="Instagram Icon"
    width={32}
    height={32}
    unoptimized
  />
);

const LinkedIn = () => (
  <Image
    src="https://img.icons8.com/?size=100&id=qNUNvR9aEWql&format=png&color=000000"
    alt="LinkedIn Icon"
    width={32}
    height={32}
    unoptimized
  />
);

const Twitter = () => ( 
  <Image
    src="https://img.icons8.com/?size=100&id=ClbD5JTFM7FA&format=png&color=000000"
    alt="X Icon"
    width={32}
    height={32}
    unoptimized
  />
);

const DownloadIcon = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"  viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
</svg>
);

export { Github, ExternalLink, XMark, ArrowUpRight, PlusIcon, MinusIcon, Instagram, LinkedIn, Twitter, DownloadIcon};
