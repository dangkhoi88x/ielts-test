import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReadingAnswers from "../../../hooks/Cambridge_15/Test_1/ReadingAnswers";
import "./Reading_test1.css";

const Reading_test1C16 = () => {
  // Đếm ngược thời gian (40 phút)
  const [timeLeft, setTimeLeft] = useState(40 * 60); // 2400 giây
  const [isRunning, setIsRunning] = useState(true);
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState(false); // Hiển thị bảng kết quả
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [bandScore, setBandScore] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // Trạng thái đã nộp bài

  // Lấy dữ liệu từ Firestore (Reading)
  const { answers, isLoading } = ReadingAnswers(
    "Cambridge_16",
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
            <h3>Why we need to protect polar bears</h3>
            <p>
              Polar bears are being increasingly threatened by the effects of
              climate change, but their disappearance could have far-reaching
              consequences. They are uniquely adapted to the extreme conditions
              of the Arctic Circle, where temperatures can reach -40°C. One
              reason for this is that they have up to 11 centimetres of fat
              underneath their skin. Humans with comparative levels of adipose
              tissue would be considered obese and would be likely to suffer
              from diabetes and heart disease. Yet the polar bear experiences no
              such consequences.
            </p>
            <p>
              A 2014 study by Shi Ping Liu and colleagues sheds light on this
              mystery. They compared the genetic structure of polar bears with
              that of their closest relatives from a warmer climate, the brown
              bears. This allowed them to determine the genes that have allowed
              polar bears to survive in one of the toughest environments on
              Earth. Liu and his colleagues found the polar bears had a gene
              known as APoB, which reduces levels of low-density lipoproteins
              (LDLs)-a form of 'bad' cholesterol. In humans, mutations of this
              gene are associated with increased risk of heart disease. Polar
              bears may therefore be an important study model to understand
              heart disease in humans.
            </p>
            <p>
              The genome of the polar bear may also provide the solution for
              another condition, one that particularly affects our older
              generation: osteoporosis. This is a disease where bones show
              reduced density, usually caused by insufficient exercise, reduced
              calcium intake or food starvation. Bone tissue is constantly being
              remodelled, meaning that bone is added or removed, depending on
              nutrient availability and the stress that the bone is under.
              Female polar bears, however, undergo extreme conditions during
              every pregnancy. Once autumn comes around, these females will dig
              maternity dens in the snow and will remain there throughout the
              winter, both before and after the birth of their cubs. This
              process results in about six months of fasting, where the female
              bears have to keep themselves and their cubs alive, depleting
              their own calcium and calorie reserves. Despite this, their bones
              remain strong and dense.
            </p>
            <p>
              Physiologists Alanda Lennox and Allen Goodship found an
              explanation for this paradox in 2008. They discovered that
              pregnant bears were able to increase the density of their bones
              before they started to build their dens. In addition, six months
              later, when they finally emerged from the den with their cubs,
              there was no evidence of significant loss of bone density.
              Hibernating brown bears do not have this capacity and must
              therefore resort to major bone reformation in the following
              spring. If the mechanism of bone remodelling in polar bears can be
              understood, many bedridden humans, and even astronauts, could
              potentially benefit.
            </p>
            <p>
              The medical benefits of the polar bear for humanity certainly have
              their importance in our conservation efforts, but these should not
              be the only factors taken into consideration. We tend to want to
              protect animals we think are intelligent and possess emotions,
              such as elephants and primates. Bears, on the other hand, seem to
              be perceived as stupid and in many cases violent. And yet
              anecdotal evidence from the field challenges those assumptions,
              suggesting for example that polar bears have good problem-solving
              abilities. A male bear called GoGo in Tennoji Zoo, Osaka, has even
              been observed making use of a tool to manipulate his environment.
              The bear used a tree branch on multiple occasions to dislodge a
              piece of meat hung out of his reach. Problem-solving ability has
              also been witnessed in wild polar bears, although not as obviously
              as with GoGo. A calculated move by a male bear involved running
              and jumping onto barrels in an attempt to get to a photographer
              standing on a platform four metres high.{" "}
            </p>
            <p>
              In other studies, such as one by Alison Ames in 2008, polar bears
              showed deliberate and focussed manipulation. For example, Ames
              observed bears putting objects in piles and then knocking them
              over in what appeared to be a game. The study demonstrates that
              bears are capable of agile and thought-out behaviours. These
              examples suggest bears have greater creativity and problem-solving
              abilities than previously thought
            </p>
            <p>
              As for emotions, while the evidence is once again anecdotal, many
              bears have been seen to hit out at ice and snow - seemingly out of
              :frustration - when they have just missed out on a kill. Moreover,
              polar bears can form unusual relationships with other species,
              including playing with the dogs used to pull sleds in the Arctic.
              Remarkably, one hand-raised polar bear called Agee has formed a
              close relationship with her owner Mark Dumas to the point where
              they even swim together. This is even more astonishing since polar
              bears are known to actively hunt humans in the wild.{" "}
            </p>
            <p>
              If climate change were to lead to their extinction, this would
              mean not only the loss of potential breakthroughs in human
              medicine, but more importantly, the disappearance of an
              intelligent, majestic animal.{" "}
            </p>
          </div>

          <div className="questions-right">
            <h3>Questions 1-7</h3>
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
                <strong>1 </strong> Polar bears suffer from various health
                problems due to the build-up of fat under their skin.
              </li>
              <li>
                <strong> 2 </strong> The study done by Liu and his colleagues
                compared different groups of polar bears.
              </li>
              <li>
                <strong> 3 </strong> Liu and colleagues were the first
                researchers to compare polar bears and brown bears genetically.
              </li>
              <li>
                <strong> 4 </strong> Polar bears are able to control their
                levels of 'bad' cholesterol by genetic means.
              </li>
              <li>
                <strong> 5 </strong> Female polar bears are able to survive for
                about six months without food.
              </li>
              <li>
                <strong> 6 </strong>It was found that the bones of female polar
                bears were very weak when they came out of their dens in spring.
              </li>
              <li>
                <strong> 7 </strong> The polar bear's mechanism for increasing
                bone density could also be used by people one day.
              </li>
            </ul>
            <div className="question-list">
              {[...Array(7)].map((_, index) => (
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
            <h3>Questions 8-13</h3>
            <p>
              <em>Complete the table below.</em>
            </p>
            <p>
              <strong>Choose ONE WORD ONLY</strong> from the passage for each
              answer.
            </p>
            <p>Write your answers in boxes 8-13 on your answer sheet.</p>

            <h2>Reasons why polar bears should be protected</h2>
            <ul>
              <li>
                People think of bears as unintelligent and{" "}
                <strong>8 ..........</strong>.
              </li>
            </ul>

            <p>However, this may not be correct. For example:</p>
            <ul>
              <li>
                In Tennoji Zoo, a bear has been seen using a branch as a
                <strong>9 ..........</strong>. This allowed him to knock down
                some
                <strong>10 ..........</strong>.
              </li>
              <li>
                A wild polar bear worked out a method of reaching a platform
                where a<strong>11 ..........</strong> was located.
              </li>
              <li>
                Polar bears have displayed behaviour such as conscious
                manipulation of objects and activity similar to a{" "}
                <strong>12 ..........</strong>.
              </li>
            </ul>

            <p>Bears may also display emotions. For example:</p>
            <ul>
              <li>
                They may make movements suggesting{" "}
                <strong>13 ..........</strong> if disappointed when hunting.
              </li>
              <li>They may form relationships with other species.</li>
            </ul>

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
            <h3>The Step Pyramid of Djoser</h3>
            <p>
              <b>A</b> The pyramids are the most famous monuments of ancient
              Egypt and still hold enormous interest for people in the present
              day. These grand, impressive tributes to the memory of the
              Egyptian kings have become linked with the country even though
              other cultures, such as the Chinese and Mayan, also built
              pyramids. The evolution of the pyramid form has been written and
              argued about for centuries. However, there is no question that, as
              far as Egypt is concerned, it began with one monument to one king
              designed by one brilliant architect: the Step Pyramid of Djoser at
              Saqqara.
            </p>
            <p>
              <b>B</b> Djoser was the first king of the Third Dynasty of Egypt
              and the first to build in stone. Prior to Djoser's reign, tombs
              were rectangular monuments made of dried clay brick, which covered
              underground passages where the deceased person was buried. For
              reasons which remain unclear, Djoser's main official, whose name
              was Imhotep, conceived of building a taller, more impressive tomb
              for his king by stacking stone slabs on top of one another,
              progressively making them smaller, to form the shape now known as
              the Step Pyramid. Djoser is thought to have reigned for 19 years,
              but some historians and scholars attribute a much longer time for
              his rule, owing to the number and size of the monuments he built.
            </p>
            <p>
              <b>C</b> The Step Pyramid has been thoroughly examined and
              investigated over the last century, and it is now known that the
              building process went through many different stages. Historian
              Marc Van de Mieroop comments on this, writing 'Much
              experimentation was involved, which is especially clear in the
              construction of the pyramid in the center of the complex. It had
              several plans ... before it became the first Step Pyramid in
              history, piling six levels on top of one another ... The weight of
              the enormous mass was a challenge for the builders, who placed the
              stones at an inward incline in order to prevent the monument
              breaking up.'
            </p>
            <p>
              <b>D</b> When finally completed, the Step Pyramid rose 62 meters
              high and was the tallest structure of its time. The complex in
              which it was built was the size of a city in ancient Egypt and
              included a temple, courtyards, shrines, and living quarters for
              the priests. It covered a region of 16 hectares and was surrounded
              by a wall 10.5 meters high. The wall had 13 false doors cut into
              it with only one true entrance cut into the south-east comer; the
              entire wall was then ringed by a trench 750 meters long and 40
              meters wide. The false doors and the trench were incorporated into
              the complex to discourage unwanted visitors. If someone wished to
              enter, he or she would have needed to know in advance how to find
              the location of the true opening in the wall. Djoser was so proud
              of his accomplishment that he broke the tradition of having only
              his own name on the monument and had Imhotep 's name carved on it
              as well.
            </p>

            <p>
              <b>E</b> The burial chamber of the tomb, where the king's body was
              laid to rest, was dug beneath the base of the pyramid, surrounded
              by a vast maze of long tunnels that had rooms off them to
              discourage robbers. One of the most mysterious discoveries found
              inside the pyramid was a large number of stone vessels. Over
              40,000 of these vessels, of various forms and shapes, were
              discovered in storerooms off the pyramid's underground passages.
              They are inscribed with the names of rulers from the First and
              Second Dynasties of Egypt and made from different kinds of stone.
              There is no agreement among scholars and archaeologists on why the
              vessels were placed in the tomb of Djoser or what they were
              supposed to represent. The archaeologist Jean-Philippe Lauer, who
              excavated most of the pyramid and complex, believes they were
              originally stored and then given a 'proper burial' by Djoser in
              his pyramid to honor his predecessors. There are other historians,
              however, who claim the vessels were dumped into the shafts as yet
              another attempt to prevent grave robbers from getting to the
              king's burial chamber.
            </p>
            <p>
              <b>F</b> Unfortunately, all of the precautions and intricate
              design of the underground network did not prevent ancient robbers
              from finding a way in. Djoser's grave goods, and even his body,
              were stolen at some point in the past and all archaeologists found
              were a small number of his valuables overlooked by the thieves.
              There was enough left throughout the pyramid and its complex,
              however, to astonish and amaze the archaeologists who excavated
              it.
            </p>
            <p>
              <b>G</b> Egyptologist Miroslav Verner writes, 'Few monuments hold
              a place in human history as significant as that of the Step
              Pyramid in Saqqara ... It can be said without exaggeration that
              this pyramid complex constitutes a milestone in the evolution of
              monumental stone architecture in Egypt and in the world as a
              whole.' The Step Pyramid was a revolutionary advance in
              architecture and became the archetype which all the other great
              pyramid builders of Egypt would follow.
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
            <div className="table-container">
              <table className="explorer-table">
                <thead>
                  <tr>
                    <th colSpan="2">List of Headings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>i</strong>
                    </td>
                    <td>The areas and artefacts within the pyramid itself</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ii</strong>
                    </td>
                    <td>A difficult task for those involved</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>iii</strong>
                    </td>
                    <td>A king who saved his people</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>iv</strong>
                    </td>
                    <td>A single certainty among other less definite facts</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>v</strong>
                    </td>
                    <td>An overview of the external buildings and areas</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>vi</strong>
                    </td>
                    <td>A pyramid design that others copied</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>vii</strong>
                    </td>
                    <td>
                      An idea for changing the design of burial structures
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>viii</strong>
                    </td>
                    <td>An incredible experience despite the few remains</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ix</strong>
                    </td>
                    <td>The answers to some unexpected questions</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul>
              <li>
                • <strong> 14 </strong>Paragraph A
              </li>
              <li>
                • <strong> 15 </strong>Paragraph B
              </li>
              <li>
                • <strong> 16 </strong>Paragraph C
              </li>
              <li>
                • <strong> 17 </strong>Paragraph D
              </li>
              <li>
                • <strong> 18 </strong>Paragraph E
              </li>
              <li>
                • <strong> 19 </strong>Paragraph F
              </li>
              <li>
                • <strong> 20 </strong>Paragraph G
              </li>
            </ul>
            <br />
            <div className="question-list">
              {[...Array(7)].map((_, index) => (
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
              Complete the notes below.
              <br /> Choose <strong>ONE WORD ONLY </strong>
              from the passage for each answer.
              <br /> Write your answers in boxes 21-24 on your answer sheet.
              <br />
            </p>
            <br />
            <ul>
              <h2>The Step Pyramid of Djoser</h2>
              <p>
                The complex that includes the Step Pyramid and its surroundings
                is considered to be as big as an Egyptian{" "}
                <strong>21 ..........</strong> of the past. The area outside the
                pyramid included accommodation that was occupied by{" "}
                <strong>22 ..........</strong>, along with many other buildings
                and features.
              </p>

              <p>
                A wall ran around the outside of the complex and a number of
                false entrances were built into this. In addition, a long{" "}
                <strong>23 ..........</strong> encircled the wall. As a result,
                any visitors who had not been invited were cleverly prevented
                from entering the pyramid grounds unless they knew the{" "}
                <strong>24 ..........</strong> of the real entrance.
              </p>
            </ul>

            <div className="question-list">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 21}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 20]}
                    onChange={(e) => handleChange(index + 20, e.target.value)}
                  />
                  <span className="result">{result[index + 20]}</span>{" "}
                </div>
              ))}
            </div>

            <h3>Questions 25-26</h3>
            <p>
              Choose TWO letters, A-E.
              <br />
              Write the correct letters in boxes 25 and 25 on your answer sheet.
              <br /> Which TWO of the following points does the writer make
              about King Djoser?
              <br />
            </p>
            <ul>
              <li>
                • <strong> A </strong>
                Initially he had to be persuaded to build in stone rather than
                clay.
              </li>
              <li>
                • <strong> B </strong>
                There is disagreement concerning the length of his reign.
              </li>
              <li>
                • <strong> C </strong>
                He failed to appreciate lmhotep's part in the design of the Step
                Pyramid.
              </li>
              <li>
                • <strong> D </strong>A few of his possessions were still in his
                tomb when archaeologists found it.
              </li>
              <li>
                • <strong> E </strong>He criticised the design and construction
                of other pyramids in Egypt.
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
            <h3>The future of work </h3>
            <p>
              According to a leading business consultancy, 3-14% of the global
              workforce will need to switch to a different occupation within the
              next 10-15 years, and all workers will need to adapt as their
              occupations evolve alongside increasingly capable machines.
              Automation - or 'embodied artificial intelligence' (AI) -is one
              aspect of the disruptive effects of technology on the labour
              market. 'Disembodied AI', like the algorithms running in our
              smartphones, is another.
            </p>
            <p>
              Dr Stella Pachidi from Cambridge Judge Business School believes
              that some of the most fundamental changes are happening as a
              result of the 'algorithmication' of jobs that are dependent on
              data rather than on production -the so-called knowledge economy.
              Algorithms are capable of learning from data to undertake tasks
              that previously needed human judgement, such as reading legal
              contracts, analysing medical scans and gathe1ing market
              intelligence
            </p>
            <p>
              'In many cases, they can outperform humans,' says Pachidi.
              'Organisations are attracted to using algorithms because they want
              to make choices based on what they consider is "perfect
              information", as well as to reduce costs and enhance
              productivity.'
            </p>
            <p>
              'But these enhancements are not without consequences,' says
              Pachidi. 'If routine cognitive tasks are taken over by Al, how do
              professions develop their future experts?' she asks. 'One way of
              learning about a job is "legitimate peripheral participation" -a
              novice stands next to experts and learns by observation. If this
              isn't happening, then you need to find new ways to learn.'
            </p>
            <p>
              Another issue is the extent to which the technology influences or
              even controls the workforce. For over two years, Pachidi monitored
              a telecommunications company. 'The way telecoms salespeople work
              is through personal and frequent contact with clients, using the
              benefit of experience to assess a situation and reach a decision.
              However, the company had started using a[n] ... algorithm that
              defined when account managers should contact certain customers
              about which kinds of campaigns and what to offer them.'
            </p>
            <p>
              The algorithm-usually built by external designers - often becomes
              the keeper of knowledge, she explains. In cases like this, Pachidi
              believes, a short-sighted view begins to creep into working
              practices whereby workers learn through the 'algorithm's eyes' and
              become dependent on its instructions. Alternative explorations
              -where experimentation and human instinct lead to progress and new
              ideas -are effectively discouraged.
            </p>
            <p>
              Pachidi and colleagues even observed people developing strategies
              to make the algorithm work to their own advantage. 'We are seeing
              cases where workers feed the algorithm with false data to reach
              their targets,' she reports.
            </p>
            <p>
              It's scenarios like these that many researchers are working to
              avoid. Their objective is to make AI technologies more trustworthy
              and transparent, so that organisations and individuals understand
              how AI decisions are made. In the meantime, says Pachidi, 'We need
              to make sure we fully understand the dilemmas that this new world
              raises regarding expertise, occupational boundaries and control.'
            </p>
            <p>
              Economist Professor Hamish Low believes that the future of work
              will involve major transitions across the whole life course for
              everyone: 'The traditional trajectory of full-time education
              followed by full-time work followed by a pensioned retirement is a
              thing of the past,' says Low. Instead, he envisages a multistage
              employment life: one where retraining happens across the life
              course, and where multiple jobs and no job happen by choice at
              different stages.
            </p>
            <p>
              On the subject of job losses, Low believes the predictions are
              founded on a fallacy: 'It assumes that the number of jobs is
              fixed. If in 30 years, half of 100 jobs are being carried out by
              robots, that doesn't mean we are left with just 50 jobs for
              humans. The number of jobs will increase: we would expect there to
              be 150 jobs.'
            </p>
            <p>
              Dr Ewan McGaughey, at Cambridge's Centre for Business Research and
              King's College London, agrees that 'apocalyptic' views about the
              future of work are misguided. 'It's the laws that restrict the
              supply of capital to the job market, not the advent of new
              technologies that causes unemployment.'
            </p>
            <p>
              His recently published research answers the question of whether
              automation, AI and robotics will mean a 'jobless future' by
              looking at the causes of unemployment. 'History is clear that
              change can mean redundancies. But social policies can tackle this
              through retraining and redeployment.'
            </p>
            <p>
              He adds: 'If there is going to be change to jobs as a result of AI
              and robotics then I'd like to see governments seizing the
              opportunity to improve policy to enforce good job security. We can
              "reprogramme" the law to prepare for a fairer future of work and
              leisure.' McGaughey 's findings are a call to arms to leaders of
              organisations, governments and banks to pre-empt the coming
              changes with bold new policies that guarantee full employment,
              fair incomes and a thriving economic democracy.
            </p>
            <p>
              'The promises of these new technologies are astounding. They
              deliver humankind the capacity to live in a way that nobody could
              have once imagined,' he adds. 'Just as the industrial revolution
              brought people past subsistence agriculture, and the corporate
              revolution enabled mass production, a third revolution has been
              pronounced. But it will not only be one of technology. The next
              revolution will be social.'
            </p>
          </div>

          {/* Phần câu hỏi (Bên phải) */}
          <div className="questions-right">
            <h3>Questions 27-30</h3>
            <p>
              Choose the correct letter <strong>, A, B, C or D.</strong> <br />
              Write the correct letter in boxes 27-30 on your answer sheet.
              <br />
            </p>
            <ul>
              <li>
                <strong> 27. </strong>
                The first paragraph tells us about <br />
                <strong> A </strong> the kinds of jobs that will be most
                affected by the growth of AI. <br />
                <strong> B </strong> the extent to which AI will alter the
                nature of the work that people do. <br />
                <strong> C </strong> the proportion of the world’s labour force
                who will have jobs in AI in the future. <br />
                <strong> D </strong> the difference between ways that embodied
                and disembodied AI will impact on workers. <br />
              </li>
              <li>
                <strong> 28. </strong>
                According to the second paragraph, what is Stella Pachidi’s view
                of the ‘knowledge economy’? <br />
                <strong> A </strong> It is having an influence on the number of
                jobs available. <br />
                <strong> B </strong> It is changing people’s attitudes towards
                their occupations. <br />
                <strong> C </strong> It is the main reason why the production
                sector is declining. <br />
                <strong> D </strong> It is a key factor driving current
                developments in the workplace. <br />
              </li>
              <li>
                <strong> 29. </strong>
                What did Pachidi observe at the telecommunications company?{" "}
                <br />
                <strong> A </strong> staff disagreeing with the recommendations
                of AI. <br />
                <strong> B </strong> staff feeling resentful about the intrusion
                of AI in their work. <br />
                <strong> C </strong> staff making sure that AI produces the
                results that they want. <br />
                <strong> D </strong> staff allowing AI to carry out tasks they
                ought to do themselves. <br />
              </li>
              <li>
                <strong> 30. </strong>
                In his recently published research, Ewan McGaughey <br />
                <strong> A </strong> challenges the idea that redundancy is a
                negative thing. <br />
                <strong> B </strong> shows the profound effect of mass
                unemployment on society. <br />
                <strong> C </strong> highlights some differences between past
                and future job losses. <br />
                <strong> D </strong> illustrates how changes in the job market
                can be successfully handled. <br />
              </li>
            </ul>

            <br />
            <div className="question-list">
              {[...Array(4)].map((_, index) => (
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

            <h3>Questions 31-34</h3>
            <p>
              Complete the summary using the list of words, A-G, below.
              <br /> Write the correct letter, A-G, in boxes 31-34 on your
              answer sheet
              <br />{" "}
            </p>
            <div className="table-container">
              <table className="explorer-table">
                <tbody>
                  <tr>
                    <td>
                      <strong>A</strong>
                    </td>
                    <td>Pressure</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>B</strong>
                    </td>
                    <td>satisfaction</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>C</strong>
                    </td>
                    <td>intuition</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>D</strong>
                    </td>
                    <td>Promotion</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>E</strong>
                    </td>
                    <td>reliance</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>F</strong>
                    </td>
                    <td>confidence</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>G</strong>
                    </td>
                    <td>information</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul>
              <li>
                Stella Pachidi of Cambridge Judge Business School has been
                focusing on the ‘algorithmication’ of jobs which rely not on
                production but on
                <strong> 31 ............ </strong>.
              </li>
              <li>
                While monitoring a telecommunications company, Pachidi observed
                a growing
                <strong> 32 ............ </strong> on the recommendations made
                by AI, as workers begin to learn through the ‘algorithm’s eyes’.
                Meanwhile, staff are deterred from experimenting and using their
                own
                <strong> 33 ............ </strong>, and are therefore prevented
                from achieving innovation.
              </li>
              <li>
                To avoid the kind of situations which Pachidi observed,
                researchers are trying to make AI’s decision-making process
                easier to comprehend, and to increase users’{" "}
                <strong> 34 ............ </strong> with regard to the
                technology.
              </li>
            </ul>

            <div className="question-list">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 31}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 30]}
                    onChange={(e) => handleChange(index + 30, e.target.value)}
                  />
                  <span className="result">{result[index + 30]}</span>{" "}
                </div>
              ))}
            </div>
            <h3>Questions 35-40</h3>
            <p>
              Look at the following statements (Questions 35-40) and the list of
              people below.
              <br /> Match each statement with the correct person, A, B or C.
              <br />
              Write the correct letter, A, B or C, in boxes 35-40 on your answer
              sheet.
              <br />
              <strong>NB: You may use any letter more than once. </strong>
            </p>
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
              {[...Array(6)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 35}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 34]}
                    onChange={(e) => handleChange(index + 34, e.target.value)}
                  />
                  <span className="result">{result[index + 34]}</span>{" "}
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

export default Reading_test1C16;
