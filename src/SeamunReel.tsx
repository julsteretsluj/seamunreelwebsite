import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { CinematicBackground } from "./components/CinematicBackground";
import { SCENES } from "./lib/constants";
import { SIGNUPS } from "./lib/content";
import { OpeningScene } from "./scenes/OpeningScene";
import { CommitteesScene } from "./scenes/CommitteesScene";
import { SpotlightsScene } from "./scenes/SpotlightsScene";
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
        <OpeningScene />
      </Sequence>

      <Sequence
        from={SCENES.committees.from}
        durationInFrames={SCENES.committees.duration}
        name="02-Committees"
        layout="none"
      >
        <CommitteesScene />
      </Sequence>

      <Sequence
        from={SCENES.spotlights.from}
        durationInFrames={SCENES.spotlights.duration}
        name="03-Spotlights"
        layout="none"
      >
        <SpotlightsScene />
      </Sequence>

      <Sequence
        from={SCENES.delegate.from}
        durationInFrames={SCENES.delegate.duration}
        name="04-Delegate-SignUps"
        layout="none"
      >
        <SignupScene data={SIGNUPS[0]} swipeIn />
      </Sequence>

      <Sequence
        from={SCENES.chair.from}
        durationInFrames={SCENES.chair.duration}
        name="05-Chair-Applications"
        layout="none"
      >
        <SignupScene data={SIGNUPS[1]} swipeIn />
      </Sequence>

      <Sequence
        from={SCENES.advisor.from}
        durationInFrames={SCENES.advisor.duration}
        name="06-Advisor-SignUps"
        layout="none"
      >
        <SignupScene data={SIGNUPS[2]} swipeIn />
      </Sequence>

      <Sequence
        from={SCENES.finale.from}
        durationInFrames={SCENES.finale.duration}
        name="07-Finale-CTA"
        layout="none"
      >
        <FinaleScene />
      </Sequence>
    </AbsoluteFill>
  );
};
