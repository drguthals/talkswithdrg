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

  console.log("Attempting to update the contents with the notes folder")
  const { data } = await octokit.repos.createOrUpdateFileContents({
    // replace the owner and email with your own details
    owner: "sguthals",
    repo: "sguthals/talksWithDrG",
    path: "ignite-shareboard.md",
    message: "feat: Added ignite-shareboard.md programatically",
    content: shareboardFull,
    committer: {
      name: `Octokit Bot`,
      email: "sarah@guthals.com",
    },
    author: {
      name: "Octokit Bot",
      email: "sarah@guthals.com",
    },
  })
  console.log("Just added this to the shareboard:\n")
  console.log(data)

  // Save the Markdown
  //fs.writeFileSync( "ignite-shareboard.md", shareboardFull );
} catch (error) {
  core.setFailed(error.message);
}
}
run();
