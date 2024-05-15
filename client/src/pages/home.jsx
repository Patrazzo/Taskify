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
import { Button } from "../components/Button/button.jsx";
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
          description={
            "Taskify разполага с интуитивен и лесен за употреба интерфейс, който осигурява възможност за употреба на хора от всякакви възрасти!"
          }
          buttonText={"ПРОВЕРИ"}
        />
        <Card
          color={"taskify-lightElement"}
          darkColor={"taskify-lightBlue"}
          heading={"СПЕСТЯВАНЕ НА ВРЕМЕ"}
          description={
            "С Taskify получавате възможността да разпределяте задачите си бързо и лесно като по този начин осигурите време за Вас и близките ви!"
          }
          buttonText={"ПРОВЕРИ"}
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
          heading={"СИГУРНОСТ И ЗАЩИТА"}
          description={
            "Вашите данни - защитени от хеширана парола и удостоверяване, осигурено от уникален ключ, наречен token."
          }
          buttonText={"ПРОВЕРИ"}
        />
        <Card
          color={"taskify-lightElement"}
          darkColor={"taskify-lightBlue"}
          heading={"ИНОВАТИВНОСТ"}
          description={
            "Taskify е изграден с помощта на съвременни и иновативни технологии, подобряващи всеки аспект от приложението."
          }
          buttonText={"ПРОВЕРИ"}
        />
      </InfoDiv>
      <div className="pt-20 pb-10 px-32 phone:px-3 bg-[#20e3b2] dark:bg-[#06beb6]">
        <div className="flex flex-col justify-center items-center bg-[#20e3b2] dark:bg-[#06beb6] pb-10">
          <div className="mb-1 text-lg font-medium dark:text-taskify-lightBackground text-taskify-textLightDarkColor drop-shadow">
            Продуктивността Ви преди Taskify
          </div>
          <div className="w-5/6 bg-gray-200 rounded-full h-3 mb-4 dark:bg-gray-700">
            <div
              className={`bg-gradient-to-r dark:from-[#8e44ad] dark:via-[#D76D77] dark:to-[#c0392b] from-[#f2709c]  to-[#ff9472] h-3 rounded-full w-[30%] drop-shadow`}
            ></div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center bg-[#20e3b2] dark:bg-[#06beb6] pb-10">
          <div className="mb-1 text-lg font-medium dark:text-taskify-lightBackground text-taskify-textLightDarkColor drop-shadow">
            Продуктивността Ви след Taskify
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
        description="Taskify е решението
          за по-добро управление на времето и успешно постигане на целите.
          Независимо от вашата роля - студент, професионалист или човек търсещ
          оптимизация, Taskify ви предоставя интуитивни функции за ефективност и
          успех."
        imgSrc="/assets/addtasks.png"
      />
      <Info
        heading="Основни функции"
        description="Taskify предлага лесен подход за ефективно управление на вашите задачи. 
        С мощни функции и приятен дизайн, приложението ви помага да бъдете по-продуктивни в ежедневието.
        Като можете да добавяте, променяте и триете задачите си бързо и лесно."
        imgSrc="/assets/task.png"
        reverse="true"
      />
      <Info
        heading="Каква е нашата цел??"
        description="Taskify имаме за цел да помогнем на нашите потребители
        да организират своето време и да постигат своите цели с лекота. Целим се в това
        да ви направим по-продуктивни и ефективни."
        imgSrc="/assets/Question.png"
      />
      <Quote
        quote="Благодарение на него, успешно разработих това приложение. 
        Използвах Taskify за записване на бъговете и задачи, което ми помогна
        да визуализирам и реализирам идеите си по-ефективно и удобно."
        author={"Petar Petrov"}
        who={"Създател на Taskify"}
        image={"/assets/todolist.png"}
      />
      <div className="w-full dark:bg-taskify-DarkBlue bg-taskify-lightBackground flex justify-center items-center p-10 pt-0">
        <Button
          redirect={true}
          pathToLocation={"/dashboard"}
          name={"ИЗПРОБВАЙ"}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
