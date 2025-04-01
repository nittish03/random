import { inngest } from '../../../lib/inngest/client';
import { helloWorld } from "../../../lib/inngest/functions"
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest, // a client created with new Inngest()
  functions: [ /* */ 
    helloWorld, // an example function that returns "Hello, World!"
    /* Add more functions here */
   ], // an array of Inngest functions to serve, created with inngest.createFunction()
  /* Optional extra configuration */
});
