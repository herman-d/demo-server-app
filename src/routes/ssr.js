import express from "express";
import App from "../components/app";
import React from "react";
import { renderToString } from "react-dom/server";
import hbs from "handlebars";
import { getComponent } from "../oc/component";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const theHtml = `
    <html>
    <head><title>SSR</title></head>
    <body>
    <h1>Server Side Render</h1>
    <div id="reactelement">{{{reactelement}}}</div>
    <div id="ocelement">{{{ocelement}}}</div>
    <script src="/app.js" charset="utf-8"></script>
    <script src="/vendor.js" charset="utf-8"></script>
    </body>
    </html>
    `;
    const hbsTemplate = hbs.compile(theHtml);
    const reactComp = renderToString(<App />);
    try {
      const htmlToSend = hbsTemplate({
        reactelement: reactComp,
        ocelement: await getComponent("Wolrd"),
      });
      res.send(htmlToSend);
    } catch (error) {
      next(error);
    }  
});

export default router;
