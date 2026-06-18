export type TestQuestion = {
  question: string;
  options: string[];
  answer: string;
};

export type AdmissionTest = {
  testType: string;
  totalQuestions: number;
  timeAllowed: string;
  passingMarks: string;
  questions: TestQuestion[];
};

export const admissionTests: AdmissionTest[] = [
  {
    testType: "Test Type-1",
    totalQuestions: 20,
    timeAllowed: "30 minutes",
    passingMarks: "40%",
    questions: [
      { question: "Choose the correct synonym for: \"Diligent\"", options: ["Lazy", "Hardworking", "Careless", "Ignorant"], answer: "Hardworking" },
      { question: "Identify the correct sentence", options: ["He go to school everyday.", "He goes to school every day.", "He gone to school every day.", "He going to school every day."], answer: "He goes to school every day." },
      { question: "Choose the correct preposition: She is good ___ mathematics.", options: ["on", "at", "in", "with"], answer: "at" },
      { question: "Select the antonym of \"Generous\"", options: ["Kind", "Rude", "Selfish", "Noble"], answer: "Selfish" },
      { question: "Fill in the blank: He has been living in this house ___ 2010.", options: ["for", "at", "since", "from"], answer: "since" },
      { question: "If ALL PENS are TOYS, and ALL TOYS are GAMES, then ALL PENS are:", options: ["Games", "Toys", "Pens", "Books"], answer: "Games" },
      { question: "Complete the series: 2, 4, 8, 16, ___", options: ["18", "24", "32", "20"], answer: "32" },
      { question: "Find the odd one out", options: ["Square", "Circle", "Triangle", "Rectangle"], answer: "Circle" },
      { question: "Which word does not belong to the group?", options: ["Apple", "Banana", "Carrot", "Mango"], answer: "Carrot" },
      { question: "If MONDAY is coded as NQPEBZ, then FRIDAY is coded as:", options: ["GSJEBZ", "FRIHBY", "GTJCBZ", "GSPCBZ"], answer: "GSPCBZ" },
      { question: "What is 25% of 240?", options: ["50", "60", "70", "75"], answer: "60" },
      { question: "Solve: (15 × 4) – (8 ÷ 2) = ?", options: ["54", "56", "58", "60"], answer: "56" },
      { question: "What is the square root of 144?", options: ["10", "11", "12", "13"], answer: "12" },
      { question: "If x = 5, what is the value of 2x + 3?", options: ["11", "12", "13", "10"], answer: "13" },
      { question: "A car travels 60 km in 1.5 hours. What is its speed in km/h?", options: ["40", "45", "50", "55"], answer: "40" },
      { question: "Who is the current Prime Minister of Pakistan (as of 2025)?", options: ["Shahbaz Sharif", "Imran Khan", "Asif Zardari", "Nawaz Sharif"], answer: "Shahbaz Sharif" },
      { question: "What is the capital of Canada?", options: ["Toronto", "Montreal", "Vancouver", "Ottawa"], answer: "Ottawa" },
      { question: "In Islam, how many times is Salah offered daily?", options: ["3", "4", "5", "6"], answer: "5" },
      { question: "The Holy Quran was revealed in how many years?", options: ["10", "23", "25", "30"], answer: "23" },
      { question: "Who invented the light bulb?", options: ["Isaac Newton", "Thomas Edison", "Albert Einstein", "Nikola Tesla"], answer: "Thomas Edison" },
    ],
  },
  {
    testType: "Test Type-2",
    totalQuestions: 20,
    timeAllowed: "30 minutes",
    passingMarks: "40%",
    questions: [
      { question: "Choose the correct synonym for: \"Brief\"", options: ["Long", "Small", "Short", "Wide"], answer: "Short" },
      { question: "Fill in the blank: The children laughed loudly ___ the clown's performance.", options: ["at", "on", "in", "with"], answer: "at" },
      { question: "Identify the incorrect sentence", options: ["She don't like tea.", "She doesn't like tea.", "He speaks English fluently.", "They are playing in the garden."], answer: "She don't like tea." },
      { question: "Choose the correct antonym of \"Ancient\"", options: ["Modern", "Old", "Historic", "Antique"], answer: "Modern" },
      { question: "Which word is most similar in meaning to \"Expand\"?", options: ["Contract", "Reduce", "Enlarge", "Minimize"], answer: "Enlarge" },
      { question: "Which number completes the series: 3, 6, 12, 24, ___?", options: ["36", "48", "50", "60"], answer: "48" },
      { question: "Find the odd one out", options: ["Mango", "Banana", "Apple", "Potato"], answer: "Potato" },
      { question: "If 'TABLE' is coded as 'UZDNG', how is 'CHAIR' coded?", options: ["EJCKT", "FIBKS", "EDCKS", "DIBKS"], answer: "DIBKS" },
      { question: "If 2 pens cost Rs. 30, how much will 10 pens cost?", options: ["100", "120", "130", "150"], answer: "150" },
      { question: "Which is the next in the sequence: A, C, F, J, O, ___?", options: ["T", "U", "V", "W"], answer: "T" },
      { question: "What is 10% of 450?", options: ["40", "45", "50", "55"], answer: "45" },
      { question: "Simplify: 5 + (10 – 2 × 3) = ?", options: ["9", "11", "13", "7"], answer: "9" },
      { question: "A rectangle has length 8 cm and width 3 cm. What is the area?", options: ["24 cm²", "26 cm²", "20 cm²", "22 cm²"], answer: "24 cm²" },
      { question: "A shopkeeper earns 20% profit on an item sold for Rs. 600. What was the cost price?", options: ["480", "500", "520", "550"], answer: "500" },
      { question: "1/2 + 1/4 = ?", options: ["1/6", "3/4", "2/6", "5/4"], answer: "3/4" },
      { question: "Who was the first President of Pakistan?", options: ["Liaquat Ali Khan", "Iskander Mirza", "Ayub Khan", "Quaid-e-Azam"], answer: "Iskander Mirza" },
      { question: "In which Hijri year was the Holy Quran completed?", options: ["10 Hijri", "15 Hijri", "23 Hijri", "25 Hijri"], answer: "23 Hijri" },
      { question: "What is the currency of Japan?", options: ["Yuan", "Won", "Ringgit", "Yen"], answer: "Yen" },
      { question: "Which is the largest continent in the world?", options: ["Europe", "Africa", "Asia", "Australia"], answer: "Asia" },
      { question: "What is the total number of Surahs in the Quran?", options: ["114", "110", "113", "112"], answer: "114" },
    ],
  },
  {
    testType: "Test Type-3",
    totalQuestions: 20,
    timeAllowed: "30 minutes",
    passingMarks: "40%",
    questions: [
      { question: "Choose the correct synonym for \"Transparent\"", options: ["Hidden", "Clear", "Dark", "Covered"], answer: "Clear" },
      { question: "Fill in the blank: Ali is senior ___ Ahmed in experience.", options: ["from", "to", "than", "of"], answer: "to" },
      { question: "Identify the grammatically correct sentence", options: ["He don't knows the answer.", "He doesn't knew the answer.", "He doesn't know the answer.", "He isn't knew the answer."], answer: "He doesn't know the answer." },
      { question: "Choose the correct antonym of \"Permanent\"", options: ["Temporary", "Strong", "Durable", "Long-lasting"], answer: "Temporary" },
      { question: "Select the word that best completes the sentence: The students were praised for their ___ behavior.", options: ["respectful", "respect", "disrespect", "respected"], answer: "respectful" },
      { question: "Find the missing number: 5, 10, 20, 40, ___", options: ["50", "60", "70", "80"], answer: "80" },
      { question: "Which word does not belong to the group?", options: ["Pen", "Pencil", "Eraser", "Chair"], answer: "Chair" },
      { question: "If COW = 36, DOG = 26, then CAT = ?", options: ["24", "20", "30", "28"], answer: "24" },
      { question: "Which comes next in this pattern: 1, 4, 9, 16, ___?", options: ["25", "20", "30", "36"], answer: "25" },
      { question: "A is the son of B. B is the sister of C. C is the father of D. How is A related to D?", options: ["Cousin", "Brother", "Uncle", "Nephew"], answer: "Cousin" },
      { question: "If 5x = 20, then x = ?", options: ["2", "4", "5", "6"], answer: "4" },
      { question: "What is the LCM of 4 and 6?", options: ["10", "12", "14", "24"], answer: "12" },
      { question: "A shopkeeper sells an item for Rs. 120 after gaining 20% profit. What is the cost price?", options: ["96", "100", "110", "120"], answer: "96" },
      { question: "0.25 × 0.4 = ?", options: ["0.1", "0.01", "0.4", "0.5"], answer: "0.1" },
      { question: "A man buys a dozen pens for Rs. 240. What is the price of 1 pen?", options: ["Rs. 10", "Rs. 15", "Rs. 18", "Rs. 20"], answer: "Rs. 15" },
      { question: "Who was the first Prime Minister of Pakistan?", options: ["Liaquat Ali Khan", "Quaid-e-Azam", "Ayub Khan", "Khawaja Nazimuddin"], answer: "Liaquat Ali Khan" },
      { question: "How many Prophets are mentioned by name in the Holy Quran?", options: ["20", "25", "30", "40"], answer: "25" },
      { question: "What is the national animal of Pakistan?", options: ["Markhor", "Lion", "Tiger", "Leopard"], answer: "Markhor" },
      { question: "Who wrote the national anthem of Pakistan?", options: ["Hafeez Jalandhari", "Allama Iqbal", "Ahmad Nadeem Qasmi", "Faiz Ahmad Faiz"], answer: "Hafeez Jalandhari" },
      { question: "When was the first constitution of Pakistan passed?", options: ["1956", "1948", "1958", "1962"], answer: "1956" },
    ],
  },
];
