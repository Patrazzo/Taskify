import React from "react";
import Header from "../components/Navbar/header.jsx";
import { Info } from "../components/Info/info.jsx";
import { Welcome } from "../components/Info/welcome.jsx";
import { TypedWords } from "../components/Info/typing.jsx";
import { Footer } from "../components/Navbar/footer.jsx";
import { Fade } from "../components/Info/fade.jsx";
import { Quote } from "../components/Info/quote.jsx";
import { InfoDiv } from "../components/Info/infoDiv.jsx";
import { Card } from "../components/Info/Card.jsx";
import { SingleDiv } from "../components/Info/singleDiv.jsx";
const Home = () => {
  return (
    <div className="w-full h-auto">
      <Header />
      <Welcome />
      <TypedWords words={["Планирай.", "Действай.", "Постигай."]} />
      <div className="pt-44 pb-10 px-32 phone:px-3 bg-[#20e3b2] dark:bg-[#06beb6]">
        <div>
          <h1 className="text-6xl phone:text-5xl smallphone:text-4xl mb-20 text-taskify-lightBackground text-right drop-shadow">
            Увеличете вашата продуктивност <br /> с
            <span className=" bg-gradient-to-r dark:from-[#8e44ad] dark:via-[#D76D77] dark:to-[#c0392b] from-[#f2709c] to-[#ff9472] text-transparent bg-clip-text">
              Taskify
            </span>
            .
          </h1>
        </div>
      </div>
      <InfoDiv
        direction={"start"}
        color={"[#20e3b2]"}
        darkcolor={"[#06beb6]"}
        radius={"-r"}
      >
        <Card
          color={"taskify-lightElement"}
          darkColor={"taskify-lightBlue"}
          heading={"ИНТУИТИВЕН ДИЗАЙН"}
          description={"Това е текста който ще обясни с няколко думи"}
          buttonText={"Бутон4е"}
        />
        <Card
          color={"taskify-lightElement"}
          darkColor={"taskify-lightBlue"}
          heading={"ПИТАЙ ИВИ"}
          description={"Това е текста който ще обясни с няколко думи"}
          buttonText={"Бутон4е"}
        />
      </InfoDiv>
      <InfoDiv
        direction={"end"}
        color={"[#20e3b2]"}
        darkcolor={"[#06beb6]"}
        radius={"-l"}
      >
        <Card
          color={"taskify-lightElement"}
          darkColor={"taskify-lightBlue"}
          heading={"ПИТАЙ ИВИ"}
          description={"Това е текста който ще обясни с няколко думи"}
          buttonText={"Бутон4е"}
        />
        <Card
          color={"taskify-lightElement"}
          darkColor={"taskify-lightBlue"}
          heading={"ПИТАЙ ИВИ"}
          description={"Това е текста който ще обясни с няколко думи"}
          buttonText={"Бутон4е"}
        />
      </InfoDiv>
      <div className="pt-20 pb-10 px-32 phone:px-3 bg-[#20e3b2] dark:bg-[#06beb6]">
        <div className="flex flex-col justify-center items-center bg-[#20e3b2] dark:bg-[#06beb6] pb-10">
          <div className="mb-1 text-lg font-medium text-taskify-lightElement drop-shadow">
            Преди
          </div>
          <div className="w-5/6 bg-gray-200 rounded-full h-3 mb-4 dark:bg-gray-700">
            <div
              className={`bg-gradient-to-r dark:from-[#8e44ad] dark:via-[#D76D77] dark:to-[#c0392b] from-[#f2709c]  to-[#ff9472] h-3 rounded-full w-[30%] drop-shadow`}
            ></div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center bg-[#20e3b2] dark:bg-[#06beb6] pb-10">
          <div className="mb-1 text-lg font-medium text-taskify-lightElement drop-shadow">
            След
          </div>
          <div className="w-5/6 bg-gray-200 rounded-full h-3 mb-4 dark:bg-gray-700">
            <div
              className={`bg-gradient-to-r dark:from-[#8e44ad] dark:via-[#D76D77] dark:to-[#c0392b] from-[#f2709c]  to-[#ff9472] h-3 rounded-full w-[95%] drop-shadow`}
            ></div>
          </div>
        </div>
      </div>
      <Fade />
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
      <Quote
        quote={"Hi meeeeen"}
        author={"Petar Petrov"}
        who={"WebDeveloper"}
        image={"/assets/todolist.png"}
      />
      <InfoDiv
        direction={"center"}
        color={"taskify-lightBackground"}
        darkcolor={"taskify-DarkBlue"}
        radius={""}
      >
        <SingleDiv
          heading={"Заглавие зададено в home.jsx"}
          text={"Добави описание и заглавие"}
        />
      </InfoDiv>
      <Footer />
    </div>
  );
};

export default Home;
