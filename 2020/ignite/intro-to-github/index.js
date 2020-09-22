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

  //console.log("Writing to the markdown file")
  //fs.writeFileSync( "SHAREBOARD.md", shareboardFull );

  //console.log("NOT WORKING NOW: Setting the contents to the output");
  //core.setOutput("contents", "SHAREBOARD.md");

  console.log("Setting a variable to the contents");
  core.exportVariable('shareboardContents', shareboardFull);

} catch (error) {
  core.setFailed(error.message);
}