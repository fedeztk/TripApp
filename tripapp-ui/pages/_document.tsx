import { Html, Head, Main, NextScript } from 'next/document'
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
        <Head>
            <title>TripApp</title>
            <meta name="description" content="TripApp - Take a trip!"/>
            <link rel="icon" href="/palm.png "/>
            <link rel="manifest" href="/manifest.json" />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
