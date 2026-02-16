import MainLayout from "../../../shared/layout/MainLayout";
import Categories from "../../categories/components/Categories";
import MostPopular from "../../MostPopular/components/MostPopular";
import About from "../componats/about/About";
import Hero from "../componats/hero/Hero";

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
