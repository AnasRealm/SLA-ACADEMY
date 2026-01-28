import MainLayout from "../../../sheard/layout/MainLayout";
import About from "../componats/about/About";
import Categories from "../componats/categories/Categories";
import Hero from "../componats/hero/Hero";
import MostPopular from "../componats/MostPopular/MostPopular";

const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <MostPopular />
      <Categories />
      <About />
    </MainLayout>
  );
};
export default Home;
