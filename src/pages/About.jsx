import React from "react";
import Sidebar from "../components/portfolio/Sidebar";

export default function About() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-neutral-900">
      <Sidebar activeCategory="" setActiveCategory={() => {}} />

      <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8 pt-24 pb-12">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>

        <p className="mt-4 text-neutral-700 leading-relaxed">
          Edit this obviously. This is a test to see what the about page would 
          look like. Testing framing and width. How far out can this go lalalallalla.
          okay wow dbfjdia dasjblbchdka. thank you.,
        </p>

        <p className="mt-3 text-neutral-700 leading-relaxed">
          more testing for paragrpahs/spacing and email contact
          (may change this, just an idea for Kuba){" "}
          <a className="underline" href="mailto:hello@example.com">hello@example.com</a>.
        </p>
      </div>
    </div>
  );
}