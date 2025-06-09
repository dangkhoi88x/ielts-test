import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReadingAnswers from "../../../hooks/Cambridge_15/Test_1/ReadingAnswers";
import "./Reading_test1.css";

const Reading_test1 = () => {
  // Đếm ngược thời gian (40 phút)
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 2400 giây
  const [isRunning, setIsRunning] = useState(true);
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState(false); // Hiển thị bảng kết quả
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [bandScore, setBandScore] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // Trạng thái đã nộp bài

  // Lấy dữ liệu từ Firestore (Reading)
  const { answers, isLoading } = ReadingAnswers(
    "Cambridge_15",
    "TEST_1",
    "READING"
  );

  // Khởi tạo trạng thái
  const [userAnswers, setUserAnswers] = useState(Array(40).fill(""));
  const [result, setResult] = useState(Array(40).fill(null));

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  // Format thời gian còn lại
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Khi nhập dữ liệu
  const handleChange = (index, value) => {
    setUserAnswers((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[index] = value;
      return updatedAnswers;
    });
  };

  const getIELTSBand = (score) => {
    if (score >= 39) return 9.0;
    if (score >= 37) return 8.5;
    if (score >= 35) return 8.0;
    if (score >= 32) return 7.5;
    if (score >= 30) return 7.0;
    if (score >= 26) return 6.5;
    if (score >= 23) return 6.0;
    if (score >= 18) return 5.5;
    if (score >= 16) return 5.0;
    if (score >= 13) return 4.5;
    if (score >= 10) return 4.0;
    if (score >= 7) return 3.5;
    if (score >= 5) return 3.0;
    if (score >= 3) return 2.5;
    return 2.0;
  };

  const checkAnswers = () => {
    if (isLoading || !answers) {
      alert("Dữ liệu chưa tải xong. Vui lòng thử lại.");
      return;
    }
    setIsRunning(false);
    setIsSubmitted(true);

    const allCorrectAnswers = [
      ...(answers.PART_1 || []),
      ...(answers.PART_2 || []),
      ...(answers.PART_3 || []),
      ...(answers.PART_4 || []),
    ];
    console.log("✅ Correct Answers from Firestore:", allCorrectAnswers);

    let correct = 0;
    let wrong = 0;

    const updatedResults = userAnswers.map((answer, index) => {
      const userAnswer = answer.trim().toLowerCase();
      const correctAnswer = allCorrectAnswers[index];
      if (userAnswer === "") return "❌";

      if (!correctAnswer) {
        wrong++;
        return "❌";
      }
      let isCorrect = false;
      if (Array.isArray(correctAnswer)) {
        isCorrect = correctAnswer.some(
          (ans) => ans.trim().toLowerCase() === userAnswer
        );
      } else if (typeof correctAnswer === "string") {
        const validAnswers = correctAnswer
          .split("/")
          .map((ans) => ans.trim().toLowerCase());
        isCorrect = validAnswers.includes(userAnswer);
      }

      if (isCorrect) {
        correct++;
        return "✅";
      } else {
        wrong++;
        return "❌";
      }
    });

    setCorrectCount(correct);
    setWrongCount(wrong);
    setResult(updatedResults);
    setBandScore(getIELTSBand(correct));
    setShowResult(true);
  };

  return (
    <div className="reading-wrapper">
      <div className="container-reading">
        <div className="reading-container">
          <div className="reading-left">
            <h2>READING PASSAGE 1</h2>
            <p>
              You should spend about 20 minutes on Questions 1–13, which are
              based on Reading Passage 1 below.
            </p>
            <h3>Nutmeg – a valuable spice</h3>
            <p>
              Nutmeg - a valuable spice The nutmeg tree, Myristica fragrans, is
              a large evergreen tree native to Southeast Asia. Until the late
              18th century, it only grew in one place in the world: a small
              group of islands in the Banda Sea, part of the Moluccas - or Spice
              Islands - in northeastern Indonesia. The tree is thickly branched
              with dense foliage of tough, dark green oval leaves, and produces
              small, yellow, bell-shaped flowers and pale yellow pear-shaped
              fruits. The fruit is encased in a fleshy husk. When the fruit is
              ripe, this husk splits into two halves along a ridge running the
              length of the fruit. Inside is a purple-brown shiny seed, 2-3 cm
              long by about 2 cm across, surrounded by a lacy red or crimson
              covering called an 'aril'. These are the sources of the two spices
              nutmeg and mace, the former being produced from the dried seed and
              the latter from the aril. Nutmeg was a highly prized and costly
              ingredient in European cuisine in the Middle Ages, and was used as
              a flavouring, medicinal, and preservative agent. Throughout this
              period, the Arabs were the exclusive importers of the spice to
              Europe. They sold nutmeg for high prices to merchants based in
              Venice, but they never revealed the exact location of the source
              of this extremely valuable commodity. The Arab-Venetian dominance
              of the trade finally ended in 1512, when the Portuguese reached
              the Banda Islands and began exploiting its precious resources.
              Always in danger of competition from neighbouring Spain, the
              Portuguese began subcontracting their spice distribution to Dutch
              traders. Profits began to flow into the Netherlands, and the Dutch
              commercial fleet swiftly grew into one of the largest in the
              world. The Dutch quietly gained control of most of the shipping
              and trading of spices in Northern Europe. Then, in 1580, Portugal
              fell under Spanish rule, and by the end of the 16th century the
              Dutch found themselves locked out of the market. As prices for
              pepper, nutmeg, and other spices soared across Europe, they
              decided to fight back. In 1602, Dutch merchants founded the VOC, a
              trading corporation better known as the Dutch East India Company.
              By 1617, the VOC was the richest commercial operation in the
              world. The company had 50,000 employees worldwide, with a private
              army of 30,000 men and a fleet of 200 ships. At the same time,
              thousands of people across Europe were dying of the plague, a
              highly contagious and deadly disease. Doctors were desperate for a
              way to stop the spread of this disease, and they decided nutmeg
              held the cure. Everybody wanted nutmeg, and many were willing to
              spare no expense to have it. Nutmeg bought for a few pennies in
              Indonesia could be sold for 68,000 times its original cost on the
              streets of London. The only problem was the short supply. And
              that's where the Dutch found their opportunity. The Banda Islands
              were ruled by local sultans who insisted on maintaining a neutral
              trading policy towards foreign powers. This allowed them to avoid
              the presence of Portuguese or Spanish troops on their soil, but it
              also left them unprotected from other invaders. In 1621, the Dutch
              arrived and took over. Once securely in control of the Bandas, the
              Dutch went to work protecting their new investment. They
              concentrated all nutmeg production into a few easily guarded
              areas, uprooting and destroying any trees outside the plantation
              zones. Anyone caught growing a nutmeg seedling or carrying seeds
              without the proper authority was severely punished. In addition,
              all exported nutmeg was covered with lime to make sure there was
              no chance a fertile seed which could be grown elsewhere would
              leave the islands. There was only one obstacle to Dutch
              domination. One of the Banda Islands, a sliver of land called Run,
              only 3 km long by less than 1 km wide, was under the control of
              the British. After decades of fighting for control of this tiny
              island, the Dutch and British arrived at a compromise settlement,
              the Treaty of Breda, in 1667. Intent on securing their hold over
              every nutmeg-producing island, the Dutch offered a trade: if the
              British would give them the island of Run, they would in turn give
              Britain a distant and much less valuable island in North America.
              The British agreed. That other island was Manhattan, which is how
              New Amsterdam became New York. The Dutch now had a monopoly over
              the nutmeg trade which would last for another century. Then, in
              1770, a Frenchman named Pierre Poivre successfully smuggled nutmeg
              plants to safety in Mauritius, an island off the coast of Africa.
              Some of these were later exported to the Caribbean where they
              thrived, especially on the island of Grenada. Next, in 1778, a
              volcanic eruption in the Banda region caused a tsunami that wiped
              out half the nutmeg groves. Finally, in 1809, the British returned
              to Indonesia and seized the Banda Islands by force. They returned
              the islands to the Dutch in 1817, but not before transplanting
              hundreds of nutmeg seedlings to plantations in several locations
              across southern Asia. The Dutch nutmeg monopoly was over. Today,
              nutmeg is grown in Indonesia, the Caribbean, India, Malaysia,
              Papua New Guinea and Sri Lanka, and world nutmeg production is
              estimated to average between 10,000 and 12,000 tonnes per year.
            </p>
          </div>

          <div className="questions-right">
            <h3>Questions 1-4</h3>
            <p>
              Complete the notes below.
              <br />
              Choose{" "}
              <em>
                <strong> ONE WORD ONLY </strong>
              </em>
              from the passage for each answer. Write your answers in boxes 1-4
              on your answer sheet.
            </p>
            <h3>The nutmeg tree and fruit</h3>
            <ul>
              <li>
                • the leaves of the tree are <strong> 1 ...........</strong> in
                shape
              </li>
              <li>
                • the <strong> 2 ...........</strong> is ripe surrounds the
                fruit and breaks open when the fruit
              </li>
              <li>
                • the <strong> 3 ...........</strong> is used to produce the
                spice nutmeg
              </li>
              <li>
                • the covering known as the aril is used to produce{" "}
                <strong> 4 ...........</strong>
              </li>
            </ul>
            <div className="question-list">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 1}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 0]}
                    onChange={(e) => handleChange(index + 0, e.target.value)}
                  />
                  <span className="result">{result[index + 0]}</span>{" "}
                </div>
              ))}
            </div>
            <br />
            <h3>Questions 5-7</h3>
            <p>
              Do the following statements agree with the information given in
              Reading Passage 1?
              <br />
              In boxes 5-7 on your answer sheet, write
              <br /> <strong>TRUE</strong> if the statement agrees with the
              information
              <br /> <strong>FALSE</strong> if the statement contradicts the
              information
              <br />
              <strong>NOT GIVEN</strong> if there is no information on this
            </p>
            <ul>
              <li>
                <strong>5 </strong> In the Middle Ages, most Europeans knew
                where nutmeg was grown.
              </li>
              <li>
                <strong> 6 </strong> The VOC was the world's first major trading
                company.
              </li>
              <li>
                <strong> 7 </strong> Following the Treaty of Breda, the Dutch
                had control of all the islands where nutmeg grew.
              </li>
            </ul>
            <div className="question-list">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 5}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 4]}
                    onChange={(e) => handleChange(index + 4, e.target.value)}
                  />
                  <span className="result">{result[index + 4]}</span>{" "}
                </div>
              ))}
            </div>
            <h3>Questions 8–13</h3>
            <p>
              <em>Complete the table below.</em>
            </p>
            <p>
              <strong>Choose ONE WORD ONLY</strong> from the passage for each
              answer.
            </p>
            <table className="answer-table">
              <thead>
                <tr>
                  <th>Time Period</th>
                  <th>Event</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    period: "Middle Ages",
                    question: (
                      <>
                        Nutmeg was brought to Europe by the{" "}
                        <strong>8 ............</strong>
                      </>
                    ),
                  },

                  {
                    period: "16th century",
                    question:
                      "European nations took control of the nutmeg trade",
                  },
                  {
                    period: "17th century",
                    question: (
                      <>
                        Disease known as the <strong>9 ............</strong>
                      </>
                    ),
                  },
                  {
                    period: "17th century",
                    question: (
                      <>
                        Put <strong> 10 ............</strong> on nutmeg to avoid
                        it being cultivated outside the islands
                      </>
                    ),
                  },
                  {
                    period: "17th century",
                    question: (
                      <>
                        Finally obtained the island of{" "}
                        <strong> 11 ............</strong> from the British Put{" "}
                      </>
                    ),
                  },
                  {
                    period: "Late 18th century",
                    question: (
                      <>
                        1770 – nutmeg plants were secretly taken to{" "}
                        <strong> 12 ............</strong>
                      </>
                    ),
                  },
                  {
                    period: "Late 18th century",
                    question: (
                      <>
                        1778 – Half the nutmeg plantations were destroyed by a{" "}
                        <strong> 13 ............</strong>
                      </>
                    ),
                  },
                ].map((item, index) => (
                  <tr key={index}>
                    <td>{item.period}</td>
                    <td>{item.question}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <div className="question-list">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 8}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 7]}
                    onChange={(e) => handleChange(index + 7, e.target.value)}
                  />
                  <span className="result">{result[index + 7]}</span>{" "}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reading-container">
          <div className="reading-left">
            <h2>READING PASSAGE 2</h2>
            <p>
              <i>You should spend about 20 minutes on Questions 14–26.</i>
            </p>
            <h3>Driverless cars</h3>
            <p>
              <b>A</b> The automotive sector is well used to adapting to
              automation in manufacturing. The implementation of robotic car
              manufacture from the 1970s onwards led to significant cost savings
              and improvements in the reliability and flexibility of vehicle
              mass production. A new challenge to vehicle production is now on
              the horizon and, again, it comes from automation. However, this
              time it is not to do with the manufacturing process, but with the
              vehicles themselves.
            </p>
            <p>
              Research projects on vehicle automation are not new. Vehicles with
              limited self-driving capabilities have been around for more than
              50 years, resulting in significant contributions towards driver
              assistance systems. But since Google announced in 2010 that it had
              been trialling self-driving cars on the streets of California,
              progress in this field has quickly gathered pace.
            </p>
            <p>
              <b>B</b> There are many reasons why technology is advancing so
              fast. One frequently cited motive is safety; indeed, research at
              the UK’s Transport Research Laboratory has demonstrated that more
              than 90 percent of road collisions involve human error as a
              contributory factor, and it is the primary cause in the vast
              majority. Automation may help to reduce the incidence of this.
            </p>
            <p>
              Another aim is to free the time people spend driving for other
              purposes. If the vehicle can do some or all of the driving, it may
              be possible to be productive, to socialise or simply to relax
              while automation systems have responsibility for safe control of
              the vehicle. If the vehicle can do the driving, those who are
              challenged by existing mobility models – such as older or disabled
              travellers – may be able to enjoy significantly greater travel
              autonomy.
            </p>
            <p>
              <b>C</b> Beyond these direct benefits, we can consider the wider
              implications for transport and society, and how manufacturing
              processes might need to respond as a result. At present, the
              average car spends more than 90 percent of its life parked.
              Automation means that initiatives for car-sharing become much more
              viable, particularly in urban areas with significant travel
              demand. If a significant proportion of the population choose to
              use shared automated vehicles, mobility demand can be met by far
              fewer vehicles.
            </p>
            <p>
              <b>D</b> The Massachusetts Institute of Technology investigated
              automated mobility in Singapore, finding that fewer than 30
              percent of the vehicles currently used would be required if fully
              automated car sharing could be implemented. If this is the case,
              it might mean that we need to manufacture far fewer vehicles to
              meet demand.
            </p>
            <p>
              However, the number of trips being taken would probably increase,
              partly because empty vehicles would have to be moved from one
              customer to the next. Modelling work by the University of Michigan
              Transportation Research Institute suggests automated vehicles
              might reduce vehicle ownership by 43 percent, but that vehicles'
              average annual mileage would double as a result. As a consequence,
              each vehicle would be used more intensively, and might need
              replacing sooner. This faster rate of turnover may mean that
              vehicle production will not necessarily decrease.
            </p>
            <p>
              <b>E</b> Automation may prompt other changes in vehicle
              manufacture. If we move to a model where consumers are tending not
              to own a single vehicle but to purchase access to a range of
              vehicles through a mobility provider, drivers will have the
              freedom to select one that best suits their needs for a particular
              journey, rather than making a compromise across all their
              requirements. Since, for most of the time, most of the seats in
              most cars are unoccupied, this may boost production of a smaller,
              more efficient range of vehicles that suit the needs of
              individuals. Specialised vehicles may then be available for
              exceptional journeys, such as going on a family camping trip or
              helping a son or daughter move to university.
            </p>
            <p>
              <b>F</b> There are a number of hurdles to overcome in delivering
              automated vehicles to our roads. These include the technical
              difficulties in ensuring that the vehicle works reliably in the
              infinite range of traffic, weather and road situations it might
              encounter; the regulatory challenges in understanding how
              liability and enforcement might change when drivers are no longer
              essential for vehicle operation; and the societal changes that may
              be required for communities to trust and accept automated vehicles
              as being a valuable part of the mobility landscape.
            </p>
            <p>
              <b>G</b> It's clear that there are many challenges that need to be
              addressed but, through robust and targeted research, these can
              most probably be conquered within the next 10 years. Mobility will
              change in such potentially significant ways and in association
              with so many other technological developments, such as
              telepresence and virtual reality, that it is hard to make concrete
              predictions about the future. However, one thing is certain:
              change is coming, and the need to be flexible in response to this
              will be vital for those involved in manufacturing the vehicles
              that will deliver future mobility.
            </p>
          </div>

          {/* Phần câu hỏi (Bên phải) */}
          <div className="questions-right">
            <h3>Questions 14-18</h3>
            <p>
              Reading Passage 2 has seven sections, <strong>A-G.</strong> <br />
              Which section contains the following information? <br />
              Write the correct letter, <strong>A-G</strong>, in boxes 14-18 on
              your answer sheet.
              <br />
            </p>
            <ul>
              <li>
                • <strong> 14 </strong>
                reference to the amount of time when a car is not in use
              </li>
              <li>
                • <strong> 15 </strong>
                mention of several advantages of driverless vehicles for
                individual road-users
              </li>
              <li>
                • <strong> 16 </strong>
                reference to the opportunity of choosing the most appropriate
                vehicle for each trip
              </li>
              <li>
                • <strong> 17 </strong>
                an estimate of how long it will take to overcome a number of
                problems
              </li>
              <li>
                • <strong> 18 </strong>a suggestion that the use of driverless
                cars may have no effect on the number of vehicles manufactured
              </li>
            </ul>
            <br />
            <div className="question-list">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 14}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 13]}
                    onChange={(e) => handleChange(index + 13, e.target.value)}
                  />
                  <span className="result">{result[index + 13]}</span>{" "}
                </div>
              ))}
            </div>

            <h3>Questions 19-22</h3>
            <p>
              Complete the summary below.
              <br />
              In boxes 5-7 on your answer sheet, write
              <br /> Choose <strong>NO MORE THAN TWO WORDS </strong>
              from the passage for each answer.
              <br /> Write your answers in boxes 19-22 on your answer sheet.
              <br />
            </p>
            <br />
            <ul>
              <h4>The impact of driverless cars</h4>
              <li>
                {" "}
                Figures from the Transport Research Laboratory indicate that
                most motor accidents are partly due to{" "}
                <strong> 19 ......... </strong> so the introduction of
                driverless vehicles will result in greater safety. In addition
                to the direct benefits of automation, it may bring other
                advantages. For example, schemes for{" "}
                <strong> 20 ......... </strong> will be more workable,
                especially in towns and cities, resulting in fewer cars on the
                road.
              </li>
              <li>
                According to the University of Michigan Transportation Research
                Institute, there could be a 43 percent drop in{" "}
                <strong> 21 ......... </strong> that the yearly
                <strong> 22 ......... </strong> of cars. However, this would
                mean of each car would, on average, be twice as high as it
                currently is. This would lead to a higher turnover of vehicles,
                and therefore no reduction in automotive manufacturing.
              </li>
            </ul>
            <div className="question-list">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 19}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 18]}
                    onChange={(e) => handleChange(index + 18, e.target.value)}
                  />
                  <span className="result">{result[index + 18]}</span>{" "}
                </div>
              ))}
            </div>

            <h3>Questions 23-24</h3>
            <p>
              Choose TWO letters, A-E.
              <br />
              Write the correct letters in boxes 23 and 24 on your answer sheet.
              <br /> Which TWO benefits of automated vehicles does the writer
              mention?
              <br />
            </p>
            <ul>
              <li>
                • <strong> A </strong>
                Car travellers could enjoy considerable cost savings.
              </li>
              <li>
                • <strong> B </strong>
                It would be easier to find parking spaces in urban areas.
              </li>
              <li>
                • <strong> C </strong>
                Travellers could spend journeys doing something other than
                driving.
              </li>
              <li>
                • <strong> D </strong>
                People who find driving physically difficult could travel
                independently.
              </li>
              <li>
                • <strong> E </strong>A reduction in the number of cars would
                mean a reduction in pollution.
              </li>
            </ul>
            <div className="question-list">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 23}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 22]}
                    onChange={(e) => handleChange(index + 22, e.target.value)}
                  />
                  <span className="result">{result[index + 22]}</span>{" "}
                </div>
              ))}
            </div>

            <h3>Questions 25-26</h3>
            <p>
              Choose TWO letters, A-E.
              <br />
              Write the correct letters in boxes 25 and 26 on your answer sheet.
              <br /> Which TWO challenges to automated vehicle development does
              the writer mention?
              <br />
            </p>
            <ul>
              <li>
                • <strong> A </strong>
                making sure the general public has confidence in automated
                vehicles
              </li>
              <li>
                • <strong> B </strong>
                managing the pace of transition from conventional to automated
                vehicles
              </li>
              <li>
                • <strong> C </strong>
                deciding how to compensate professional drivers who become
                redundant
              </li>
              <li>
                • <strong> D </strong>
                setting up the infrastructure to make roads suitable for
                automated vehicles
              </li>
              <li>
                • <strong> E </strong>getting automated vehicles to adapt to
                various different driving conditions
              </li>
            </ul>
            <div className="question-list">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 25}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 24]}
                    onChange={(e) => handleChange(index + 24, e.target.value)}
                  />
                  <span className="result">{result[index + 24]}</span>{" "}
                </div>
              ))}
            </div>

            <br />
          </div>
        </div>
        <div className="reading-container">
          {/* Phần bài đọc (Bên trái) */}
          <div className="reading-left">
            <h2>READING PASSAGE 3</h2>
            <p>
              <i>
                You should spend about 20 minutes on Questions 27-40, which are
                based on Reading Passage 3 below.
              </i>
            </p>
            <h3>What is exploration?</h3>
            <p>
              We are all explorers. Our desire to discover, and then share that
              new-found knowledge, is part of what makes us human - indeed, this
              has played an important part in our success as a species. Long
              before the first caveman slumped down beside the fire and grunted
              news that there were plenty of wildebeest over yonder, our
              ancestors had learnt the value of sending out scouts to
              investigate the unknown. This questing nature of ours undoubtedly
              helped our species spread around the globe, just as it nowadays no
              doubt helps the last nomadic Penan maintain their existence in the
              depleted forests of Borneo, and a visitor negotiate the subways of
              New York.
            </p>
            <p>
              Over the years, we've come to think of explorers as a peculiar
              breed - different from the rest of us, different from those of us
              who are merely 'well travelled', even; and perhaps there is a type
              of person more suited to seeking out the new, a type of caveman
              more inclined to risk venturing out. That, however, doesn't take
              away from the fact that we all have this enquiring instinct, even
              today; and that in all sorts of professions - whether artist,
              marine biologist or astronomer - borders of the unknown are being
              tested each day.
            </p>
            <p>
              Thomas Hardy set some of his novels in Egdon Heath, a fictional
              area of uncultivated land, and used the landscape to suggest the
              desires and fears of his characters. He is delving into matters we
              all recognise because they are common to humanity. This is surely
              an act of exploration, and into a world as remote as the author
              chooses. Explorer and travel writer Peter Fleming talks of the
              moment when the explorer returns to the existence he has left
              behind with his loved ones. The traveller 'who has for weeks or
              months seen himself only as a puny and irrelevant alien crawling
              laboriously over a country in which he has no roots and no
              background, suddenly encounters his other self, a relatively solid
              figure, with a place in the minds of certain people'.
            </p>
            <p>
              In this book about the exploration of the earth's surface, I have
              confined myself to those whose travels were real and who also
              aimed at more than personal discovery. But that still left me with
              another problem: the word 'explorer' has become associated with a
              past era. We think back to a golden age, as if exploration peaked
              somehow in the 19th century as if the process of discovery is now
              on the decline, though the truth is that we have named only one
              and a half million of this planet's species, and there may be more
              than 10 million - and that's not including bacteria. We have
              studied only 5 per cent of the species we know. We have scarcely
              mapped the ocean floors, and know even less about ourselves; we
              fully understand the workings of only 10 per cent of our brains.
            </p>
            <p>
              Here is how some of today's 'explorers' define the word. Ran
              Fiennes, dubbed the 'greatest living explorer', said, 'An explorer
              is someone who has done something that no human has done before
              and also done something scientifically useful.' Chris Bonington, a
              leading mountaineer, felt exploration was to be found in the act
              of physically touching the unknown: 'You have to have gone
              somewhere new.' Then Robin Hanbury-Tenison, a campaigner on behalf
              of remote so-called 'tribal' peoples, said, 'A traveller simply
              records information about some far-off world, and reports back;
              but an explorer changes the world.' Wilfred Thesiger, who crossed
              Arabia's Empty Quarter in 1946, and belongs to an era of
              unmechanised travel now lost to the rest of us, told me, 'If I'd
              gone across by camel when I could have gone by car, it would have
              been a stunt.' To him, exploration meant bringing back information
              from a remote place regardless of any great self-discovery.
            </p>
            <p>
              Each definition is slightly different - and tends to reflect the
              field of endeavour of each pioneer. It was the same whoever I
              asked: the prominent historian would say exploration was a thing
              of the past, the cutting-edge scientist would say it was of the
              present. And so on. They each set their own particular criteria;
              the common factor in their approach being that they all had,
              unlike many of us who simply enjoy travel or discovering new
              things, both a very definite objective from the outset and also a
              desire to record their findings.
            </p>
            <p>
              I'd best declare my own bias. As a writer, I'm interested in the
              exploration of ideas. I've done a great many expeditions and each
              one was unique. I've lived for months alone with isolated groups
              of people all around the world, even two 'uncontacted tribes'. But
              none of these things is of the slightest interest to anyone
              unless, through my books, I've found a new slant, explored a new
              idea. Why? Because the world has moved on. The time has long
              passed for the great continental voyages - another walk to the
              poles, another crossing of the Empty Quarter. We know how the land
              surface of our planet lies; exploration of it is now down to the
              details - the habits of microbes, say, or the grazing behaviour of
              buffalo. Aside from the deep sea and deep underground, it's the
              era of specialists. However, this is to disregard the role the
              human mind has in conveying remote places; and this is what
              interests me: how a fresh interpretation, even of a well-travelled
              route, can give its readers new insights.
            </p>
          </div>

          {/* Phần câu hỏi (Bên phải) */}
          <div className="questions-right">
            <h3>Questions 27-32</h3>
            <p>
              Choose the correct letter <strong>, A, B, C or D.</strong> <br />
              Write the correct letter in boxes 27-32 on your answer sheet.
              <br />
            </p>
            <ul>
              <li>
                <strong> 27. </strong>
                The writer refers to visitors to New York to illustrate the
                point that <br />
                <strong> A </strong> exploration is an intrinsic element of
                being human. <br />
                <strong> B </strong> most people are enthusiastic about
                exploring. <br />
                <strong> C </strong> exploration can lead to surprising results.{" "}
                <br />
                <strong> D </strong> most people find exploration daunting.{" "}
                <br />
              </li>
              <li>
                <strong> 28. </strong>
                According to the second paragraph, what is the writer's view of
                explorers? <br />
                <strong> A </strong> Their discoveries have brought both
                benefits and disadvantages. <br />
                <strong> B </strong> Their main value is in teaching others.{" "}
                <br />
                <strong> C </strong> They act on an urge that is common to
                everyone. <br />
                <strong> D </strong> They tend to be more attracted to certain
                professions than to others. <br />
              </li>
              <li>
                <strong> 29. </strong>
                The writer refers to a description of Egdon Heath to suggest
                that
                <br />
                <strong> A </strong> Hardy was writing about his own experience
                of exploration. <br />
                <strong> B </strong> Hardy was mistaken about the nature of
                exploration. <br />
                <strong> C </strong> Hardy's aim was to investigate people's
                emotional states. <br />
                <strong> D </strong> Hardy's aim was to show the attraction of
                isolation. <br />
              </li>
              <li>
                <strong> 30. </strong>
                In the fourth paragraph, the writer refers to 'a golden age' to
                suggest that
                <br />
                <strong> A </strong> the amount of useful information produced
                by exploration has decreased.
                <br />
                <strong> B </strong> fewer people are interested in exploring
                than in the 19th century. <br />
                <strong> C </strong> recent developments have made exploration
                less exciting. <br />
                <strong> D </strong> we are wrong to think that exploration is
                no longer necessary. <br />
              </li>
              <li>
                <strong> 31. </strong>
                In the sixth paragraph, when discussing the definition of
                exploration, the writer argues that
                <br />
                <strong> A </strong> people tend to relate exploration to their
                own professional interests.
                <br />
                <strong> B </strong> certain people are likely to misunderstand
                the nature of exploration. C the generally accepted definition
                has changed over time. <br />
                <strong> C </strong> the generally accepted definition has
                changed over time. <br />
                <strong> D </strong> historians and scientists have more valid
                definitions than the general public.
                <br />
              </li>
              <li>
                <strong> 32. </strong>
                In the last paragraph, the writer explains that he is interested
                in
                <br />
                <strong> A </strong> how someone's personality is reflected in
                their choice of places to visit. <br />
                <strong> B </strong> the human ability to cast new light on
                places that may be familiar. <br />
                <strong> C </strong> how travel writing has evolved to meet
                changing demands. <br />
                <strong> D </strong> the feelings that writers develop about the
                places that they explore. <br />
              </li>
            </ul>
            <br />
            <div className="question-list">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 27}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 26]}
                    onChange={(e) => handleChange(index + 26, e.target.value)}
                  />
                  <span className="result">{result[index + 26]}</span>{" "}
                </div>
              ))}
            </div>

            <h3>Questions 33-37</h3>
            <p>
              Look at the following statements (Questions 33-37) and the list of
              explorers below.
              <br />
              Match each statement with the correct explorer, A-E.
              <br /> Write the correct letter, A-E, in boxes 33-37 on your
              answer sheet.
              <br />{" "}
              <strong>NB : You may use any letter more than once.</strong>
            </p>
            <div className="table-container">
              <table className="explorer-table">
                <thead>
                  <tr>
                    <th colSpan={2}>List of People</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>A</strong>
                    </td>
                    <td>Stella Pachidi</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>B</strong>
                    </td>
                    <td>Hamish Low</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>C</strong>
                    </td>
                    <td>Ewan McGaughey </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul>
              <li>
                <strong>35 </strong> Greater levels of automation will not
                result in lower employment.
              </li>
              <li>
                <strong>36 </strong> There are several reasons why AI is
                appealing to businesses.
              </li>
              <li>
                <strong>37 </strong> AI’s potential to transform people’s lives
                has parallels with major cultural shifts which occurred in
                previous eras.
              </li>
              <li>
                <strong>38 </strong> It is important to be aware of the range of
                problems that AI causes.
              </li>
              <li>
                <strong>39 </strong> People are going to follow a less
                conventional career path than in the past.
              </li>
              <li>
                <strong>40 </strong> Authorities should take measures to ensure
                that there will be adequately paid work for everyone.
              </li>
            </ul>

            <div className="question-list">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 33}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 32]}
                    onChange={(e) => handleChange(index + 32, e.target.value)}
                  />
                  <span className="result">{result[index + 32]}</span>{" "}
                </div>
              ))}
            </div>

            <h3>Questions 38-40</h3>
            <p>
              Complete the summary below.
              <br />
              Choose <strong>NO MORE THAN TWO WORDS</strong> from the passage
              for each answer.
              <br /> Write your answers in boxes 38-40 on your answer sheet.
              <br />
            </p>
            <ul>
              <li>
                <strong> The writer's own bias </strong>
              </li>
              <li>
                The writer has experience of a large number of{" "}
                <strong> 38 ........... </strong> was the first stranger that
                certain previously <strong> 39 ............ </strong> and people
                had encountered. He believes there is no need for further
                exploration of Earth's <strong> 40 .......... </strong> , except
                to answer specific questions such as how buffalo eat.
              </li>
            </ul>
            <div className="question-list">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 38}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 37]}
                    onChange={(e) => handleChange(index + 37, e.target.value)}
                  />
                  <span className="result">{result[index + 37]}</span>{" "}
                </div>
              ))}
            </div>
            <br />
          </div>
        </div>
      </div>
      <div className="exam-sidebar-reading">
        <h3>Thời gian còn lại:</h3>
        <p className="time">{formatTime(timeLeft)}</p>

        <button
          className="submit-btn"
          onClick={checkAnswers}
          disabled={isSubmitted}
        >
          {isSubmitted ? "Đã Nộp Bài" : "NỘP BÀI"}
        </button>
        {isSubmitted && (
          <button className="submit-btn" onClick={() => navigate("/reading")}>
            Quay Lại
          </button>
        )}

        {/* <p className="restore-link">
          🔴 Khôi phục/ <br />
          lưu bài làm
        </p> */}
        <p className="note">
          <em>Chú ý: Click vào số thứ tự câu hỏi để đánh dấu review.</em>
        </p>
        {showResult && (
          <div className="result-modal">
            <div className="result-content">
              <h2>Kết Quả Bài Làm</h2>
              <p>
                ✅ Số câu đúng: <strong>{correctCount}</strong>
              </p>
              <p>
                ❌ Số câu sai: <strong>{wrongCount}</strong>
              </p>
              <p>
                🎯 Band Điểm IETLS Reading : <strong>{bandScore}</strong>
              </p>
              <button onClick={() => setShowResult(false)}>Đóng</button>
              {/* <button onClick={() => navigate("/reading")}>Quay Lại</button> */}
            </div>
          </div>
        )}

        {/* Danh sách câu hỏi */}
        <div className="question-grid">
          <h3>Recording 1</h3>
          <div className="grid">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className={`question-box ${
                  userAnswers[index] ? "answered" : "unanswered"
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <br />
          <h3>Recording 2</h3>
          <div className="grid">
            {[...Array(10)].map((_, index) => (
              <div
                key={index + 10}
                className={`question-box ${
                  userAnswers[index + 10] ? "answered" : "unanswered"
                }`}
              >
                {index + 11}
              </div>
            ))}
          </div>
          <br />
          <h3>Recording 3</h3>
          <div className="grid">
            {[...Array(10)].map((_, index) => (
              <div
                key={index + 20}
                className={`question-box ${
                  userAnswers[index + 20] ? "answered" : "unanswered"
                }`}
              >
                {index + 21}
              </div>
            ))}
          </div>
          <br />
          <h3>Recording 4</h3>
          <div className="grid">
            {[...Array(10)].map((_, index) => (
              <div
                key={index + 30}
                className={`question-box ${
                  userAnswers[index + 30] ? "answered" : "unanswered"
                }`}
              >
                {index + 31}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reading_test1;
