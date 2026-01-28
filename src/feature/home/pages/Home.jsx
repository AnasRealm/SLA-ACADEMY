import MainLayout from "../../../sheard/layout/MainLayout";
import About from "../componats/about/About";
import Categories from "../componats/categories/Categories";
import Hero from "../componats/hero/Hero";
import MostPopular from "../componats/MostPopular/MostPopular";

const Home = () => {
  return (
    <MainLayout>
      <div id="home">
        <Hero />
      </div>
      <div id="courses">
        <MostPopular />
      </div>
      <div id="categories">
        <Categories />
      </div>
      <div id="about">
        <About />
      </div>
    </MainLayout>
  );
};
export default Home;
