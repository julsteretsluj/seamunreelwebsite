import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { CinematicBackground } from "./components/CinematicBackground";
import { SceneShell } from "./components/SceneShell";
import { SCENES } from "./lib/constants";
import { SIGNUPS } from "./lib/content";
import { OpeningScene } from "./scenes/OpeningScene";
import { CommitteesScene } from "./scenes/CommitteesScene";
import { SpotlightsScene } from "./scenes/SpotlightsScene";
import { TeamScene } from "./scenes/TeamScene";
import { SignupScene } from "./scenes/SignupScene";
import { FinaleScene } from "./scenes/FinaleScene";

/**
 * SEAMUN I 2027 — Instagram Reel composition
 * Editable layered scenes over continuous cinematic background.
 */
export const SeamunReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#020e18" }}>
      <CinematicBackground />

      <Sequence
        from={SCENES.opening.from}
        durationInFrames={SCENES.opening.duration}
        name="01-Opening"
        layout="none"
      >
        <SceneShell enterFrames={18} exitFrames={12}>
          <OpeningScene />
        </SceneShell>
      </Sequence>

      <Sequence
        from={SCENES.committees.from}
        durationInFrames={SCENES.committees.duration}
        name="02-Committees"
        layout="none"
      >
        <SceneShell enterFrames={14} exitFrames={12}>
          <CommitteesScene />
        </SceneShell>
      </Sequence>

      <Sequence
        from={SCENES.spotlights.from}
        durationInFrames={SCENES.spotlights.duration}
        name="03-Spotlights"
        layout="none"
      >
        <SceneShell enterFrames={10} exitFrames={12}>
          <SpotlightsScene />
        </SceneShell>
      </Sequence>

      <Sequence
        from={SCENES.team.from}
        durationInFrames={SCENES.team.duration}
        name="04-Our-Team"
        layout="none"
      >
        <SceneShell enterFrames={14} exitFrames={12}>
          <TeamScene />
        </SceneShell>
      </Sequence>

      <Sequence
        from={SCENES.delegate.from}
        durationInFrames={SCENES.delegate.duration}
        name="05-Delegate-SignUps"
        layout="none"
      >
        <SceneShell enterFrames={14} exitFrames={12}>
          <SignupScene data={SIGNUPS[0]} swipeIn={false} />
        </SceneShell>
      </Sequence>

      <Sequence
        from={SCENES.chair.from}
        durationInFrames={SCENES.chair.duration}
        name="06-Chair-Applications"
        layout="none"
      >
        <SceneShell enterFrames={14} exitFrames={12}>
          <SignupScene data={SIGNUPS[1]} swipeIn />
        </SceneShell>
      </Sequence>

      <Sequence
        from={SCENES.advisor.from}
        durationInFrames={SCENES.advisor.duration}
        name="07-Advisor-SignUps"
        layout="none"
      >
        <SceneShell enterFrames={14} exitFrames={12}>
          <SignupScene data={SIGNUPS[2]} swipeIn />
        </SceneShell>
      </Sequence>

      <Sequence
        from={SCENES.finale.from}
        durationInFrames={SCENES.finale.duration}
        name="08-Finale-CTA"
        layout="none"
      >
        <SceneShell enterFrames={16} exitFrames={8}>
          <FinaleScene />
        </SceneShell>
      </Sequence>
    </AbsoluteFill>
  );
};
