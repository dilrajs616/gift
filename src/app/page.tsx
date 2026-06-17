"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

type Chapter = {
  id: number;
  title: string;
  subtitle: string;
};

type PopHeart = {
  id: number;
  x: number;
  y: number;
};

type GameHeart = {
  id: number;
  x: number;
  y: number;
};

type Firework = {
  id: number;
  left: number;
  symbol: string;
  drift: number;
  duration: number;
};

const CHAPTERS: Chapter[] = [
  { id: 0, title: "Welcome", subtitle: "Hi Noddy ❤️" },
  { id: 1, title: "Cute Facts", subtitle: "Certified cutie stats" },
  { id: 2, title: "Teddy Room", subtitle: "Plushie paradise for my princess" },
  { id: 3, title: "Love Letter", subtitle: "Envelope from my heart" },
  { id: 4, title: "Funny Quiz", subtitle: "There is only one correct answer" },
  { id: 5, title: "No Challenge", subtitle: "Impossible to say no" },
  { id: 6, title: "Gift Unboxing", subtitle: "Tiny surprises for my angel" },
  { id: 7, title: "Mini Games", subtitle: "Cutie champion arena" },
  { id: 8, title: "Secret Room", subtitle: "Type password to unlock" },
  { id: 9, title: "Finale", subtitle: "One final question..." },
];

const NICKNAMES = [
  "Noddy",
  "Angel",
  "Princess",
  "Sweetpea",
  "Cupcake",
  "Honeybun",
  "Sunshine",
  "Babycakes",
  "Sweet Sugar",
  "My Favourite Human",
  "My Tiny Menace",
  "My Queen",
  "Mithu"
];

const FACTS = [
  "World's cutest Noddy",
  "Professional heart thief",
  "Certified chai lover",
  "99% adorable",
  "1% extra adorable",
  "Causes uncontrollable smiling",
  "Giggling inspector",
  "Nonchalant Queen",
];

const QUIZ_QUESTIONS = [
  {
    q: "Who is the cutest person alive?",
    options: ["Noddy", "Noddy", "Noddy", "Obviously Noddy"],
  },
  {
    q: "Who wins at making me blush every time?",
    options: ["My Queen", "My Angel", "My Princess", "All of the above"],
  },
  {
    q: "Who is my favourite human forever?",
    options: ["Noddy", "Sweet Little Babyyyy", "My Bihari Baddie", "Every option is You"],
  },
];

const NO_STAGES = [
  "No",
  "Nope",
  "Are you sure?",
  "Really really sure?",
  "Think again",
  "Oops",
  "Still no?",
  "Teleporting...",
  "Tiny no",
  "Okay fine, Yes",
];

