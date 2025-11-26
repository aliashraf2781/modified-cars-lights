import HeroSection from "../components/common/HeroSection/HeroSection";
import BrandingSection from "../components/page-components/Home/BrandingSection/BrandingSection";
import PromotionBannerSection from "../components/page-components/Home/PromotionBannerSection/PromotionBannerSection";
import ShoppingSection from "../components/page-components/Home/ShoppingSection/ShoppingSection";

export default  function Home() {
    const lang = "ar"
    return (
        <div className="flex flex-col gap-8 md:gap-15">
            {/* Hero Section */}
            <HeroSection />
            {/* Branding Section */}
            <BrandingSection />
            {/* Promotion */}
            <PromotionBannerSection />
            {/* Cars Types */}
            <ShoppingSection lang={lang} />
        </div>
    );
}
