const core = require('@actions/core');
const github = require('@actions/github');
const fs = require( "fs" );
const path = require( "path" );
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit();

async function run() {
  try {
    console.log( "Scanning Social Shareboard entries..." );
  
    let shareboardFull = fs.readdirSync( path.join( __dirname, "notes" ) )
      .filter( file => path.extname( file ).toLowerCase() === ".md" )
      .filter( file => file !== "sample.md" )
      .map( file => fs.readFileSync( path.join( __dirname, "notes", file ) ) )
      .join( "\n---\n" );
  
    console.log( "Shareboard contents:\n");
    console.log(shareboardFull);
/*
    console.log("Attempting to update file with octokit");
  
    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: 'sguthals',
      repo: 'talkswithdrg',
      path: '2020/ignite/intro-to-github/ignite-shareboard.md',
      message: 'updating with a new content',
      content: shareboardFull
    })
*/
    console.log("Attempting to update the contents with the notes folder")
    // Save the Markdown
    fs.writeFileSync( "ignite-shareboard.md", shareboardFull );
  
    //console.log("Ignite shareboard now has:\n");
    //console.log(fs.readdirSync( path.join( __dirname, "ignite-shareboard.md") ));
  
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
