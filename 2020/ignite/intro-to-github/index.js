const fs = require( "fs" );
const path = require( "path" );
const md = require( "markdown-it" )({
    linkify: true,
    typographer: true
}).enable([ 'link' ]);

console.log( "Scanning Social Shareboard entries..." );
let shareboardFull = fs.readdirSync( path.join( __dirname, "notes" ) )
    .filter( file => path.extname( file ).toLowerCase() === ".md" )
    .filter( file => file !== "sample.md" )
    .map( file => fs.readFileSync( path.join( __dirname, "notes", file ) ) )
    .join( "\n---\n" );

// Save the Markdown
fs.writeFileSync( "ignite-shareboard.md", shareboardFull );

const Web = require( "webwebweb" ).Run( 8000 );
