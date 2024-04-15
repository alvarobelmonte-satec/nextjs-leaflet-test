'use client';
import Script from 'next/script';
import React from 'react';

const styles = {
  iframe: { position: 'absolute' as 'absolute', top: 0, right: 0, bottom: 0, left: 0 }
};
export default function SurveysPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <iframe
        style={styles.iframe}
        data-tally-src="https://tally.so/r/nP6ogB?transparentBackground=1"
        width="100%"
        height="100%"
        title="Farmers register"
      ></iframe>

      <Script
        id="tally-js"
        src="https://tally.so/widgets/embed.js"
        onLoad={() => {
          // @ts-ignore
          Tally.loadEmbeds();
        }}
      />
    </main>
  );
}
