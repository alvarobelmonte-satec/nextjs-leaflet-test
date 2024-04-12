import React from 'react';

const styles = {
  html: { margin: 0, height: '100%', overflow: 'hidden' },
  iframe: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, border: 0 }
};
export default function SurveysPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <iframe
        style={styles.iframe}
        data-tally-src="https://tally.so/r/nP6ogB?transparentBackground=1"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Farmers register"
      ></iframe>
    </main>
  );
}
