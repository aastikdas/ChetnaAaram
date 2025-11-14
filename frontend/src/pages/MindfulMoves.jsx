import React from 'react';

export default function MindfulMoves(){
  const exercises = [
    {
      title: "Box Breathing",
      description: "A rhythmic breathing technique to calm the nervous system.",
      details: (
        <ol className="list-decimal list-inside text-sm description-text mt-2">
          <li>Inhale for 4 seconds.</li>
          <li>Hold for 4 seconds.</li>
          <li>Exhale for 4 seconds.</li>
          <li>Hold for 4 seconds. Repeat 4 times.</li>
        </ol>
      ),
      note: "Great for immediate regulation — do this at your desk or seated comfortably."
    },
    {
      title: "4-7-8 Breathing",
      description: "A controlled breathing cycle known to induce relaxation.",
      note: "For improving sleep onset and reducing anxiety symptoms.",
    },
    {
      title: "Grounding (5-4-3-2-1)",
      description: "A sensory-focused grounding technique to reduce overwhelm.",
      note: "For panic, anxiety, and dissociation episodes."
    },
    {
      title: "Gentle Movement",
      description: "Light activity to reconnect body and mind.",
      note: "For reducing cortisol and improving emotional regulation."
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Systematic tensing and releasing of muscle groups.",
      note: "For tension headaches, stress, and sleep improvement."
    },
    {
      title: "Mindful Observation",
      description: "Focused visual awareness on a single object.",
      note: "For grounding during mild anxiety or overstimulation."
    },
    {
      title: "Alternate Nostril Breathing",
      description: "A yogic breathing practice balancing nervous system activity.",
      note: "For reducing stress and balancing autonomic responses."
    },
    {
      title: "Body Scan",
      description: "Slow, mindful awareness through each body part.",
      note: "Clinically suggested in mindfulness-based therapy for reducing anxiety and pain.",
    },
    {
      title: "Visualization",
      description: "Imagining a calming scenario or place.",
      note: "For reducing physiological arousal and anxiety."
    },
    {
      title: "Counting Breath",
      description: "A simple awareness exercise using numbered breathing cycles.",
      note: "For improving attention and reducing stress."
    },
    {
      title: "Shoulder Roll Reset",
      description: "Releases upper body tension with slow shoulder rotations.",
      note: "For muscle tension relief during prolonged sitting."
    },
    {
      title: "Mindful Walking",
      description: "Awareness-centered walking practice.",
      note: "For mood regulation and grounding.",
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <style>{`
        .title-text { font-size: 1.05rem; font-weight: 600; color: #1e293b; }
        .description-text { color: #475569; font-size: 0.9rem; margin-top: 0.4rem; }
        .note-text { color: #334155; font-size: 0.8rem; font-style: italic; margin-top: 0.35rem; }
      `}</style>

      <header className="mb-6">
        <h1 className="text-3xl font-extrabold">Mindful Moves</h1>
        <p className="text-slate-600 mt-2">Exercises, breathing and grounding routines to practice.</p>
      </header>

      <section>
        <div className="grid gap-4 md:grid-cols-2 ">
          {exercises.map((ex, i) => (
            <div key={i} className="transition-all duration-1000 
                  rounded-xl border border-black 
                  bg-gradient-to-br from-yellow-100 to-green-400 
                  p-6 shadow hover:shadow-lg 
                  hover:from-green-400 hover:to-yellow-100
                  hover:bg-gradient-to-br
                  hover:border-calmBlue
                  hover:bg-mint/40
                  cursor-pointer">
              <h3 className="title-text">{ex.title}</h3>

              {ex.details ? (
                ex.details
              ) : (
                <p className="description-text">{ex.description}</p>
              )}

              <p className="note-text">{ex.note}</p>

            </div>
          ))}
        </div>
      </section>

      <footer className="mt-8 text-sm text-slate-500">
        <p>These resources are for general relaxation and stress-management. If you're in crisis or need urgent help, please contact local emergency services or a trusted professional.</p>
      </footer>
    </div>
  );
}
