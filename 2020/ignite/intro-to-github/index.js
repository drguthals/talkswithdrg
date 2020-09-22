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

} catch (error) {
  core.setFailed(error.message);
}