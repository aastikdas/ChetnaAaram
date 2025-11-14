import React from 'react';

export default function CalmCinema() {
    return (
        <div className="max-w-5xl mx-auto p-6">
            <header className="mb-6">
                <h1 className="text-3xl font-extrabold">Calm Cinema</h1>
                <p className="text-slate-600 mt-2">Short guided meditations and tutorials to watch.</p>
            </header>

            <section>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-white/80 rounded-lg p-3 shadow">
                        <h4 className="font-semibold">5-Minute Calming Breathwork</h4>
                        <div className="aspect-video w-full overflow-hidden rounded mt-2">
                            <iframe
                                title="5-Minute Calming Breathwork"
                                width="100%"
                                height={260}
                                src="https://www.youtube.com/embed/9fEo9my03Ks"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>


                    <div className="bg-white/80 rounded-lg p-3 shadow">
                        <h4 className="font-semibold">Body Scan (10 min)</h4>
                        <div className="aspect-video w-full overflow-hidden rounded mt-2">
                            <iframe title="Body Scan" width="100%" height={260} src="https://www.youtube.com/embed/inpok4MKVLM" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        </div>
                    </div>

                    <div className="bg-white/80 rounded-lg p-3 shadow">
                        <h4 className="font-semibold">Stress Management Basics</h4>
                        <div className="aspect-video w-full overflow-hidden rounded mt-2">
                            <iframe title="Stress Management Basics" width="100%" height={260} src="https://www.youtube.com/embed/odADwWzHR24" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        </div>
                    </div>

                    <div className="bg-white/80 rounded-lg p-3 shadow">
                        <h4 className="font-semibold">Progressive Muscle Relaxation</h4>
                        <div className="aspect-video w-full overflow-hidden rounded mt-2">
                            <iframe title="Progressive Muscle Relaxation" width="100%" height={260} src="https://www.youtube.com/embed/ihO02wUzgkc" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        </div>
                    </div>
                    <div className="bg-white/80 rounded-lg p-3 shadow">
  <h4 className="font-semibold">5-Minute Walking Meditation</h4>
  <div className="aspect-video w-full overflow-hidden rounded mt-2">
    <iframe
      title="5-Minute Walking Meditation"
      width="100%"
      height={260}
      src="https://www.youtube.com/embed/xBHQ4l5ShFk"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
</div>

<div className="bg-white/80 rounded-lg p-3 shadow">
  <h4 className="font-semibold">5-Minute Mindfulness Meditation</h4>
  <div className="aspect-video w-full overflow-hidden rounded mt-2">
    <iframe
      title="5-Minute Mindfulness Meditation"
      width="100%"
      height={260}
      src="https://www.youtube.com/embed/ssss7V1_eyA"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
</div>

<div className="bg-white/80 rounded-lg p-3 shadow">
  <h4 className="font-semibold">5-Minute Meditation for Focus & Clarity</h4>
  <div className="aspect-video w-full overflow-hidden rounded mt-2">
    <iframe
      title="5-Minute Meditation for Focus & Clarity"
      width="100%"
      height={260}
      src="https://www.youtube.com/embed/suGx3T1QtLc"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
</div>

<div className="bg-white/80 rounded-lg p-3 shadow">
  <h4 className="font-semibold">De-stress in 5 Minutes — Guided Meditation</h4>
  <div className="aspect-video w-full overflow-hidden rounded mt-2">
    <iframe
      title="De-stress in 5 Minutes — Guided Meditation"
      width="100%"
      height={260}
      src="https://www.youtube.com/embed/wE292vsJcBY"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
</div>

                </div>
            </section>

            <footer className="mt-8 text-sm text-slate-500">
                <p>These resources are for general relaxation and stress-management. If you're in crisis or need urgent help, please contact local emergency services or a trusted professional.</p>
            </footer>
        </div>
    );
}
