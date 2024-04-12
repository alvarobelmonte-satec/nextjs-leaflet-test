import React from 'react';

const styles = {
  html: { margin: 0, height: '100%', overflow: 'hidden' },
  iframe: { position: 'absolute' as 'absolute', top: 0, right: 0, bottom: 0, left: 0, border: 0 }
};
export default function SurveysPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <iframe
        style={styles.iframe}
        src="https://app.youform.io/forms/buyiftnn"
        loading="lazy"
        width="100%"
        height="700"
      ></iframe>
    </main>
  );
}
