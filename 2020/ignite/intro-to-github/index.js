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

// Save the HTML
let shareboard = md.render( fs.readFileSync( "ignite-shareboard.md" ).toString() );
let page = `<!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/bootstrap/3.2.0/css/bootstrap.css">
        <title>Social Shareboard for MS Ignite 2020!</title>
    </head>
    <body>
        <div class="jumbotron">
            <h1>#MSIgnite 2020</h1>
            <p>This is a Social Shareboard with messages submitted by participants during the Microsoft Ignite 2020 event between September 22-24, 2020</p>
        </div>
        <br/>
        <div class="container">
        ${shareboard}
        </div>
        <script src="https://cdn.jsdelivr.net/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    </body>
</html>`;
fs.writeFileSync( "index.html", page );

const Web = require( "webwebweb" ).Run( 8000 );
