const core = require('@actions/core');
const github = require('@actions/github');
const fs = require( "fs" );
const path = require( "path" );

try {
  console.log( "Scanning Social Shareboard entries..." );

  let shareboardFull = fs.readdirSync( path.join( __dirname, "notes" ) )
    .filter( file => path.extname( file ).toLowerCase() === ".md" )
    .filter( file => file !== "sample.md" )
    .map( file => fs.readFileSync( path.join( __dirname, "notes", file ) ) )
    .join( "\n---\n" );

  console.log( "Shareboard contents:\n");
  console.log(shareboardFull);

  console.log("Writing to the markdown file")
  fs.writeFileSync( core.getInput('file'), shareboardFull );

  console.log("Writing to the markdown file")
  fs.writeFileSync( core.getInput('tracking'), "Adding another person" );

} catch (error) {
  core.setFailed(error.message);
}