import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Anuphan:wght@100;200;300;400;500;600&display=swap"
        rel="stylesheet"
      ></link>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      ></link>
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
       <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
