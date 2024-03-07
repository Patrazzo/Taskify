import React from "react";
import Header from "../components/Navbar/Header/header.jsx";
import { Info } from "../components/Info/info.jsx";
import { Welcome } from "../components/Info/welcome.jsx";
import { TypedWords } from "../components/Info/typing.jsx";
import { Footer } from "../components/Navbar/Footer/footer.jsx";

const Home = () => {
  return (
    <div className="w-full h-auto">
      <Header />
      <Welcome />
      <TypedWords words={["Планирай.", "Действай.", "Постигай."]} />
      <Info
        heading="Защо Taskify?"
        description="Taskify е вашето решение
          за по-добро управление на времето и успешно постигане на целите.
          Независимо от вашата роля - студент, професионалист или човек търсещ
          оптимизация, Taskify ви предоставя интуитивни функции за ефективност и
          успех."
        imgSrc="/assets/addtasks.png"
      />
      <Info
        heading="Основни функции"
        description="Taskify предлага интуитивен подход за ефективно управление на вашите задачи. 
        С мощни функции и приятен дизайн, приложението ви помага да бъдете по-продуктивни в ежедневието."
        imgSrc="/assets/task.png"
        reverse="true"
      />
      <Info
        heading="Защо Taskify?"
        description="Taskify е вашето решение
          за по-добро управление на времето и успешно постигане на целите.
          Независимо от вашата роля - студент, професионалист или човек търсещ
          оптимизация, Taskify ви предоставя интуитивни функции за ефективност и
          успех."
        imgSrc="/assets/todolist.png"
      />
      <Footer />
    </div>
  );
};

export default Home;
