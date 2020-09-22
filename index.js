const core = require('@actions/core');
const github = require('@actions/github');
const fs = require( "fs" );
const path = require( "path" );

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  console.log( "Scanning Social Shareboard entries..." );
  let shareboardFull = fs.readdirSync( path.join( __dirname, "2020/ignite/intro-to-github/notes" ) )
    .filter( file => path.extname( file ).toLowerCase() === ".md" )
    .filter( file => file !== "sample.md" )
    .map( file => fs.readFileSync( path.join( __dirname, "2020/ignite/intro-to-github/notes", file ) ) )
    .join( "\n---\n" );

  // Save the Markdown
  fs.writeFileSync( "2020/ignite/intro-to-github/ignite-shareboard.md", shareboardFull );
} catch (error) {
  core.setFailed(error.message);
}
