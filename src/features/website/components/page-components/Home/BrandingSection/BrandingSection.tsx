// import { getDictionary } from "@/app/dictionaries";

export default function BrandingSection() {
  // const dict = await getDictionary(lang);
  return (
    <div className="container mx-auto px-4 md:px-0  flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="text-center ">
        <h2 className="text-2xl md:text-4xl text-text font- mb-4">
          {/* {dict.branding.title} */}
        </h2>
        {/* <p className="text-text/80 max-w-4xl">{dict.branding.description}</p> */}
      </div>
    </div>
  );
}
