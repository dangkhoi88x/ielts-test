import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useFetchAnswerscopy from "../../../hooks/useFetchAnswerscopy";
import "./Reading_test2.css";

const Reading_test2 = () => {
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
  const { answers, isLoading } = useFetchAnswerscopy(
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
            <h3>Could urban engineers learn from dance?</h3>
            <p>
              <b>A</b> The way we travel around cities has a major impact on
              whether they are sustainable. Transportation is estimated to
              account for 30% of energy consumption in most of the world's most
              developed nations, so lowering the need for energy-using vehicles
              is essential for decreasing the environmental impact of mobility.
              But as more and more people move to cities, it is important to
              think about other kinds of sustainable travel too. The ways we
              travel affect our physical and mental health, our social lives,
              our access to work and culture, and the air we breathe. Engineers
              are tasked with changing how we travel round cities through urban
              design, but the engineering industry still works on the
              assumptions that led to the creation of the energy-consuming
              transport systems we have now: the emphasis placed solely on
              efficiency, speed, and quantitative data. We need radical changes,
              to make it healthier, more enjoyable, and less environmentally
              damaging to travel around cities.
            </p>
            <p>
              <b>B</b> Dance might hold some of the answers. That is not to
              suggest everyone should dance their way to work, however healthy
              and happy it might make us, but rather that the techniques used by
              choreographers to experiment with and design movement in dance
              could provide engineers with tools to stimulate new ideas in
              city-making. Richard Sennett, an influential urbanist and
              sociologist who has transformed ideas about the way cities are
              made, argues that urban design has suffered from a separation
              between mind and body since the introduction of the architectural
              blueprint.
            </p>
            <p>
              <b>C</b> Whereas medieval builders improvised and adapted
              construction through their intimate knowledge of materials and
              personal experience of the conditions on a site, building designs
              are now conceived and stored in media technologies that detach the
              designer from the physical and social realities they are creating.
              While the design practices created by these new technologies are
              essential for managing the technical complexity of the modern
              city, they have the drawback of simplifying reality in the
              process.
            </p>
            <p>
              <b>D</b> To illustrate, Sennett discusses the Peachtree Center in
              Atlanta, USA, a development typical of the modernist approach to
              urban planning prevalent in the 1970s. Peachtree created a grid of
              streets and towers intended as a new pedestrian-friendly downtown
              for Atlanta. According to Sennett, this failed because its
              designers had invested too much faith in computer-aided design to
              tell them how it would operate. They failed to take into account
              that purpose-built street cafés could not operate in the hot sun
              without the protective awnings common in older buildings, and
              would need energy-consuming air conditioning instead, or that its
              giant car park would feel so unwelcoming that it would put people
              off getting out of their cars. What seems entirely predictable and
              controllable on screen has unexpected results when translated into
              reality.
            </p>
            <p>
              <b>E</b> The same is true in transport engineering, which uses
              models to predict and shape the way people move through the city.
              Again, these models are necessary, but they are built on specific
              world views in which certain forms of efficiency and safety are
              considered and other experiences of the city ignored. Designs that
              seem logical in models appear counter-intuitive in the actual
              experience of their users. The guard rails that will be familiar
              to anyone who has attempted to cross a British road, for example,
              were an engineering solution to pedestrian safety based on models
              that prioritise the smooth flow of traffic. On wide major roads,
              they often guide pedestrians to specific crossing points and slow
              down their progress across the road by using staggered access
              points to divide the crossing into two one for each carriageway.
              In doing so they make crossings feel longer, introducing
              psychological barriers greatly impacting those that are the least
              mobile, and encouraging others to make dangerous crossings to get
              around the guard rails. These barriers don't just make it harder
              to cross the road: they divide communities and decrease
              opportunities for healthy transport. As a result, many are now
              being removed, causing disruption, cost, and waste.
            </p>
            <p>
              <b>F</b> If their designers had had the tools to think with their
              bodies - like dancers - and imagine how these barriers would feel,
              there might have been a better solution. In order to bring about
              fundamental changes to the ways we use our cities, engineering
              will need to develop a richer understanding of why people move in
              certain ways, and how this movement affects them. Choreography may
              not seem an obvious choice for tackling this problem. Yet it
              shares with engineering the aim of designing patterns of movement
              within limitations of space. It is an art form developed almost
              entirely by trying out ideas with the body, and gaining instant
              feedback on how the results feel. Choreographers have deep
              understanding of the psychological, aesthetic, and physical
              implications of different ways of moving.
            </p>
            <p>
              <b>G</b> Observing the choreographer Wayne McGregor, cognitive
              scientist David Kirsh described how he 'thinks with the body'.
              Kirsh argues that by using the body to simulate outcomes, McGregor
              is able to imagine solutions that would not be possible using
              purely abstract thought. This kind of physical knowledge is valued
              in many areas of expertise, but currently has no place in formal
              engineering design processes. A suggested method for transport
              engineers is to improvise design solutions and get instant
              feedback about how they would work from their own experience of
              them, or model designs at full scale in the way choreographers
              experiment with groups of dancers. Above all, perhaps, they might
              learn to design for emotional as well as functional effects.
            </p>
          </div>

          <div className="questions-right">
            <h3>Questions 1-6</h3>
            <p>
              Reading Passage 1 has seven paragraphs, A-G.
              <br />
              Which paragraph contains the following information?
              <br />
              Write the correct letter, A-G, in boxes 1-6 on your answer sheet.
              from the passage for each answer.
            </p>
            <ul>
              <li>
                <strong> 1</strong> reference to an appealing way of using dance
                that the writer is not proposing
              </li>
              <li>
                <strong> 2</strong> an example of a contrast between past and
                present approaches to building
              </li>
              <li>
                <strong> 3</strong> mention of an objective of both dance and
                engineering
              </li>
              <li>
                <strong> 4</strong> reference to an unforeseen problem arising
                from ignoring the climate
              </li>
              <li>
                <strong> 5</strong> why some measures intended to help people
                are being reversed
              </li>
              <li>
                <strong> 6</strong> reference to how transport has an impact on
                human lives
              </li>
            </ul>
            <div className="question-list">
              {[...Array(6)].map((_, index) => (
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
            <h3>Questions 7-13</h3>
            <p>
              <em>Complete the table below.</em>
            </p>
            <p>
              <strong>Choose ONE WORD ONLY</strong> from the passage for each
              answer.
            </p>
            <p>Write your answers in boxes 7-13 on your answer sheet.</p>
            <h2>Guard rails</h2>
            <ul>
              <li>
                Guard rails were introduced on British roads to improve the{" "}
                <strong> 7......... </strong> of pedestrians, while ensuring
                that the movement of <strong> 8......... </strong> is not
                disrupted. Pedestrians are led to access points, and encouraged
                to cross one <strong> 9......... </strong> at a time.
                <br />
                An unintended effect is to create psychological difficulties in
                crossing the road, particularly for less{" "}
                <strong> 10......... </strong> people. Another result is that
                some people cross the road in a <strong> 11......... </strong> .
                The guard rails separate <strong> 12......... </strong> and make
                it more difficult to introduce forms of transport that are{" "}
                <strong> 13......... </strong>.
              </li>
            </ul>
            <div className="question-list">
              {[...Array(7)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 7}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 6]}
                    onChange={(e) => handleChange(index + 6, e.target.value)}
                  />
                  <span className="result">{result[index + 6]}</span>{" "}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reading-container">
          <div className="reading-left">
            <h2>READING PASSAGE 2</h2>
            <p>
              <i>
                You should spend about 20 minutes on Questions 14-26, which are
                based on Reading Passage 2 below.
              </i>
            </p>
            <h3>Should we try to bring extinct species back to life?</h3>
            <p>
              <b>A</b> The passenger pigeon was a legendary species. Flying in
              vast numbers across North America, with potentially many millions
              within a single flock, their migration was once one of nature's
              great spectacles. Sadly, the passenger pigeon's existence came to
              an end on 1 September 1914, when the last living specimen died at
              Cincinnati Zoo. Geneticist Ben Novak is lead researcher on an
              ambitious project which now aims to bring the bird back to life
              through a process known as 'de-extinction'. The basic premise
              involves using cloning technology to turn the DNA of extinct
              animals into a fertilised embryo, which is carried by the nearest
              relative still in existence in this case, the abundant band-tailed
              pigeon - before being born as a living, breathing animal.
              Passenger pigeons are one of the pioneering species in this field,
              but they are far from the only ones on which this cutting-edge
              technology is being trialled.
            </p>
            <p>
              <b>B</b> In Australia, the thylacine, more commonly known as the
              Tasmanian tiger, is another extinct creature which genetic
              scientists are striving to bring back to life. 'There is no
              carnivore now in Tasmania that fills the niche which thylacines
              once occupied,' explains Michael Archer of the University of New
              South Wales. He points out that in the decades since the thylacine
              went extinct, there has been a spread in a 'dangerously
              debilitating' facial tumour syndrome which threatens the existence
              of the Tasmanian devils, the island's other notorious resident.
              Thylacines would have prevented this spread because they would
              have killed significant numbers of Tasmanian devils. 'If that
              contagious cancer had popped up previously, it would have burned
              out in whatever region it started. The return of thylacines to
              Tasmania could help to ensure that devils are never again
              subjected to risks of this kind.'
            </p>
            <p>
              <b>C</b> If extinct species can be brought back to life, can
              humanity begin to correct the damage it has caused to the natural
              world over the past few millennia? 'The idea of de-extinction is
              that we can reverse this process, bringing species that no longer
              exist back to life,' says Beth Shapiro of University of California
              Santa Cruz's Genomics Institute. 'I don't think that we can do
              this. There is no way to bring back something that is 100 per cent
              identical to a species that went extinct a long time ago.' A more
              practical approach for long-extinct species is to take the DNA of
              existing species as a template, ready for the insertion of strands
              of extinct animal DNA to create something new; a hybrid, based on
              the living species, but which looks and/or acts like the animal
              which died out.
            </p>
            <p>
              <b>D</b> This complicated process and questionable outcome begs
              the question: what is the actual point of this technology? 'For
              us, the goal has always been replacing the extinct species with a
              suitable replacement,' explains Novak. 'When it comes to breeding,
              band-tailed pigeons scatter and make maybe one or two nests per
              hectare, whereas passenger pigeons were very social and would make
              10,000 or more nests in one hectare.' Since the disappearance of
              this key species, ecosystems in the eastern US have suffered, as
              the lack of disturbance caused by thousands of passenger pigeons
              wrecking trees and branches means there has been minimal need for
              regrowth. This has left forests stagnant and therefore unwelcoming
              to the plants and animals which evolved to help regenerate the
              forest after a disturbance. According to Novak, a hybridised
              band-tailed pigeon, with the added nesting habits of a passenger
              pigeon, could, in theory, re-establish that forest disturbance,
              thereby creating a habitat necessary for a great many other native
              species to thrive.
            </p>
            <p>
              <b>E</b> Another popular candidate for this technology is the
              woolly mammoth. George Church, professor at Harvard Medical School
              and leader of the Woolly Mammoth Revival Project, has been
              focusing on cold resistance, the main way in which the extinct
              woolly mammoth and its nearest living relative, the Asian
              elephant, differ. By pinpointing which genetic traits made it
              possible for mammoths to survive the icy climate of the tundra,
              the project's goal is to return mammoths, or a mammoth-like
              species, to the area. 'My highest priority would be preserving the
              endangered Asian elephant,' says Church, 'expanding their range to
              the huge ecosystem of the tundra. Necessary adaptations would
              include smaller ears, thicker hair, and extra insulating fat, all
              for the purpose of reducing heat loss in the tundra, and all
              traits found in the now extinct woolly mammoth.' This repopulation
              of the tundra and boreal forests of Eurasia and North America with
              large mammals could also be a useful factor in reducing carbon
              emissions - elephants punch holes through snow and knock down
              trees, which encourages grass growth. This grass growth would
              reduce temperatures, and mitigate emissions from melting
              permafrost.
            </p>
            <p>
              <b>F</b> While the prospect of bringing extinct animals back to
              life might capture imaginations, it is, of course, far easier to
              try to save an existing species which is merely threatened with
              extinction. 'Many of the technologies that people have in mind
              when they think about de-extinction can be used as a form of
              "genetic rescue",' explains Shapiro. She prefers to focus the
              debate on how this emerging technology could be used to fully
              understand why various species went extinct in the first place,
              and therefore how we could use it to make genetic modifications
              which could prevent mass extinctions in the future. 'I would also
              say there's an incredible moral hazard to not do anything at all,'
              she continues. 'We know that what we are doing today is not
              enough, and we have to be willing to take some calculated and
              measured ri
            </p>
          </div>

          <div className="questions-right">
            <h3>Questions 14-17</h3>
            <p>Reading Passage 2 has six paragraphs, A-F.</p>
            <p>Which paragraph contains the following information?</p>
            <p>
              Write the correct letter, A-F, in boxes 14-17 on your answer
              sheet.
            </p>
            <p>
              {" "}
              <strong> NB You may use any letter more than once.</strong>
            </p>
            <ul>
              <li>
                <strong> 14 </strong>a reference to how further disappearance of
                multiple species could be avoided
              </li>
              <li>
                <strong> 15 </strong>
                explanation of a way of reproducing an extinct animal using the
                DNA of only that species
              </li>
              <li>
                <strong> 16 </strong>
                reference to a habitat which has suffered following the
                extinction of a species
              </li>
              <li>
                <strong> 17 </strong>
                mention of the exact point at which a particular species became
                extinct
              </li>
            </ul>
            <div className="question-list">
              {[...Array(4)].map((_, index) => (
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
            <br />
            <h3>Questions 19-22</h3>
            <p>
              Complete the summary below.
              <br /> Choose <strong>NO MORE THAN TWO WORDS </strong>
              from the passage for each answer. Write your answers in boxes
              18-22 on your answer sheet.
              <br /> Write your answers in boxes 19-22 on your answer sheet.
            </p>
            <br />
            <ul>
              <h4>The woolly mammoth revival project</h4>
              <li>
                {" "}
                Professor George Church and his team are trying to identify the
                <strong> 18 ......... </strong> which enabled mammoths to live
                in the tundra. The findings could help preserve the mammoth's
                close relative, the endangered Asian elephant. According to
                Church, introducing Asian elephants to the tundra would involve
                certain physical adaptations to minimise{" "}
                <strong>19 ......... </strong> To survive in the tundra, the
                species would need to have the mammoth-like features of thicker
                hair, <strong>20 ......... </strong> of a reduced size and more{" "}
                <strong>21 ......... </strong> Repopulating the tundra with
                mammoths or Asian elephant/mammoth hybrids would also have an
                impact on the environment, which could help to reduce
                temperatures and decrease <strong>22 ......... </strong> .
              </li>
            </ul>
            <div className="question-list">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 18}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 17]}
                    onChange={(e) => handleChange(index + 17, e.target.value)}
                  />
                  <span className="result">{result[index + 17]}</span>{" "}
                </div>
              ))}
            </div>
            <br />
            <h3>Questions 23-26</h3>
            <p>
              Look at the following statements (Questions 23-26) and the list of
              explorers below.
              <br />
              Match each statement with the correct person, A, B or C.
              <br /> Write the correct letter, A, B or C, in boxes 23-26 on your
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
                    <td>Ben Novak</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>B</strong>
                    </td>
                    <td>Michael Archer</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>C</strong>
                    </td>
                    <td>Beth Shapiro</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul>
              <li>
                <strong>23 </strong>Reintroducing an extinct species to its
                original habitat could improve the health of a particular
                species living there.
              </li>
              <li>
                <strong>24 </strong> It is important to concentrate on the
                causes of an animal's extinction.
              </li>
              <li>
                <strong>25 </strong> A species brought back from extinction
                could have an important beneficial impact on the vegetation of
                its habitat.
              </li>
              <li>
                <strong>26 </strong> Our current efforts at preserving
                biodiversity are insufficient.
              </li>
            </ul>
            <div className="question-list">
              {[...Array(4)].map((_, index) => (
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

            <br />
          </div>
        </div>

        <div className="reading-container">
          <div className="reading-left">
            <h2>READING PASSAGE 3</h2>
            <p>
              <i>
                You should spend about 20 minutes on Questions 27-40, which are
                based on Reading Passage 3 below.
              </i>
            </p>
            <h3>Having a laugh</h3>
            <h4>
              {" "}
              The findings of psychological scientists reveal the importance of
              humour
            </h4>

            <p>
              Humans start developing a sense of humour as early as six weeks
              old, when babies begin to laugh and smile in response to stimuli.
              Laughter is universal across all human cultures and even exists in
              some form in rats, chimps, and bonobos. Like other human emotions
              and expressions, laughter and humour provide psychological
              scientists with rich resources for studying human psychology,
              ranging from the development of language to the neuroscience of
              social perception.
            </p>
            <p>
              Theories focusing on the evolution of laughter point to it as an
              important adaptation for social communication. Take, for example,
              the recorded laughter in TV comedy shows. Back in 1950, US sound
              engineer Charley Douglass hated dealing with the unpredictable
              laughter of live audiences, so started recording his own 'laugh
              tracks'. These were intended to help people at home feel like they
              were in a social situation, such as a crowded theatre. Douglass
              even recorded various types of laughter, as well as mixtures of
              laughter from men, women, and children. In doing so, he picked up
              on a quality of laughter that is now interesting researchers: a
              simple 'haha' communicates a remarkable amount of socially
              relevant information.
            </p>
            <p>
              In one study conducted in 2016, samples of laughter from pairs of
              English-speaking students were recorded at the University of
              California, Santa Cruz. A team made up of more than 30
              psychological scientists, anthropologists, and biologists then
              played these recordings to listeners from 24 diverse societies,
              from indigenous tribes in New Guinea to city-dwellers in India and
              Europe. Participants were asked whether they thought the people
              laughing were friends or strangers. On average, the results were
              remarkably consistent: worldwide, people's guesses were correct
              approximately 60% of the time.
            </p>
            <p>
              Researchers have also found that different types of laughter serve
              as codes to complex human social hierarchies. A team led by
              Christopher Oveis from the University of California, San Diego,
              found that high-status individuals had different laughs from
              low-status individuals, and that strangers' judgements of an
              individual's social status were influenced by the dominant or
              submissive quality of their laughter. In their study, 48 male
              college students were randomly assigned to groups of four, with
              each group composed of two low-status members, who had just joined
              their college fraternity group, and two high-status members, older
              students who had been active in the fraternity for at least two
              years. Laughter was recorded as each student took a turn at being
              teased by the others, involving the use of mildly insulting
              nicknames. Analysis revealed that, as expected, high-status
              individuals produced more dominant laughs and fewer submissive
              laughs relative to the low-status individuals. Meanwhile,
              low-status individuals were more likely to change their laughter
              based on their position of power; that is, the newcomers produced
              more dominant laughter when the context allows, low-status
              individuals may achieve higher status in the eyes of others.
              However, high-status individuals were rated as high-status whether
              they produced their natural dominant laugh or tried to do a
              submissive one.
            </p>
            <p>
              Another study, conducted by David Cheng and Lu Wang of Australian
              National University, was based on the hypothesis that humour might
              provide a respite from tedious situations in the workplace. This
              'mental break' might facilitate the replenishment of mental
              resources. To test this theory, the researchers recruited 74
              business students, ostensibly for an experiment on perception.
              First, the students performed a tedious task in which they had to
              cross out every instance of the letter 'e' over two pages of text.
              The students then were randomly assigned to watch a video clip
              eliciting either humour, contentment, or neutral feelings. Some
              watched a clip of the BBC comedy Mr. Bean, others a relaxing scene
              with dolphins swimming in the ocean, and others a factual video
              about the management profession.
            </p>
            <p>
              The students then completed a task requiring persistence in which
              they were asked to guess the potential performance of employees
              based on provided profiles, and were told that making 10 correct
              assessments in a row would lead to a win. However, the software
              was programmed such that it was nearly impossible to achieve 10
              consecutive correct answers. Participants were allowed to quit the
              task at any point. Students who had watched the Mr. Bean video
              ended up spending significantly more time working on the task,
              making twice as many predictions as the other two groups.
            </p>
            <p>
              Cheng and Wang then replicated these results in a second study,
              during which they had participants complete long multiplication
              questions by hand. Again, participants who watched the humorous
              video spent significantly more time working on this tedious task
              and completed more questions correctly than did the students in
              either of the other groups.
            </p>
            <p>
              'Although humour has been found to help relieve stress and
              facilitate social relationships, the traditional view of task
              performance implies that individuals should avoid things such as
              humour that may distract them from the accomplishment of task
              goals, Cheng and Wang conclude. 'We suggest that humour is not
              only enjoyable but more importantly, energising.'
            </p>
          </div>

          {/* Phần câu hỏi (Bên phải) */}
          <div className="questions-right">
            <h3>Questions 27-31</h3>
            <p>
              Choose the correct letter <strong>, A, B, C or D.</strong> <br />
              Write the correct letter in boxes 27-31 on your answer sheet.
              <br />
            </p>
            <ul>
              <li>
                <strong> 27. </strong>
                When referring to laughter in the first paragraph, the writer
                emphasises <br />
                <strong> A </strong> its impact on language. <br />
                <strong> B </strong> its function in human culture. <br />
                <strong> C </strong> its value to scientific research. <br />
                <strong> D </strong> its universality in animal societies.{" "}
                <br />
              </li>
              <li>
                <strong> 28. </strong>
                What does the writer suggest about Charley Douglass? <br />
                <strong> A </strong> He understood the importance of enjoying
                humour in a group setting. <br />
                <strong> B </strong> He believed that TV viewers at home needed
                to be told when to laugh. <br />
                <strong> C </strong> He wanted his shows to appeal to audiences
                across the social spectrum. <br />
                <strong> D </strong> He preferred shows where audiences were
                present in the recording studio. <br />
              </li>
              <li>
                <strong> 29. </strong>
                What makes the Santa Cruz study particularly significant? <br />
                <strong> A </strong> the various different types of laughter
                that were studied. <br />
                <strong> B </strong> the similar results produced by a wide
                range of cultures. <br />
                <strong> C </strong> the number of different academic
                disciplines involved. <br />
                <strong> D </strong> the many kinds of people whose laughter was
                recorded. <br />
              </li>
              <li>
                <strong> 30. </strong>
                Which of the following happened in the San Diego study? <br />
                <strong> A </strong> Some participants became very upset. <br />
                <strong> B </strong> Participants exchanged roles. <br />
                <strong> C </strong> Participants who had not met before became
                friends. <br />
                <strong> D </strong> Some participants were unable to laugh.{" "}
                <br />
              </li>
              <li>
                <strong> 31. </strong>
                In the fifth paragraph, what did the results of the San Diego
                study suggest? <br />
                <strong> A </strong> It is clear whether a dominant laugh is
                produced by a high- or low-status person. <br />
                <strong> B </strong> Low-status individuals in a position of
                power will still produce submissive laughs. <br />
                <strong> C </strong> The submissive laughs of low- and
                high-status individuals are surprisingly similar. <br />
                <strong> D </strong> High-status individuals can always be
                identified by their way of laughing. <br />
              </li>
            </ul>
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
            <br />
            <h3>Questions 32-36</h3>
            <p>
              Complete the summary using the list of words, <strong>A-H</strong>
              , below.
              <br /> Write the correct letter, <strong>A-H</strong> , in boxes
              32-36 on your answer sheet.
            </p>
            <h3>The benefits of humour</h3>
            <p>
              In one study at Australian National University, randomly chosen
              groups of participants were shown one of three videos, each
              designed to generate a different kind of{" "}
              <strong>32...........</strong> When all participants were then
              given a deliberately frustrating task to do, it was found that
              those who had watched the <strong>33...........</strong> video
              persisted with the task for longer and tried harder to accomplish
              the task than either of the other two groups. A second study in
              which participants were asked to perform a particularly{" "}
              <strong>34...........</strong> task produced similar results.
              According to researchers David Cheng and Lu Wang, these findings
              suggest that humour not only reduces{" "}
              <strong>35...........</strong> and helps build social connections
              but it may also have a <strong>36...........</strong> effect on
              the body and mind.
            </p>
            <div className="table-container">
              <table className="explorer-table">
                <tbody>
                  <tr>
                    <td>
                      <strong>A</strong>
                    </td>
                    <td>laughter</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>B</strong>
                    </td>
                    <td>relaxing</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>C</strong>
                    </td>
                    <td>boring</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>D</strong>
                    </td>
                    <td>anxiety</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>E</strong>
                    </td>
                    <td>stimulating</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>F</strong>
                    </td>
                    <td>emotion</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>G</strong>
                    </td>
                    <td>enjoyment</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>H</strong>
                    </td>
                    <td>amusing</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul>
              <li>
                <strong>33 </strong> He referred to the relevance of the form of
                transport used.
              </li>
              <li>
                <strong>34 </strong> He described feelings on coming back home
                after a long journey.
              </li>
              <li>
                <strong>35 </strong> He worked for the benefit of specific
                groups of people.
              </li>
              <li>
                <strong>36 </strong> He did not consider learning about oneself
                an essential part of exploration.
              </li>
              <li>
                <strong>37 </strong> He defined exploration as being both unique
                and of value to others.
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

            <br />
            <h3>Questions 37-40</h3>
            <p>
              Do the following statements agree with the claims of the writer in
              Reading Passage 3?
              <br />
              In boxes 37-40 on your answer sheet, write
              <br /> <strong>TRUE</strong> if the statement agrees with the
              information
              <br /> <strong>FALSE</strong> if the statement contradicts the
              information
              <br />
              <strong>NOT GIVEN</strong> if there is no information on this
            </p>
            <ul>
              <li>
                <strong>37 </strong> Participants in the Santa Cruz study were
                more accurate at identifying the laughs of friends than those of
                strangers.
              </li>
              <li>
                <strong>38 </strong> The researchers in the San Diego study were
                correct in their predictions regarding the behaviour of the
                high-status individuals.
              </li>
              <li>
                <strong>39 </strong> The participants in the Australian National
                University study were given a fixed amount of time to complete
                the task focusing on employee profiles.
              </li>
              <li>
                <strong>39 </strong> Cheng and Wang's conclusions were in line
                with established notions regarding task performance.
              </li>
            </ul>
            <div className="question-list">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="question-item">
                  <span>{index + 37}.</span>
                  <input
                    type="text"
                    className="input-box"
                    value={userAnswers[index + 36]}
                    onChange={(e) => handleChange(index + 36, e.target.value)}
                  />
                  <span className="result">{result[index + 36]}</span>{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="exam-sidebar-reading">
        <h3>Thời gian còn lại:</h3>
        <p className="time">{formatTime(timeLeft)}</p>

        <button
          className="submit-btn"
          onClick={checkAnswers}
          disabled={!isRunning}
        >
          {isRunning ? "NỘP BÀI" : "Đã Nộp Bài"}
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

export default Reading_test2;