const NO_QUESTIONS = [
  "Do you love surprises, Noddy?",
  "Should Noddy receive lifetime VIP treatment with unlimited hugs?",
];

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [typed, setTyped] = useState("");
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [secretInput, setSecretInput] = useState("");
  const [factsCollected, setFactsCollected] = useState<number[]>([]);
  const [teddyMessage, setTeddyMessage] = useState("Click a teddy for a surprise.");
  const [giftOpened, setGiftOpened] = useState<number[]>([]);
  const [quizStep, setQuizStep] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [noStage, setNoStage] = useState(0);
  const [noQuestionStep, setNoQuestionStep] = useState(0);
  const [noPosition, setNoPosition] = useState({ left: 0, top: 0, rotate: 0 });
  const [showFinale, setShowFinale] = useState(false);
  const [popHearts, setPopHearts] = useState<PopHeart[]>([]);
  const [popTimer, setPopTimer] = useState(0);
  const [popTargets, setPopTargets] = useState<GameHeart[]>([]);
  const [popScore, setPopScore] = useState(0);
  const [feedScore, setFeedScore] = useState(0);
  const [findTarget, setFindTarget] = useState(() => Math.floor(Math.random() * 6));
  const [findScore, setFindScore] = useState(0);
  const [findFeedback, setFindFeedback] = useState<"idle" | "success" | "fail">("idle");
  const [wrongPick, setWrongPick] = useState<number | null>(null);
  const [findFx, setFindFx] = useState(0);
  const [treatStash, setTreatStash] = useState(0);
  const [collectFx, setCollectFx] = useState(0);
  const [feedFx, setFeedFx] = useState(0);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [easterCount, setEasterCount] = useState(0);
  const [easterMsg, setEasterMsg] = useState("Find hidden stars and type secret words ✨");
  const popGameActive = popTimer > 0;
  const play = useCallback(() => {}, []);
  const secretWord = secretInput.trim().toLowerCase();
  const chelloUnlocked = secretWord === "rohit saraf";

  const secretHint = useMemo(() => {
    if (!secretWord) return "Hint: He was in mismatched 💭";
    if (chelloUnlocked) return "Passcode accepted. Secret door opened for cutie hacker ✨";
    if ("rohit saraf".startsWith(secretWord)) {
      return "Ayyo, very close! Keep typing, my angel 👀";
    }
    if (secretWord.includes("roh")) return "You are warm... almost there, Noddy 😌";
    if (secretWord.startsWith("r")) return "Good start! The word is feeling shy 🙈";
    return "Nope, that's not it. Try your favourite nickname path 🌸";
  }, [chelloUnlocked, secretWord]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const next = `${typed}${event.key.toLowerCase()}`.slice(-16);
      setTyped(next);
      if (next.includes("mithu")) {
        setEasterCount((v) => v + 1);
        setEasterMsg("Special mode: Noddy heart storm activated 💖");
        play();
      }
      if (next.includes("chellam")) {
        setSecretUnlocked(true);
        setChapter(8);
        setEasterCount((v) => v + 1);
        setEasterMsg("Secret room unlocked for Chellam!");
        play();
      }
      if (next.includes("paapa")) {
        setEasterCount((v) => v + 1);
        setEasterMsg("Paapa mode: raining hearts incoming!");
        setShowFinale(true);
        play();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [typed, play]);

  useEffect(() => {
    if (popTimer <= 0) return;
    const timer = window.setTimeout(() => setPopTimer((v) => v - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [popTimer]);

  useEffect(() => {
    if (!popGameActive) return;
    const interval = window.setInterval(() => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setPopTargets((prev) => [
        ...prev.slice(-10),
        { id, x: Math.random() * 86, y: Math.random() * 65 },
      ]);
      window.setTimeout(() => {
        setPopTargets((prev) => prev.filter((item) => item.id !== id));
      }, 1000);
    }, 420);
    return () => window.clearInterval(interval);
  }, [popGameActive]);

  const nextChapter = () => {
    setChapter((prev) => Math.min(prev + 1, CHAPTERS.length - 1));
    play();
  };

  const prevChapter = () => {
    setChapter((prev) => Math.max(prev - 1, 0));
    play();
  };

  const floatingIcons = useMemo(
    () => Array.from({ length: 24 }, (_, i) => ({ id: i, left: (i * 11) % 100 })),
    [],
  );

  const noButtonStyle = useMemo(() => {
    const base = {
      left: "0%",
      top: "0%",
      transform: "none",
      opacity: 1,
      scale: 1,
    };
    if (noStage >= 1) base.left = `${noPosition.left}%`;
    if (noStage >= 2) base.top = `${noPosition.top}%`;
    if (noStage >= 3) base.transform = `rotate(${noPosition.rotate}deg)`;
    if (noStage >= 4) base.scale = 0.8;
    if (noStage >= 5) base.scale = 0.65;
    if (noStage >= 6) base.scale = 0.45;
    if (noStage >= 7) base.scale = 0.32;
    if (noStage >= 8) base.opacity = 0.2;
    if (noStage >= 9) base.opacity = 1;
    return base;
  }, [noStage, noPosition.left, noPosition.rotate, noPosition.top]);

  const advanceNoStage = () => {
    setNoStage((value) => Math.min(value + 1, 9));
    setNoPosition({
      left: Math.random() * 60,
      top: Math.random() * 40,
      rotate: Math.random() * 320,
    });
  };

  const triggerFinale = () => {
    setShowFinale(true);
    setEasterCount((v) => v + 5);
    const symbols = ["💖", "✨", "💗", "🎆", "🎇"];
    const burst = Array.from({ length: 32 }, (_, i) => ({
      id: Date.now() + i,
      left: 5 + Math.random() * 90,
      symbol: symbols[i % symbols.length],
      drift: -30 + Math.random() * 60,
      duration: 1.2 + Math.random() * 1.2,
    }));
    setFireworks(burst);
    window.setTimeout(() => setFireworks([]), 2600);
    play();
  };

  const chapterContent = () => {
    if (!started) {
      return (
        <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-10 text-center sm:py-14">
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-6xl"
          >
            🧸💌
          </motion.div>
          <h1 className="text-4xl font-bold text-pink-700 sm:text-5xl">Hi Noddy ❤️</h1>
          <p className="text-lg text-violet-700">I made something for you, my princess...</p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.03 }}
            animate={shouldReduceMotion ? {} : { boxShadow: ["0 0 0", "0 0 30px #f9a8d4", "0 0 0"] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-violet-400 px-9 py-4 text-lg font-bold text-white shadow-2xl"
            onClick={() => {
              setStarted(true);
              play();
            }}
          >
            Open Your Surprise ✨
          </motion.button>
        </section>
      );
    }

    switch (chapter) {
      case 0:
        return (
          <section className="space-y-5 text-center">
            <h2 className="text-3xl font-bold text-pink-700">Welcome, My Angel 👑</h2>
            <p className="text-violet-800">
              This is part love letter, part cute game, and part tiny chaos museum made only for{" "}
              <span className="font-semibold">My Favourite Human</span>.
            </p>
            <div className="rounded-3xl bg-white/70 p-5 shadow-lg backdrop-blur">
              <p className="text-sm text-rose-700">
                Cutie notes: Masala Chai approved, making me blush ongoing, Delhi weather
                still dramatic (just like you).
              </p>
            </div>
          </section>
        );
      case 1:
        return (
          <section className="space-y-4">
            <h2 className="text-center text-3xl font-bold text-pink-700">Cute Facts About Noddy</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {FACTS.map((fact, i) => {
                const selected = factsCollected.includes(i);
                return (
                  <motion.button
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    key={fact}
                    className={`rounded-2xl border-2 p-4 text-left shadow-md transition ${
                      selected
                        ? "border-pink-300 bg-pink-100 text-pink-700"
                        : "border-violet-200 bg-white/90"
                    }`}
                    onClick={() => {
                      setFactsCollected((prev) =>
                        prev.includes(i) ? prev : [...prev, i],
                      );
                      setEasterCount((v) => v + 1);
                      play();
                    }}
                  >
                    <p className="font-semibold">{fact}</p>
                    <p className="text-xs text-violet-700">
                      {selected ? "Collected! 💗" : "Tap to collect"}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </section>
        );
      case 2:
        return (
          <section className="space-y-5 text-center">
            <h2 className="text-3xl font-bold text-pink-700">Teddy Bear Gift Room 🧸</h2>
            <p className="text-violet-700">{teddyMessage}</p>
            <div className="grid grid-cols-3 gap-3">
              {["🧸", "🧸💤", "🧸💃", "🧸❤️", "🧸⭐", "🧸🎀"].map((teddy, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.08, rotate: idx === 5 ? 5 : 0 }}
                  className="rounded-2xl bg-white/80 p-4 text-3xl shadow-md"
                  onClick={() => {
                    const messages = [
                      "Chello unlocked: unlimited hugs pass 🎫",
                      "Sleeping teddy says: nap with paapa mode on 😴",
                      "Dancing teddy says: U da BESTESTEST 💃",
                      "Heart teddy says: Babyyyyyy, you're magic ❤️",
                      "Hidden teddy says: I believe in June Theory!",
                      "Ribbon teddy says: My tiny menace is too cute.",
                    ];
                    setTeddyMessage(messages[idx]);
                    if (idx === 4 || idx === 5) setEasterCount((v) => v + 1);
                    play();
                  }}
                >
                  {teddy}
                </motion.button>
              ))}
            </div>
          </section>
        );
      case 3:
        return (
          <section className="space-y-4 text-center">
            <h2 className="text-3xl font-bold text-pink-700">Confession Room 💌</h2>
            <motion.div
              initial={{ rotateX: 20, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              className="rounded-3xl border border-rose-200 bg-white/90 p-6 text-left shadow-xl"
            >
              <p className="mb-2 text-sm text-rose-400">Dear {NICKNAMES[1]},</p>
              <p className="text-violet-800">
                Thank god I opened omegle that night and met you 🧑‍💻🌙! It's been 8 months but we have barely talked, yet it feels like we have known each other for years ⏳💞. I'm soooo glad that we met and even more glad you're in my life 🌸🧸. 

                I feel incredibly lucky 🍀✨ to have you in my world. You are the purest 🫧 and most genuine person I have ever met. You have the cleanest and sweetest heart 💖🫀. You are honest 🕊️, you are kind 🧁, you are innocent 🍼, you are pure 🌸, you are perfect just the way you are 🦋.

                It's like you have hijacked both my heart 💖🫰 and my mind 🧠💞! I think about you alllllll the time 💭🥰. Not complaining though – you can live in my heart rent free forever 🏡❤️.

                I want to tell you just how special you are, Noddy🧸💕. You are INCREDIBLE 🌟💫. You’re soooo effortlessly adorable 🥺💗! It’s so easy to talk and open up to you 🗣️🤗. 

                You always make me feel important and loved 👑🌈, truly a beautiful (and rare!) thing 🎖️💝. You always know how to cheer me up 😚🦄. You are CUTE 🥰, funny 😂, smart 🧠, gorgeous 😍, adorable 🧸, mature 🌱, and an ultra cute goofball 🤪. 

                I LOVE your laugh! It's sooooo contagious 🤭💞, nobody can help but smile when you giggle 😄🫠. Your eyes are mesmerizing 👀✨, I could stare at them forever 🥹. Your face is a work of art 💎🎨.

                Your skin tone glows like sunshine 🌻☀️, your style and personality are so unique 🎨🌈. Your aura is peaceful and calming 🕊️⛅ but also super energizing and exciting ⚡💃! How are you both soothing and chaotic at the same time? 🧸🎢

                You are the perfect combo of everything magical 🪄💗. You are my smile upgrade 😁✨, my calm place 🫶🏡.

              </p>
              <p className="mt-3 text-violet-800">
                I want to see you win 🏆💖 and thrive in your life 🌸✨. I want to see you succeed 🥇 and be happy 😊🌈! I want to see you smile 😁 and laugh 😂. I want to see you be you 🫶💗. I want to see you be happy 😻, I want to see you be successful 🌟. I want to see you giggle 🤭 and shine bright like the sunshine you are ☀️! I pray for your happiness ✨🩷 and your health 🧸🍀 always.

                You deserve every good thing in the world 🥺🧸💖. I’ll always be your #1 cheerleader 📣, praying for your success ✨🏅 and your cutest everlasting smile 🥰.
                           
                You don&apos;t always show it, but you are totally a baby at heart 👶💕 (cutest one!!) — and you do overthink things sometimes 🤔💭. I just want to scoop you up and hold you close forever 🤗🧸, to let you know that I'm ALWAYS here for you.

                Never think that you are bothering me, okay? 🚫🐝 I LOVE talking to you and hearing your voice 🎤💬. You are never alone, I am always here for you, always will be 🌙🩷. 

                Everything is okay and YOU are safe, my Noddy 🩷. If life ever feels overwhelming 🏃‍♀️💨 or you just need to vent 🌈, I'm here for you 💌. This space is your safe place, always 🏡✨.

                You reignited a spark in my life 🪄🔥💖, and I'll always be grateful for that 🙏🌸. You are SO special to me 🥹💘. Thank you for being exactly you, my angel 🧸💝. I love you more than all the Teddy Bears in the world 💖🧸!
           
              </p>
              <p className="mt-4 text-sm text-rose-500">Forever rooting for you ❤️</p>
            </motion.div>
          </section>
        );
      case 4:
        return (
          <section className="space-y-4 text-center">
            <h2 className="text-3xl font-bold text-pink-700">Funny Relationship Quiz 😌</h2>
            {!quizDone ? (
              <div className="rounded-2xl bg-white/90 p-5 shadow-md">
                <p className="font-semibold text-violet-800">{QUIZ_QUESTIONS[quizStep].q}</p>
                <div className="mt-4 grid gap-2">
                  {QUIZ_QUESTIONS[quizStep].options.map((option, optionIndex) => (
                    <button
                      key={`${option}-${optionIndex}`}
                      onClick={() => {
                        play();
                        if (quizStep === QUIZ_QUESTIONS.length - 1) setQuizDone(true);
                        else setQuizStep((s) => s + 1);
                      }}
                      className="rounded-xl bg-pink-100 px-3 py-2 font-medium text-pink-700"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="rounded-2xl bg-emerald-100 p-4 font-semibold text-emerald-700">
                Perfect score unlocked for Sweet Noddy 💯
              </p>
            )}
          </section>
        );
      case 5:
        return (
          <section className="relative min-h-72 space-y-4 overflow-hidden text-center">
            <h2 className="text-3xl font-bold text-pink-700">Impossible To Say No 😏</h2>
            <p className="text-violet-700">{NO_QUESTIONS[noQuestionStep]}</p>
            <div className="relative flex items-center justify-center gap-4 pt-8">
              <button
                className="z-20 rounded-full bg-emerald-400 px-8 py-4 text-lg font-bold text-white shadow-xl"
                onClick={() => {
                  if (noQuestionStep < NO_QUESTIONS.length - 1) {
                    setNoQuestionStep((v) => v + 1);
                    setNoStage(0);
                    setNoPosition({ left: 0, top: 0, rotate: 0 });
                    setEasterMsg("Nice answer. One more impossible question...");
                    play();
                    return;
                  }
                  setEasterMsg("Correct answer detected. Hug protocol enabled.");
                  setEasterCount((v) => v + 3);
                  setNoQuestionStep(0);
                  setNoStage(0);
                  setNoPosition({ left: 0, top: 0, rotate: 0 });
                  nextChapter();
                  play();
                }}
              >
                YES
              </button>
              <button
                style={{
                  position: noStage === 0 ? "relative" : "absolute",
                  ...noButtonStyle,
                  transform: `${noButtonStyle.transform} scale(${noButtonStyle.scale})`,
                  opacity: noButtonStyle.opacity,
                }}
                onMouseEnter={advanceNoStage}
                onClick={advanceNoStage}
                className="z-20 rounded-full bg-rose-300 px-8 py-4 text-lg font-bold text-rose-800 shadow-xl transition"
              >
                {NO_STAGES[noStage]}
              </button>
            </div>
            <p className="text-xs text-violet-500">
              First both buttons are fair. Then chaos begins if &quot;No&quot; is brave enough.
            </p>
          </section>
        );
      case 6:
        return (
          <section className="space-y-4 text-center">
            <h2 className="text-3xl font-bold text-pink-700">Virtual Gift Unboxing 🎁</h2>
            <div className="grid grid-cols-2 gap-3">
              {["🎁", "🎀", "💝", "📦"].map((gift, i) => {
                const open = giftOpened.includes(i);
                return (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    key={i}
                    className="rounded-2xl bg-white/90 p-5 text-4xl shadow"
                    onClick={() => {
                      if (!open) setGiftOpened((v) => [...v, i]);
                      setEasterCount((v) => v + 1);
                      play();
                    }}
                  >
                    {open ? "💖" : gift}
                    <p className="mt-2 text-xs text-violet-700">
                      {open ? "Love coupon unlocked!" : "Tap to open"}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </section>
        );
      case 7:
        return (
          <section className="space-y-4">
            <h2 className="text-center text-3xl font-bold text-pink-700">Mini Games 🎮</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl bg-white/90 p-4 shadow">
                <p className="font-semibold text-violet-800">Find Noddy</p>
                <p className="text-xs text-violet-600">Keep tapping until you find Noddy.</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.button
                      key={i}
                      animate={
                        wrongPick === i
                          ? { x: [0, -6, 6, -4, 4, 0] }
                          : { x: 0 }
                      }
                      onClick={() => {
                        if (i === findTarget) {
                          setFindScore((v) => v + 1);
                          setEasterMsg("You found Noddy plushie!");
                          setEasterCount((v) => v + 1);
                          setFindFeedback("success");
                          setFindFx((v) => v + 1);
                          const id = Date.now();
                          setPopHearts((prev) => [...prev, { id, x: 46, y: 62 }]);
                          window.setTimeout(() => {
                            setPopHearts((prev) => prev.filter((item) => item.id !== id));
                          }, 700);
                          play();
                          setFindTarget(Math.floor(Math.random() * 6));
                        } else {
                          setWrongPick(i);
                          setFindFeedback("fail");
                          setFindFx((v) => v + 1);
                          window.setTimeout(() => setWrongPick(null), 250);
                          play();
                        }
                      }}
                      className="rounded-lg bg-violet-100 p-2"
                    >
                      🧸
                    </motion.button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  {findFeedback === "success" ? (
                    <motion.p
                      key={`find-ok-${findFx}`}
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mt-2 text-sm font-semibold text-emerald-700"
                    >
                      🎉 Noddy found! Bonus cuteness unlocked.
                    </motion.p>
                  ) : findFeedback === "fail" ? (
                    <motion.p
                      key={`find-fail-${findFx}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mt-2 text-sm font-semibold text-rose-700"
                    >
                      🙈 Not Noddy. Try another teddy!
                    </motion.p>
                  ) : null}
                </AnimatePresence>
                <button
                  className="mt-2 rounded-lg bg-violet-200 px-3 py-1 text-sm text-violet-800"
                  onClick={() => {
                    setFindScore(0);
                    setFindFeedback("idle");
                    setFindTarget(Math.floor(Math.random() * 6));
                  }}
                >
                  Reset Score
                </button>
                <p className="mt-1 text-sm text-violet-700">Score: {findScore}</p>
              </article>
              <article className="rounded-2xl bg-white/90 p-4 shadow">
                <p className="font-semibold text-violet-800">Pop The Hearts</p>
                <button
                  className="mt-2 rounded-lg bg-rose-100 px-3 py-2 text-rose-700"
                  onClick={() => {
                    setPopScore(0);
                    setPopTargets([]);
                    setPopTimer(12);
                    play();
                  }}
                >
                  {popGameActive ? `Popping... ${popTimer}s` : "Start Pop Rush 💗"}
                </button>
                <div className="relative mt-3 h-36 rounded-xl bg-rose-50">
                  {popTargets.map((heart) => (
                    <button
                      key={heart.id}
                      style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
                      className="absolute text-2xl"
                      onClick={() => {
                        setPopScore((v) => v + 1);
                        setPopTargets((prev) => prev.filter((item) => item.id !== heart.id));
                        const id = Date.now();
                        setPopHearts((prev) => [...prev, { id, x: heart.x, y: heart.y }]);
                        window.setTimeout(() => {
                          setPopHearts((prev) => prev.filter((item) => item.id !== id));
                        }, 600);
                        play();
                      }}
                    >
                      💗
                    </button>
                  ))}
                </div>
                <p className="mt-1 text-sm text-violet-700">Popped: {popScore}</p>
              </article>
              <article className="rounded-2xl bg-white/90 p-4 shadow">
                <p className="font-semibold text-violet-800">Feed The Teddy</p>
                <p className="text-xs text-violet-600">Collect hearts, then feed teddy.</p>
                <button
                  className="mt-2 rounded-lg bg-pink-100 px-3 py-2 text-pink-700"
                  onClick={() => {
                    setTreatStash((v) => v + 1);
                    setCollectFx((v) => v + 1);
                    play();
                  }}
                >
                  Collect Treat ❤️
                </button>
                <button
                  className="ml-2 mt-2 rounded-lg bg-amber-100 px-3 py-2 text-amber-700 disabled:opacity-50"
                  disabled={treatStash === 0}
                  onClick={() => {
                    setTreatStash((v) => Math.max(v - 1, 0));
                    setFeedScore((v) => v + 1);
                    setFeedFx((v) => v + 1);
                    play();
                  }}
                >
                  Feed Teddy 🧸
                </button>
                <AnimatePresence mode="wait">
                  {collectFx > feedFx ? (
                    <motion.p
                      key={`collect-${collectFx}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mt-2 text-sm font-semibold text-pink-700"
                    >
                      ✨ Treat collected!
                    </motion.p>
                  ) : null}
                </AnimatePresence>
                <p className="mt-1 text-sm text-violet-700">
                  Stash: {treatStash} • Fed: {feedScore}
                </p>
                <motion.p
                  key={`teddy-${feedFx}`}
                  initial={{ scale: 1, rotate: 0 }}
                  animate={feedFx > 0 ? { scale: [1, 1.15, 1], rotate: [0, -4, 4, 0] } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-lg"
                >
                  {feedScore >= 10 ? "🧸🥰 Full and happy!" : "🧸"}
                </motion.p>
              </article>
            </div>
          </section>
        );
      case 8:
        return (
          <section className="space-y-4 text-center">
            <h2 className="text-3xl font-bold text-pink-700">Secret Message Room 🔐</h2>
            <p className="text-violet-800">
              {secretUnlocked
                ? "Unlocked by typing Rohit Saraf. You are officially the cutest hacker."
                : "Hint: type your favorite celebrity on your keyboard."}
            </p>
            <div className="rounded-2xl bg-violet-50 p-4 text-left shadow">
              <label htmlFor="secret-word" className="mb-2 block text-sm font-semibold text-violet-700">
                Type the passcode to unlock next page:
              </label>
              <input
                id="secret-word"
                type="text"
                value={secretInput}
                onChange={(event) => setSecretInput(event.target.value)}
                placeholder="Try your celebrity crush"
                className="w-full rounded-xl border border-violet-200 bg-white px-3 py-2 text-violet-800 outline-none focus:border-pink-300"
              />
              <p className={`mt-2 text-xs ${chelloUnlocked ? "text-emerald-700" : "text-violet-600"}`}>
                {secretHint}
              </p>
            </div>
            <div className="rounded-2xl bg-white/90 p-5 shadow">
              <p className="font-semibold text-rose-700">
                Hidden Message: You are my hot chai on tough days and my chocolate on fun days.
              </p>
            </div>
          </section>
        );
      default:
        return (
          <section className="space-y-5 text-center">
            <h2 className="text-3xl font-bold text-pink-700">Final Grand Finale 🎆</h2>
            <div className="space-y-2 text-violet-800">
              <p>After all these pages...</p>
              <p>After all these surprises...</p>
              <p className="font-semibold">I have one final question...</p>
            </div>
            <motion.article
              animate={shouldReduceMotion ? {} : { scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="rounded-3xl bg-white p-6 shadow-xl"
            >
              <p className="text-xl font-bold text-rose-700">
                Noddy, will you keep being my favourite person forever? ❤️
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {["YES", "ABSOLUTELY YES"].map((answer) => (
                  <button
                    key={answer}
                    onClick={triggerFinale}
                    className="rounded-full bg-gradient-to-r from-pink-400 to-violet-400 px-6 py-3 font-bold text-white"
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </motion.article>
            {showFinale ? (
              <p className="rounded-2xl bg-emerald-100 p-4 text-lg font-bold text-emerald-700">
                You unlocked the happiest ending ❤️
              </p>
            ) : null}
          </section>
        );
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-pink-100 via-violet-100 to-blue-100 px-4 py-6 text-slate-800">
      {floatingIcons.map((icon) => (
        <motion.span
          key={icon.id}
          animate={shouldReduceMotion ? {} : { y: [0, -18, 0] }}
          transition={{ repeat: Infinity, duration: 3 + (icon.id % 4) }}
          className="pointer-events-none absolute text-xl opacity-40"
          style={{
            left: `${icon.left}%`,
            top: `${(icon.id * 29) % 100}%`,
          }}
        >
          {icon.id % 3 === 0 ? "💖" : icon.id % 3 === 1 ? "✨" : "⭐"}
        </motion.span>
      ))}

      {popHearts.map((heart) => (
        <motion.span
          key={heart.id}
          initial={{ scale: 0.2, opacity: 1, x: `${heart.x}vw`, y: `${heart.y}vh` }}
          animate={{ scale: 1.4, opacity: 0 }}
          className="pointer-events-none absolute z-40 text-3xl"
        >
          💗
        </motion.span>
      ))}

      {fireworks.map((item) => (
        <motion.span
          key={item.id}
          initial={{ opacity: 0, y: "88vh", x: `${item.left}vw`, scale: 0.6 }}
          animate={{ opacity: [0, 1, 1, 0], y: "8vh", x: `${item.left + item.drift / 10}vw`, scale: [0.6, 1.2, 1] }}
          transition={{ duration: item.duration, ease: "easeOut" }}
          className="pointer-events-none absolute z-50 text-3xl"
        >
          {item.symbol}
        </motion.span>
      ))}

      <div className="mx-auto max-w-4xl">
        <header className="mb-5 flex items-center justify-between gap-3 rounded-2xl bg-white/70 p-3 shadow-md backdrop-blur">
          <div>
            <p className="text-sm font-semibold text-pink-600">For Noddy 💖</p>
            <p className="text-xs text-violet-700">
              Easter Eggs found: {easterCount} / 15+ • {easterMsg}
            </p>
          </div>
          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            Silent mode 🌙
          </span>
        </header>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.section
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[65vh] flex-col items-center justify-center gap-4 text-center"
            >
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
                className="text-7xl"
              >
                🧸💝
              </motion.div>
              <p className="text-lg font-semibold text-violet-700">
                Teddy is carrying your surprise, Noddy...
              </p>
            </motion.section>
          ) : (
            <motion.section
              key={`${chapter}-${started}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-3xl border border-pink-200 bg-gradient-to-b from-white/80 to-rose-50/70 p-5 shadow-xl backdrop-blur sm:p-8"
            >
              {started ? (
                <div className="mb-5 rounded-2xl bg-violet-50 p-3 text-center">
                  <p className="text-sm font-semibold text-violet-700">
                    Chapter {chapter + 1}: {CHAPTERS[chapter].title}
                  </p>
                  <p className="text-xs text-violet-500">{CHAPTERS[chapter].subtitle}</p>
                </div>
              ) : null}
              {chapterContent()}
            </motion.section>
          )}
        </AnimatePresence>

        {!loading && started ? (
          <nav className="mt-5 flex items-center justify-between gap-3">
            <button
              onClick={prevChapter}
              disabled={chapter === 0}
              className="rounded-full bg-white/80 px-5 py-2 font-semibold text-violet-700 disabled:opacity-40"
            >
              ← Back
            </button>
            <button
              onClick={nextChapter}
              disabled={chapter >= CHAPTERS.length - 1 || (chapter === 8 && !chelloUnlocked)}
              className="rounded-full bg-pink-400 px-6 py-2 font-bold text-white disabled:opacity-40"
            >
              Next Surprise →
            </button>
          </nav>
        ) : null}
      </div>
    </main>
  );
}
