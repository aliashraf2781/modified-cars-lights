// import { getDictionary } from "@/app/dictionaries";

export default function BrandingSection() {
  // const dict = await getDictionary(lang);
  return (
    <div className="container mx-auto px-4 md:px-0  flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="text-center ">
        <h2 className="text-2xl md:text-4xl text-text font- mb-4">
          Mod Your Ride - Unleash Your Car's True Potential!
        </h2>
        <p className="text-text/80 max-w-4xl">
          At Mod Your Ride, we specialize in transforming ordinary vehicles
          into extraordinary rides. Whether you're looking to enhance your car's
          aesthetics, boost performance, or upgrade your lighting system, we've
          got you covered. Our expert team is dedicated to providing top-notch
          car light modifications that not only improve visibility but also add a
          touch of style to your vehicle. Join us on a journey to customize and
          elevate your driving experience like never before!
        </p>
      </div>
    </div>
  );
}
