
export default function PromotionBannerSection() {
  return (
    <div className="w-full relative h-48 md:h-64 px-2 md:px-0 lg:h-80 bg-secondary rounded-lg flex items-center justify-center">
      <img
        src="https://images.pexels.com/photos/29248399/pexels-photo-29248399.jpeg"
        alt="Promotional Banner"
        className="object-cover rounded-lg w-full h-full opacity-30"
      />
      <div className="absolute inset-0 bg-linear-to-t from-primary/15" />
      <h2 className="absolute z-50 text-xl md:text-4xl text-text font-bold text-center">
        Upgrade Your Ride with Our Exclusive Car Light Mods !
      </h2>
    </div>
  );
}
